#!/usr/bin/env node

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { collectComponents } from "./mcp-collect.ts";
import type { McpIndex } from "./mcp-index.types.ts";

const rootDir = join(dirname(fileURLToPath(import.meta.url)), "..");
const pkg = JSON.parse(readFileSync(join(rootDir, "package.json"), "utf8")) as {
	version: string;
};

const index: McpIndex = {
	version: pkg.version,
	generatedFrom: process.env.GITHUB_SHA ?? "local",
	components: collectComponents(rootDir),
};

const outDir = join(rootDir, "dist/mcp");
mkdirSync(outDir, { recursive: true });
writeFileSync(
	join(outDir, "index.json"),
	`${JSON.stringify(index, null, "\t")}\n`,
);

console.log(
	`Indexed ${index.components.length} components (v${index.version})`,
);
