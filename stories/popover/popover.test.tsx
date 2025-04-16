import { composeStories } from "@storybook/react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import userEvent from "@testing-library/user-event";
import * as stories from "./popover.stories";

const { Default } = composeStories(stories);

describe("Popover", () => {
	it("should render and open and close", async () => {
		render(<Default />);

		const user = userEvent.setup();

		const button = screen.getByRole("button", { name: "Open Popover" });
		expect(button).toBeInTheDocument();

		await user.click(button);

		const popover = screen.getByRole("dialog");
		expect(popover).toBeInTheDocument();

		const closeButton = screen.getByRole("button", { name: "Close" });
		expect(closeButton).toBeInTheDocument();

		await user.click(closeButton);

		expect(popover).not.toBeInTheDocument();
	});
});
