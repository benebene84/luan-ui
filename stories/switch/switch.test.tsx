import { composeStories } from "@storybook/react";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import * as stories from "./switch.stories";

const { Default } = composeStories(stories);

describe("Switch", () => {
	it("renders the switch input", async () => {
		await Default.run();

		const switchElement = screen.getByRole("checkbox");
		expect(switchElement).toBeInTheDocument();
	});

	it("toggles when clicked", async () => {
		const user = userEvent.setup();

		await Default.run();

		const switchElement = screen.getByRole("checkbox");
		expect(switchElement).not.toBeChecked();

		await user.click(switchElement);
		expect(switchElement).toBeChecked();

		await user.click(switchElement);
		expect(switchElement).not.toBeChecked();
	});

	it("can be disabled", async () => {
		const user = userEvent.setup();

		await Default.run({ args: { disabled: true } });

		const switchElement = screen.getByRole("checkbox");
		expect(switchElement).toBeDisabled();

		await user.click(switchElement);
		expect(switchElement).not.toBeChecked();
	});

	it("has an onChange prop that is called when the switch is clicked", async () => {
		const user = userEvent.setup();
		const onChangeMock = vi.fn((checked) => {
			console.log(checked);
		});

		await Default.run({ args: { onChange: onChangeMock } });

		const switchElement = screen.getByRole("checkbox");
		await user.click(switchElement);
		expect(onChangeMock).toHaveBeenCalledWith(true);

		await user.click(switchElement);
		expect(onChangeMock).toHaveBeenCalledWith(false);
	});
});
