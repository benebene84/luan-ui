import { composeStories } from "@storybook/react";
import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import * as stories from "./button.stories";

const { Default, AsChild } = composeStories(stories);

describe("Button", () => {
	it("checks if the button is valid", async () => {
		await Default.run();

		const buttonElement = screen.getByRole("button", {
			name: "ArrowLeftIcon Button ArrowRightIcon",
		});

		const iconStart = screen.getByLabelText("ArrowLeftIcon");
		const iconEnd = screen.getByLabelText("ArrowRightIcon");

		expect(buttonElement).toBeInTheDocument();
		expect(iconStart).toBeInTheDocument();
		expect(iconEnd).toBeInTheDocument();
	});

	it("checks if the button can be rendered as a different element", async () => {
		await AsChild.run();

		const buttonElement = screen.getByRole("link", {
			name: "Test",
		});

		expect(buttonElement).toBeInTheDocument();
		expect(buttonElement).toHaveAttribute("href", "https://www.google.com");
	});
});
