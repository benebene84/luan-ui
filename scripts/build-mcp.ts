#!/usr/bin/env node

import { execSync } from "node:child_process";
import { chmodSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import * as esbuild from "esbuild";

const rootDir = join(dirname(fileURLToPath(import.meta.url)), "..");
const outfile = join(rootDir, "dist/mcp/server.js");

execSync("pnpm generate:mcp", { stdio: "inherit", cwd: rootDir });

await esbuild.build({
	entryPoints: [join(rootDir, "mcp/server.ts")],
	bundle: true,
	platform: "node",
	format: "esm",
	outfile,
	banner: { js: "#!/usr/bin/env node" },
	logLevel: "info",
});

chmodSync(outfile, 0o755);
console.log(`MCP server bundled to ${outfile}`);
