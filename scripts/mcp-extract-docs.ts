import type { CodeExample, DocSection, PropDoc } from "./mcp-index.types.ts";

export type ParsedComponentDocs = {
	displayName: string;
	description: string;
	exports: string[];
	sections: DocSection[];
	examples: CodeExample[];
	props: PropDoc[];
};

const SKIP_SECTION_HEADINGS = new Set(["import", "stories"]);

export function parseComponentMdx(
	source: string,
	fallbackName: string,
): ParsedComponentDocs {
	const props = parsePropsTables(source);
	const lines = stripDocJsx(source).split(/\r?\n/);
	const sections: DocSection[] = [];
	const examples: CodeExample[] = [];
	const exports: string[] = [];

	let displayName = toDisplayName(fallbackName);
	let description = "";
	let currentHeading = "";
	let currentLines: string[] = [];
	let lastHeading = "";
	let seenTitle = false;
	let i = 0;

	function flushSection() {
		if (
			!currentHeading ||
			SKIP_SECTION_HEADINGS.has(currentHeading.toLowerCase())
		) {
			currentLines = [];
			return;
		}

		const markdown = currentLines.join("\n").trim();
		if (markdown.length > 0) {
			sections.push({ heading: currentHeading, markdown });
		}
		currentLines = [];
	}

	while (i < lines.length) {
		const line = lines[i] ?? "";

		if (/^import\s/.test(line)) {
			i += 1;
			continue;
		}

		if (line.trim().startsWith("```")) {
			const fence = readFence(lines, i);
			const sectionKey = currentHeading.toLowerCase();

			if (sectionKey === "import") {
				exports.push(...parseImportExports(fence.code));
			} else if (
				!SKIP_SECTION_HEADINGS.has(sectionKey) &&
				fence.code.trim().length > 0
			) {
				examples.push({
					title: fenceTitle(lastHeading, currentHeading, examples.length),
					language: fence.language || "tsx",
					code: fence.code.trimEnd(),
				});
			}

			if (currentHeading && !SKIP_SECTION_HEADINGS.has(sectionKey)) {
				currentLines.push(
					`\`\`\`${fence.language}`,
					fence.code.trimEnd(),
					"```",
				);
			}

			i = fence.endIndex;
			continue;
		}

		if (isJsxLine(line) || isJsxOpenLine(line)) {
			i = skipJsx(lines, i);
			continue;
		}

		const h1 = line.match(/^#\s+(.+)$/);
		if (h1?.[1] && !seenTitle) {
			displayName = h1[1].trim();
			seenTitle = true;
			lastHeading = displayName;
			i += 1;
			continue;
		}

		const h2 = line.match(/^##\s+(.+)$/);
		if (h2?.[1]) {
			flushSection();
			currentHeading = h2[1].trim();
			lastHeading = currentHeading;
			i += 1;
			continue;
		}

		const h3 = line.match(/^###\s+(.+)$/);
		if (h3?.[1]) {
			lastHeading = h3[1].trim();
			if (
				currentHeading &&
				!SKIP_SECTION_HEADINGS.has(currentHeading.toLowerCase())
			) {
				currentLines.push(line);
			}
			i += 1;
			continue;
		}

		if (!seenTitle) {
			i += 1;
			continue;
		}

		if (!currentHeading) {
			if (line.trim().length > 0) {
				description = description
					? `${description}\n${rewriteDocLinks(line)}`
					: rewriteDocLinks(line);
			} else if (description.length > 0) {
				currentHeading = "";
			}
			i += 1;
			continue;
		}

		if (!SKIP_SECTION_HEADINGS.has(currentHeading.toLowerCase())) {
			currentLines.push(rewriteDocLinks(line));
		}
		i += 1;
	}

	flushSection();

	return {
		displayName,
		description: description.trim(),
		exports: unique(exports),
		sections: sections.filter(
			(section) => section.heading.toLowerCase() !== "props",
		),
		examples,
		props,
	};
}

export function parsePropsTables(source: string): PropDoc[] {
	const props: PropDoc[] = [];
	const chunks = source.split(/<PropsTable\b/);

	for (const chunk of chunks.slice(1)) {
		const end = chunk.search(/\n\s*\/>/);
		if (end === -1) {
			continue;
		}

		const block = chunk.slice(0, end);
		const heading = firstStringAttr(block, "heading");
		const extra = firstStringAttr(block, "extra");
		const rowsMatch = block.match(/rows=\{\[([\s\S]*)\]\}/);
		if (!rowsMatch?.[1]) {
			continue;
		}

		for (const row of splitRowObjects(rowsMatch[1])) {
			const name = firstStringField(row, "name");
			const type = firstStringField(row, "type");
			if (!name || !type) {
				continue;
			}

			const options = optionsFromTypeString(type);
			props.push({
				name,
				type,
				required: false,
				...(options ? { options } : {}),
				...(firstStringField(row, "defaultValue")
					? { defaultValue: firstStringField(row, "defaultValue") }
					: {}),
				...(firstStringField(row, "description")
					? { description: firstStringField(row, "description") }
					: {}),
				...(heading ? { group: heading } : {}),
				...(extra ? { groupExtra: extra } : {}),
			});
		}
	}

	return props;
}

function readFence(
	lines: string[],
	start: number,
): { language: string; code: string; endIndex: number } {
	const opener = lines[start] ?? "";
	const language = opener.replace(/^\s*```/, "").trim();
	const body: string[] = [];
	let i = start + 1;

	while (i < lines.length && !(lines[i] ?? "").trim().startsWith("```")) {
		body.push(lines[i] ?? "");
		i += 1;
	}

	return {
		language,
		code: body.join("\n"),
		endIndex: i + 1,
	};
}

function parseImportExports(code: string): string[] {
	const match = code.match(/import\s+\{([^}]+)\}\s+from\s+["']luan-ui["']/);
	if (!match?.[1]) {
		return [];
	}

	return match[1]
		.split(",")
		.map((part) => part.trim())
		.filter((part) => part.length > 0 && !part.startsWith("type "));
}

function isJsxLine(line: string): boolean {
	const trimmed = line.trim();
	return (
		/^<[A-Za-z]/.test(trimmed) &&
		(trimmed.endsWith("/>") || trimmed.endsWith(">") || !trimmed.includes("`"))
	);
}

function isJsxOpenLine(line: string): boolean {
	const trimmed = line.trim();
	return /^<[A-Za-z]/.test(trimmed) && !trimmed.startsWith("</");
}

function stripDocJsx(source: string): string {
	return source
		.replace(/<PropsTable\b[\s\S]*?\n\s*\/>/g, "")
		.replace(/<(Meta|Canvas)\b[\s\S]*?\/>/g, "");
}

function skipJsx(lines: string[], start: number): number {
	const first = (lines[start] ?? "").trim();
	if (first.endsWith("/>") || /<\/[A-Za-z][A-Za-z0-9]*>\s*$/.test(first)) {
		return start + 1;
	}

	const openMatch = first.match(/^<([A-Za-z][A-Za-z0-9]*)\b/);
	const tag = openMatch?.[1];
	if (!tag) {
		return start + 1;
	}

	let depth = 1;
	let i = start + 1;
	const open = new RegExp(`<${tag}\\b`, "g");
	const close = new RegExp(`</${tag}>`, "g");

	while (i < lines.length && depth > 0) {
		const line = lines[i] ?? "";
		if (line.trim() === "/>" || /^\s*\/>\s*$/.test(line)) {
			depth -= 1;
			i += 1;
			continue;
		}
		depth += countMatches(line, open);
		depth -= countMatches(line, close);
		i += 1;
	}

	return i;
}

function countMatches(value: string, pattern: RegExp): number {
	return value.match(pattern)?.length ?? 0;
}

function fenceTitle(
	lastHeading: string,
	sectionHeading: string,
	exampleCount: number,
): string {
	if (lastHeading && lastHeading !== sectionHeading) {
		return lastHeading;
	}
	if (sectionHeading && sectionHeading.toLowerCase() !== "usage") {
		return sectionHeading;
	}
	return exampleCount === 0 ? "Usage" : `Example ${exampleCount + 1}`;
}

function firstStringAttr(block: string, name: string): string | undefined {
	const match = block.match(new RegExp(`${name}="([^"]*)"`));
	return match?.[1];
}

function firstStringField(row: string, name: string): string | undefined {
	const match = row.match(
		new RegExp(`${name}:\\s*("(?:\\\\.|[^"\\\\])*"|'(?:\\\\.|[^'\\\\])*')`),
	);
	if (!match?.[1]) {
		return undefined;
	}

	return unquote(match[1]);
}

function unquote(raw: string): string {
	const quote = raw[0];
	if ((quote === '"' || quote === "'") && raw.endsWith(quote)) {
		return raw
			.slice(1, -1)
			.replace(/\\n/g, "\n")
			.replace(/\\"/g, '"')
			.replace(/\\'/g, "'")
			.replace(/\\\\/g, "\\");
	}

	return raw;
}

function splitRowObjects(rows: string): string[] {
	const objects: string[] = [];
	let depth = 0;
	let start = -1;

	for (let i = 0; i < rows.length; i += 1) {
		const char = rows[i];
		if (char === "{") {
			if (depth === 0) {
				start = i;
			}
			depth += 1;
		} else if (char === "}") {
			depth -= 1;
			if (depth === 0 && start !== -1) {
				objects.push(rows.slice(start, i + 1));
				start = -1;
			}
		}
	}

	return objects;
}

export function optionsFromTypeString(type: string): string[] | undefined {
	const matches = [...type.matchAll(/"([^"]+)"/g)].map((match) => match[1]);
	if (matches.length === 0 || matches.length > 24) {
		return undefined;
	}

	return unique(matches);
}

function rewriteDocLinks(line: string): string {
	return line.replace(
		/\[([^\]]+)\]\(\?path=\/docs\/conventions--docs[^)]*\)/g,
		"$1 (see Conventions)",
	);
}

export function toDisplayName(name: string): string {
	return name
		.split("-")
		.map((part) => (part[0] ? part[0].toUpperCase() + part.slice(1) : part))
		.join(" ");
}

export function toPascalCase(name: string): string {
	return name
		.split("-")
		.map((part) => (part[0] ? part[0].toUpperCase() + part.slice(1) : part))
		.join("");
}

function unique(values: string[]): string[] {
	return [...new Set(values)];
}
