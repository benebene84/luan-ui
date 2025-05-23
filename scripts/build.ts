#!/usr/bin/env node

import { execSync } from "node:child_process";
import { existsSync, rmSync } from "node:fs";

const startTime = performance.now();
const color = await import("./color.ts").then((m) => m.color);

try {
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
	const durationCompile = (endTimeCompile - startTimeCompile) / 1000;
	console.log(
		`Done! ${color(`(${durationCompile.toFixed(2)} seconds)`, "blue")}`,
	);

	const startTimeCopy = performance.now();
	console.log("\nCopying assets...");
	const copyAssets = await import("./copy-build-assets.ts");
	await copyAssets.default;
	const endTimeCopy = performance.now();
	const durationCopy = (endTimeCopy - startTimeCopy) / 1000;
	console.log(`Done! ${color(`(${durationCopy.toFixed(2)} seconds)`, "blue")}`);

	const endTime = performance.now();
	const duration = (endTime - startTime) / 1000;

	console.log(
		`\n${color(
			`Build completed successfully in ${duration.toFixed(2)} seconds!`,
			"green",
		)} 🎉`,
	);
} catch (error) {
	console.error(color(`Error: ${error}`, "red"));
	process.exit(1);
}
