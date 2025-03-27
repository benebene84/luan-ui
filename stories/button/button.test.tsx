import { composeStories } from "@storybook/react";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import * as stories from "./button.stories";

const { Primary } = composeStories(stories);

describe("Button", () => {
	it("Checks if the button is valid", async () => {
		await Primary.run();

		const user = userEvent.setup();

		const buttonElement = screen.getByRole("button", {
			name: "Button",
		});

		expect(buttonElement).toBeInTheDocument();

		await user.click(buttonElement);
	});
});
