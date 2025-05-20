import { cp, mkdir } from "node:fs/promises";
import { dirname } from "node:path";

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

Promise.all(
	dirs.map(async ([source, destination, recursive]) => {
		console.log(`Copying "${source}" to "${destination}"`);
		try {
			await copyAssets(source, destination, recursive);
		} catch (error) {
			console.error(
				`\x1b[31mError copying "${source}" to "${destination}": ${error}\x1b[0m`,
			);
			process.exit(1);
		}
	}),
);
