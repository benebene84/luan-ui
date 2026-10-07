import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { parseIndexExports } from "./mcp-collect.ts";
import { parseComponentMdx, parsePropsTables } from "./mcp-extract-docs.ts";

const rootDir = join(dirname(fileURLToPath(import.meta.url)), "..");

describe("parseComponentMdx", () => {
	it("extracts button docs, import, examples, and props", () => {
		const source = readFileSync(
			join(rootDir, "stories/button/button.mdx"),
			"utf8",
		);
		const docs = parseComponentMdx(source, "button");

		expect(docs.displayName).toBe("Button");
		expect(docs.description).toContain("visual variants");
		expect(docs.exports).toEqual(["Button"]);
		expect(docs.examples.length).toBeGreaterThan(0);
		expect(docs.examples[0]?.code).toContain("<Button");
		expect(docs.props.map((prop) => prop.name)).toEqual(
			expect.arrayContaining([
				"variant",
				"size",
				"disabled",
				"render",
				"children",
			]),
		);

		const variant = docs.props.find((prop) => prop.name === "variant");
		expect(variant?.options).toEqual(["primary", "secondary", "destructive"]);
		expect(variant?.defaultValue).toBe('"primary"');
	});

	it("extracts compound dialog exports and grouped props", () => {
		const source = readFileSync(
			join(rootDir, "stories/dialog/dialog.mdx"),
			"utf8",
		);
		const docs = parseComponentMdx(source, "dialog");

		expect(docs.exports).toEqual([
			"Dialog",
			"DialogClose",
			"DialogContent",
			"DialogDescription",
			"DialogFooter",
			"DialogHeader",
			"DialogTitle",
			"DialogTrigger",
		]);
		expect(docs.props.some((prop) => prop.group === "DialogContent")).toBe(
			true,
		);
		expect(docs.props.some((prop) => prop.name === "onOpenChange")).toBe(true);
	});

	it("parses conventions as shared guidance", () => {
		const source = readFileSync(
			join(rootDir, "stories/conventions.mdx"),
			"utf8",
		);
		const docs = parseComponentMdx(source, "conventions");

		expect(docs.displayName).toBe("Conventions");
		expect(docs.sections.map((section) => section.heading)).toEqual(
			expect.arrayContaining([
				"HTML props and refs",
				"Render prop",
				"Responsive values",
				"Form context",
				"Portals and theming",
			]),
		);
		expect(
			docs.examples.some((example) => example.code.includes("FormField")),
		).toBe(true);
	});
});

describe("parsePropsTables", () => {
	it("reads heading extras and default values", () => {
		const tables = parsePropsTables(`
<PropsTable
  heading="Alert"
  extra="Also accepts native div attributes."
  rows={[
    {
      name: "variant",
      type: '"primary" | "secondary"',
      defaultValue: '"primary"',
      description: "Visual style",
    },
  ]}
/>
`);

		expect(tables).toEqual([
			{
				name: "variant",
				type: '"primary" | "secondary"',
				required: false,
				options: ["primary", "secondary"],
				defaultValue: '"primary"',
				description: "Visual style",
				group: "Alert",
				groupExtra: "Also accepts native div attributes.",
			},
		]);
	});
});

describe("parseIndexExports", () => {
	it("maps public runtime exports to component modules", () => {
		const source = readFileSync(join(rootDir, "src/index.ts"), "utf8");
		const exports = parseIndexExports(source);

		expect(exports.get("@components/button/button")).toEqual(["Button"]);
		expect(exports.get("@components/dialog/dialog")).toEqual(
			expect.arrayContaining(["Dialog", "DialogTrigger", "DialogContent"]),
		);
	});
});
