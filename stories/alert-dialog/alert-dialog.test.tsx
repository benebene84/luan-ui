import { composeStories } from "@storybook/react-webpack5";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import * as stories from "./alert-dialog.stories";

const { Default } = composeStories(stories);

describe("AlertDialog", () => {
	it("checks if the alert dialog can be opened and closed", async () => {
		await Default.run();

		const user = userEvent.setup();
		const triggerButton = screen.getByRole("button", {
			name: "Delete Account",
		});
		expect(triggerButton).toBeInTheDocument();

		await user.click(triggerButton);

		const dialog = screen.getByRole("alertdialog");
		expect(dialog).toBeInTheDocument();

		const title = screen.getByRole("heading", {
			name: "Are you absolutely sure?",
		});

		expect(title).toBeInTheDocument();

		const cancelButton = screen.getByRole("button", { name: "Cancel" });
		const confirmButton = screen.getByRole("button", {
			name: "Delete Account",
		});
		expect(cancelButton).toBeInTheDocument();
		expect(confirmButton).toBeInTheDocument();

		// Click the cancel button to close the dialog
		await user.click(cancelButton);
		expect(dialog).not.toBeInTheDocument();
	});

	it("checks if the alert dialog can be confirmed", async () => {
		await Default.run();

		const user = userEvent.setup();
		const triggerButton = screen.getByRole("button", {
			name: "Delete Account",
		});
		await user.click(triggerButton);

		const dialog = screen.getByRole("alertdialog");
		expect(dialog).toBeInTheDocument();

		const confirmButton = screen.getByRole("button", {
			name: "Delete Account",
		});
		await user.click(confirmButton);
		expect(dialog).not.toBeInTheDocument();
	});
});
