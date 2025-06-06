import { composeStories } from "@storybook/react-webpack5";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import * as stories from "./checkbox.stories";

describe("Checkbox", () => {
	const user = userEvent.setup();

	const { Default } = composeStories(stories);

	it("renders unchecked checkbox by default", async () => {
		await Default.run();
		const checkbox = screen.getByRole("checkbox");
		expect(checkbox).not.toBeChecked();
	});

	it("renders disabled checkbox when disabled prop is true", async () => {
		await Default.run({ args: { disabled: true } });
		const checkbox = screen.getByRole("checkbox");
		expect(checkbox).toBeDisabled();
	});

	it("renders checked and disabled checkbox when both props are true", async () => {
		await Default.run({ args: { checked: true, disabled: true } });
		const checkbox = screen.getByRole("checkbox");
		expect(checkbox).toBeChecked();
		expect(checkbox).toBeDisabled();
	});

	it("toggles checkbox state when clicked", async () => {
		await Default.run();
		const checkbox = screen.getByRole("checkbox");
		await user.click(checkbox);
		expect(checkbox).toBeChecked();
		await user.click(checkbox);
		expect(checkbox).not.toBeChecked();
	});

	it("does not toggle when disabled", async () => {
		await Default.run({ args: { disabled: true } });
		const checkbox = screen.getByRole("checkbox");
		await user.click(checkbox);
		expect(checkbox).not.toBeChecked();
	});

	it("handles keyboard interaction", async () => {
		await Default.run();
		const checkbox = screen.getByRole("checkbox");
		checkbox.focus();
		await user.keyboard("[Space]");
		expect(checkbox).toBeChecked();
		await user.keyboard("[Space]");
		expect(checkbox).not.toBeChecked();
	});

	it("does not respond to keyboard when disabled", async () => {
		await Default.run({ args: { disabled: true } });
		const checkbox = screen.getByRole("checkbox");
		checkbox.focus();
		await user.keyboard("[Space]");
		expect(checkbox).not.toBeChecked();
	});
});
