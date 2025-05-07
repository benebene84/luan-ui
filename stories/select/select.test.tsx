import { composeStories } from "@storybook/react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeAll, describe, expect, it, vi } from "vitest";

import * as stories from "./select.stories";

const { Default, WithGroups } = composeStories(stories);

describe("Select", () => {
	it("renders the select component with trigger and options", async () => {
		await Default.run();

		const trigger = screen.getByRole("combobox");
		expect(trigger).toBeInTheDocument();
		expect(trigger).toHaveTextContent("Select an option");

		// Open the select
		await userEvent.click(trigger);

		// Check if options are rendered
		await waitFor(() => {
			expect(screen.getByText("Fruits")).toBeInTheDocument();
			expect(screen.getByText("Apple")).toBeInTheDocument();
			expect(screen.getByText("Banana")).toBeInTheDocument();
			expect(screen.getByText("Orange")).toBeInTheDocument();
		});
	});

	it("allows selecting an option", async () => {
		await Default.run();

		const trigger = screen.getByRole("combobox");
		await userEvent.click(trigger);

		// Select an option
		const option = screen.getByText("Apple");
		await userEvent.click(option);

		// Check if the selected value is displayed
		await waitFor(() => {
			expect(trigger).toHaveTextContent("Apple");
		});
	});

	it("renders multiple groups with labels", async () => {
		await WithGroups.run();

		const trigger = screen.getByRole("combobox");
		await userEvent.click(trigger);

		// Check if both groups and their labels are rendered
		await waitFor(() => {
			expect(screen.getByText("Fruits")).toBeInTheDocument();
			expect(screen.getByText("Vegetables")).toBeInTheDocument();
			expect(screen.getByText("Carrot")).toBeInTheDocument();
			expect(screen.getByText("Potato")).toBeInTheDocument();
		});
	});
});
