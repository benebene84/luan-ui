import { composeStories } from "@storybook/react-vite";
import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import * as stories from "./button.stories";

const { Default, AsLink } = composeStories(stories);

describe("Button", () => {
	it("checks if the button is valid", async () => {
		await Default.run();

		const buttonElement = screen.getByRole("button", {
			name: "ArrowLeftIconButtonArrowRightIcon",
		});

		const iconStart = screen.getByLabelText("ArrowLeftIcon");
		const iconEnd = screen.getByLabelText("ArrowRightIcon");

		expect(buttonElement).toBeInTheDocument();
		expect(iconStart).toBeInTheDocument();
		expect(iconEnd).toBeInTheDocument();
	});

	it("checks if the button can be rendered as a different element using render prop", async () => {
		await AsLink.run();

		const linkElement = screen.getByRole("link", {
			name: "Link Button",
		});

		expect(linkElement).toBeInTheDocument();
		expect(linkElement).toHaveAttribute("href", "https://www.google.com");
	});
});
