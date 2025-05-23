import { cp, mkdir } from "node:fs/promises";
import { dirname } from "node:path";
import { color } from "./color.ts";
// Source, destination, recursive
const dirs: [string, string, boolean][] = [["src/styles", "dist/styles", true]];

async function copyAssets(
	source: string,
	destination: string,
	recursive: boolean,
) {
	await mkdir(dirname(destination), { recursive: true });
	await cp(source, destination, { recursive });
}

export default Promise.all(
	dirs.map(async ([source, destination, recursive]) => {
		console.log(`Copying "${source}" to "${destination}"`);
		try {
			await copyAssets(source, destination, recursive);
		} catch (error) {
			console.error(
				color(`Error copying "${source}" to "${destination}": ${error}`, "red"),
			);
			process.exit(1);
		}
	}),
);
