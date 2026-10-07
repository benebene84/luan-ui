import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import type { ComponentDoc, McpIndex } from "../scripts/mcp-index.types.ts";
import { renderComponent } from "./render.ts";

const PACKAGE_NAME = "luan-ui";

function loadIndex(): McpIndex {
	const here = dirname(fileURLToPath(import.meta.url));
	const candidates = [
		join(here, "index.json"),
		join(here, "..", "dist", "mcp", "index.json"),
	];
	const found = candidates.find(existsSync);
	if (!found) {
		throw new Error("index.json not found — run `pnpm generate:mcp` first.");
	}

	return JSON.parse(readFileSync(found, "utf8")) as McpIndex;
}

function loadPackageVersion(fallback: string): string {
	const here = dirname(fileURLToPath(import.meta.url));
	const candidates = [
		join(here, "..", "..", "package.json"),
		join(here, "..", "package.json"),
	];

	for (const candidate of candidates) {
		if (!existsSync(candidate)) {
			continue;
		}

		const pkg = JSON.parse(readFileSync(candidate, "utf8")) as {
			name?: string;
			version?: string;
		};
		if (pkg.name === PACKAGE_NAME && pkg.version) {
			return pkg.version;
		}
	}

	return fallback;
}

function normalizeName(value: string): string {
	return value.toLowerCase().replace(/[-_\s]/g, "");
}

const index = loadIndex();
const version = loadPackageVersion(index.version);
const byName = new Map<string, ComponentDoc>();

for (const component of index.components) {
	const keys = [
		component.name,
		component.displayName,
		component.exportName,
		...component.exports,
	];
	for (const key of keys) {
		if (key) {
			byName.set(normalizeName(key), component);
		}
	}
}

const server = new McpServer({ name: PACKAGE_NAME, version });
const text = (body: string) => ({
	content: [{ type: "text" as const, text: body }],
});

server.registerTool(
	"list_components",
	{
		title: "List components",
		description:
			"List all luan-ui components with a one-line description. Call this first to discover what is available. Also includes Conventions for shared patterns (responsive values, form context, portals, render prop).",
		inputSchema: z.object({}),
	},
	() => {
		const items = index.components.map(
			(component) =>
				`- **${component.displayName}** (\`${component.name}\`) — ${component.description || "No description."}`,
		);
		return text(
			`${items.length} luan-ui entries (v${version}). Call get_component before writing UI. Use \`conventions\` for shared patterns.\n\n${items.join("\n")}`,
		);
	},
);

server.registerTool(
	"get_component",
	{
		title: "Get component docs",
		description:
			'Get full docs for one luan-ui component: import, props, variants, usage, and examples. Use before writing UI with a component. Pass a name like "button", "Button", or "conventions".',
		inputSchema: z.object({
			name: z
				.string()
				.describe('Component name, e.g. "button", "Button", or "conventions".'),
		}),
	},
	({ name }) => {
		const component = byName.get(normalizeName(name));
		if (!component) {
			const names = index.components.map((item) => item.name).join(", ");
			return {
				...text(`Unknown component "${name}". Available: ${names}`),
				isError: true,
			};
		}

		return text(renderComponent(component));
	},
);

const transport = new StdioServerTransport();
await server.connect(transport);
console.error(
	`luan-mcp ready — v${version}, ${index.components.length} components`,
);
