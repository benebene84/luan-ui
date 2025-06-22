import { composeStories } from "@storybook/react-vite";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import * as stories from "./tooltip.stories";

const { Default } = composeStories(stories);

describe("Tooltip", () => {
	it("checks if the tooltip content is shown on hover", async () => {
		const { container } = render(<div />);
		await Default.run({ container });

		const buttonElement = screen.getByRole("button", {
			name: "Hover me",
		});

		await userEvent.hover(buttonElement);

		const tooltipContent = await screen.findByRole("tooltip");
		expect(tooltipContent).toBeInTheDocument();
	});
});
