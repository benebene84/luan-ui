import { composeStories } from "@storybook/react-vite";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import * as stories from "./popover.stories";

const { Default } = composeStories(stories);

describe("Popover", () => {
	it("should render, open and close", async () => {
		await Default.run();

		const user = userEvent.setup();

		const button = screen.getByRole("button", { name: "Open Popover" });
		expect(button).toBeInTheDocument();

		await user.click(button);

		// Wait for popover to open
		const popover = await screen.findByRole("dialog");
		expect(popover).toBeInTheDocument();

		const closeButton = screen.getByRole("button", { name: "Close" });
		expect(closeButton).toBeInTheDocument();

		await user.click(closeButton);

		// Wait for popover to close
		await waitFor(() => {
			expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
		});
	});
});
