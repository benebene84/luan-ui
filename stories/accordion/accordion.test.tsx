import { composeStories } from "@storybook/react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { accordionContents } from "./accordion.data";
import * as stories from "./accordion.stories";
const { Default, Multiple } = composeStories(stories);

describe("Accordion", () => {
	it("should open and close items in single mode", async () => {
		const user = userEvent.setup();
		const { container } = render(<div />);
		await Default.run({ container });

		const firstTrigger = screen.getByRole("button", {
			name: accordionContents.single[0].trigger,
		});

		// Open first item
		await user.click(firstTrigger);
		expect(
			await screen.findByText(accordionContents.single[0].content),
		).toBeVisible();

		// Clicking another item should close the first
		const secondTrigger = screen.getByRole("button", {
			name: accordionContents.single[1].trigger,
		});
		await user.click(secondTrigger);
		expect(
			await screen.findByText(accordionContents.single[1].content),
		).toBeVisible();
	});

	it("should allow multiple items to be open in multiple mode", async () => {
		const user = userEvent.setup();
		const { container } = render(<div />);
		await Multiple.run({ container });

		const firstTrigger = screen.getByRole("button", {
			name: accordionContents.multiple[0].trigger,
		});
		const secondTrigger = screen.getByRole("button", {
			name: accordionContents.multiple[1].trigger,
		});

		// Open first item
		await user.click(firstTrigger);
		expect(
			await screen.findByText(accordionContents.multiple[0].content),
		).toBeVisible();

		// Open second item - first should stay open
		await user.click(secondTrigger);
		expect(
			await screen.findByText(accordionContents.multiple[1].content),
		).toBeVisible();
	});

	it("should support keyboard navigation", async () => {
		const user = userEvent.setup();
		const { container } = render(<div />);
		await Default.run({ container });

		const firstTrigger = screen.getByRole("button", {
			name: accordionContents.single[0].trigger,
		});
		const secondTrigger = screen.getByRole("button", {
			name: accordionContents.single[1].trigger,
		});

		// Focus first item
		await user.tab();
		expect(firstTrigger).toHaveFocus();

		// Arrow down should move to second item
		await user.keyboard("{ArrowDown}");
		expect(secondTrigger).toHaveFocus();

		// Enter should open the item
		await user.keyboard("{Enter}");
		expect(
			await screen.findByText(accordionContents.single[1].content),
		).toBeVisible();
	});
});
