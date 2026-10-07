import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import {
	createTsProgram,
	extractOwnedProps,
	extractVariants,
} from "./mcp-extract-types.ts";

const rootDir = join(dirname(fileURLToPath(import.meta.url)), "..");
const program = createTsProgram(rootDir);

describe("extractOwnedProps", () => {
	it("reads designed button props from the source annotation", () => {
		const props = extractOwnedProps(
			program,
			join(rootDir, "src/components/button/button.tsx"),
			rootDir,
		);
		const names = props.map((prop) => prop.name);

		expect(names).toEqual(
			expect.arrayContaining(["variant", "size", "className"]),
		);
		expect(names).not.toContain("onClick");

		const variant = props.find((prop) => prop.name === "variant");
		expect(variant?.options).toEqual(["primary", "secondary", "destructive"]);
		expect(variant?.required).toBe(false);
		expect(variant?.type).toContain("primary");
	});
});

describe("extractVariants", () => {
	it("reads button variant maps and skips boolean disabled", () => {
		const variants = extractVariants(
			program,
			join(rootDir, "src/components/button/button.tsx"),
		);

		expect(variants.variant).toEqual(["primary", "secondary", "destructive"]);
		expect(variants.size).toEqual(["small", "medium", "large"]);
		expect(variants.disabled).toBeUndefined();
	});

	it("reads slotted alert variant keys, not slot names", () => {
		const variants = extractVariants(
			program,
			join(rootDir, "src/components/alert/alert.tsx"),
		);

		expect(variants.variant).toEqual(["primary", "secondary", "error"]);
		expect(variants.size).toEqual(["small", "medium"]);
		expect(variants.variant).not.toContain("root");
	});
});
