#!/usr/bin/env node

import { execSync } from "node:child_process";
import { existsSync, rmSync } from "node:fs";

const startTime = performance.now();

console.log("Cleaning output directory...");
if (existsSync("dist")) {
	rmSync("dist", { recursive: true, force: true });
}
console.log("Done!");

const startTimeCompile = performance.now();
console.log("\nCompiling TypeScript...");
execSync("pnpm tsc -p ./tsconfig.build.json", { stdio: "inherit" });
execSync("pnpm tsc-alias -p ./tsconfig.build.json", { stdio: "inherit" });

const endTimeCompile = performance.now();
const durationCompile = (endTimeCompile - startTimeCompile) / 1000; // Convert to seconds
console.log(`Done! \x1b[34m(${durationCompile.toFixed(2)} seconds)\x1b[0m`);

const startTimeCopy = performance.now();
console.log("\nCopying assets...");
await import("./copy-build-assets.ts");
const endTimeCopy = performance.now();
const durationCopy = (endTimeCopy - startTimeCopy) / 1000; // Convert to seconds
console.log(`Done! \x1b[34m(${durationCopy.toFixed(2)} seconds)\x1b[0m`);

const endTime = performance.now();
const duration = (endTime - startTime) / 1000; // Convert to seconds

console.log(
	`\n\x1b[32mBuild completed successfully in ${duration.toFixed(2)} seconds!\x1b[0m 🎉`,
);
