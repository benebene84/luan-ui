import { existsSync, globSync, readFileSync } from "node:fs";
import { basename, join } from "node:path";
import { parseComponentMdx, toPascalCase } from "./mcp-extract-docs.ts";
import {
	createTsProgram,
	extractOwnedProps,
	extractVariants,
} from "./mcp-extract-types.ts";
import type { ComponentDoc, PropDoc } from "./mcp-index.types.ts";

const IMPORT_PATH = "luan-ui";
const SKIP_MDX = new Set(["introduction.mdx"]);

export function collectComponents(rootDir: string): ComponentDoc[] {
	const program = createTsProgram(rootDir);
	const publicExports = parseIndexExports(
		readFileSync(join(rootDir, "src/index.ts"), "utf8"),
	);
	const mdxFiles = globSync("stories/**/*.mdx", { cwd: rootDir })
		.map((file) => toPosix(join(rootDir, file)))
		.filter((file) => !SKIP_MDX.has(basename(file)))
		.sort();

	return mdxFiles.map((mdxPath) => {
		const name = basename(mdxPath, ".mdx");
		const source = readFileSync(mdxPath, "utf8");
		const docs = parseComponentMdx(source, name);
		const sourceFile = resolveComponentSource(rootDir, name);
		const moduleExports = sourceFile
			? (publicExports.get(toPosix(relativeModulePath(rootDir, sourceFile))) ??
				[])
			: [];
		const exports =
			docs.exports.length > 0
				? docs.exports
				: moduleExports.length > 0
					? moduleExports
					: sourceFile && docs.displayName
						? [docs.displayName.replace(/\s+/g, "")]
						: [];
		const exportName =
			exports.find((item) => item === toPascalCase(name)) ?? exports[0] ?? "";

		const ownedProps = sourceFile
			? extractOwnedProps(program, sourceFile, rootDir)
			: [];
		const variants = sourceFile ? extractVariants(program, sourceFile) : {};

		return {
			name,
			displayName: docs.displayName,
			exportName,
			exports,
			importPath: IMPORT_PATH,
			description: docs.description,
			props: mergeProps(docs.props, ownedProps),
			variants,
			sections: docs.sections,
			examples: docs.examples,
		};
	});
}

export function parseIndexExports(source: string): Map<string, string[]> {
	const exports = new Map<string, string[]>();
	const pattern = /^export \{([^}]+)\} from "(@components\/[^"]+)"/gm;

	for (const match of source.matchAll(pattern)) {
		const names = (match[1] ?? "")
			.split(",")
			.map((part) => part.trim())
			.filter((part) => part.length > 0 && !part.startsWith("type "));
		const specifier = match[2] ?? "";
		const existing = exports.get(specifier) ?? [];
		exports.set(specifier, [...new Set([...existing, ...names])]);
	}

	return exports;
}

function mergeProps(fromDocs: PropDoc[], fromTypes: PropDoc[]): PropDoc[] {
	const merged = [...fromDocs];
	const seen = new Set(fromDocs.map((prop) => propKey(prop)));

	for (const prop of fromDocs) {
		const typed = fromTypes.find(
			(candidate) =>
				candidate.name === prop.name &&
				(!prop.group ||
					candidate.group === prop.group ||
					candidate.group === prop.group.replace(/\s+/g, "")),
		);
		if (typed?.options && !prop.options) {
			prop.options = typed.options;
		}
		if (typed?.required) {
			prop.required = true;
		}
	}

	for (const prop of fromTypes) {
		const key = propKey(prop);
		if (
			seen.has(key) ||
			merged.some((item) => item.name === prop.name && !item.group)
		) {
			continue;
		}
		if (merged.some((item) => item.name === prop.name)) {
			continue;
		}
		seen.add(key);
		merged.push(prop);
	}

	return merged;
}

function propKey(prop: PropDoc): string {
	return `${prop.group ?? ""}::${prop.name}`;
}

function resolveComponentSource(
	rootDir: string,
	name: string,
): string | undefined {
	const direct = join(rootDir, "src/components", name, `${name}.tsx`);
	if (existsSync(direct)) {
		return direct;
	}

	const matches = globSync(`src/components/**/${name}.tsx`, { cwd: rootDir });
	return matches[0] ? join(rootDir, matches[0]) : undefined;
}

function relativeModulePath(rootDir: string, sourceFile: string): string {
	const withoutExt = toPosix(sourceFile)
		.replace(toPosix(join(rootDir, "src/components/")), "")
		.replace(/\.tsx$/, "");
	return `@components/${withoutExt}`;
}

function toPosix(filePath: string): string {
	return filePath.split("\\").join("/");
}
