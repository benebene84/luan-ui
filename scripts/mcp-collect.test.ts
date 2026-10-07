import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { renderComponent } from "../mcp/render.ts";
import { collectComponents } from "./mcp-collect.ts";

const rootDir = join(dirname(fileURLToPath(import.meta.url)), "..");

describe("collectComponents", () => {
	it("indexes story docs with imports, props, and variants", () => {
		const components = collectComponents(rootDir);
		const names = components.map((component) => component.name);

		expect(names).toEqual(
			expect.arrayContaining(["button", "dialog", "form-field", "conventions"]),
		);
		expect(names).not.toContain("introduction");

		const button = components.find((component) => component.name === "button");
		expect(button?.exportName).toBe("Button");
		expect(button?.importPath).toBe("luan-ui");
		expect(button?.variants.variant).toEqual([
			"primary",
			"secondary",
			"destructive",
		]);
		expect(button?.variants.size).toEqual(["small", "medium", "large"]);
		expect(renderComponent(button as NonNullable<typeof button>)).toContain(
			'import { Button } from "luan-ui"',
		);

		const dialog = components.find((component) => component.name === "dialog");
		expect(dialog?.exports).toContain("DialogTrigger");
		expect(renderComponent(dialog as NonNullable<typeof dialog>)).toContain(
			"DialogContent",
		);

		const conventions = components.find(
			(component) => component.name === "conventions",
		);
		expect(conventions?.exportName).toBe("");
		expect(conventions?.sections.length).toBeGreaterThan(0);
	});
});
