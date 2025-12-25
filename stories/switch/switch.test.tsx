import { composeStories } from "@storybook/react-vite";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import * as stories from "./switch.stories";

const { Default } = composeStories(stories);

describe("Switch", () => {
	it("renders the switch input", async () => {
		await Default.run();

		const switchElement = screen.getByRole("switch");
		expect(switchElement).toBeInTheDocument();
	});

	it("toggles when clicked", async () => {
		const user = userEvent.setup();

		await Default.run();

		const switchElement = screen.getByRole("switch");
		expect(switchElement).toHaveAttribute("aria-checked", "false");

		await user.click(switchElement);
		expect(switchElement).toHaveAttribute("aria-checked", "true");

		await user.click(switchElement);
		expect(switchElement).toHaveAttribute("aria-checked", "false");
	});

	it("can be disabled", async () => {
		const user = userEvent.setup();

		await Default.run({ args: { disabled: true } });

		const switchElement = screen.getByRole("switch");
		expect(switchElement).toHaveAttribute("aria-disabled", "true");

		await user.click(switchElement);
		expect(switchElement).toHaveAttribute("aria-checked", "false");
	});

	it("has an onCheckedChange prop that is called when the switch is clicked", async () => {
		const user = userEvent.setup();
		const onCheckedChangeMock = vi.fn();

		await Default.run({ args: { onCheckedChange: onCheckedChangeMock } });

		const switchElement = screen.getByRole("switch");
		await user.click(switchElement);
		expect(onCheckedChangeMock).toHaveBeenCalledWith(
			true,
			expect.objectContaining({ reason: expect.any(String) }),
		);

		await user.click(switchElement);
		expect(onCheckedChangeMock).toHaveBeenCalledWith(
			false,
			expect.objectContaining({ reason: expect.any(String) }),
		);
	});

	it("has a checked prop that is checked when the switch is checked", async () => {
		await Default.run({ args: { checked: true } });

		const switchElement = screen.getByRole("switch");
		expect(switchElement).toHaveAttribute("aria-checked", "true");
	});

	it("can be navigated with the keyboard", async () => {
		const user = userEvent.setup();

		await Default.run();

		const switchElement = screen.getByRole("switch");
		await user.keyboard("{Tab}");
		expect(switchElement).toHaveFocus();
		await user.keyboard("{Enter}");
		expect(switchElement).toHaveAttribute("aria-checked", "true");

		await user.keyboard(" ");
		expect(switchElement).toHaveAttribute("aria-checked", "false");
	});
});
