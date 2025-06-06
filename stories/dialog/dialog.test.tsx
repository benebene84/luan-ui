import { composeStories } from "@storybook/react-webpack5";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import * as stories from "./dialog.stories";

const { Default } = composeStories(stories);

describe("Dialog", () => {
	it("checks if the dialog can be opened and closed", async () => {
		await Default.run();

		const user = userEvent.setup();

		// Check if trigger button exists
		const triggerButton = screen.getByRole("button", { name: "Open Dialog" });
		expect(triggerButton).toBeInTheDocument();

		// Click the trigger button to open the dialog
		await user.click(triggerButton);

		// Check if dialog content is visible
		const dialog = screen.getByRole("dialog");
		expect(dialog).toBeInTheDocument();

		// Check if title and description are present
		const title = screen.getByText("Dialog Title");
		const description = screen.getByText("This is a dialog description.");
		expect(title).toBeInTheDocument();
		expect(description).toBeInTheDocument();

		const closeButton = screen.getByRole("button", { name: "Close" });

		// Click the close button to close the dialog
		await user.click(closeButton);
		expect(dialog).not.toBeInTheDocument();
	});
});
