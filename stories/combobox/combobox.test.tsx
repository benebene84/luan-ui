import { composeStories } from "@storybook/react-vite";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import * as stories from "./combobox.stories";

const { Default, WithGroups } = composeStories(stories);

describe("Combobox", () => {
	it("renders the combobox input", async () => {
		await Default.run();

		const input = screen.getByRole("combobox");
		expect(input).toBeInTheDocument();
		expect(input).toHaveAttribute("placeholder", "Select a fruit...");
	});

	it("opens the popup and shows items when clicking the input", async () => {
		await Default.run();

		const input = screen.getByRole("combobox");
		await userEvent.click(input);

		await waitFor(() => {
			expect(screen.getByText("Apple")).toBeInTheDocument();
			expect(screen.getByText("Banana")).toBeInTheDocument();
			expect(screen.getByText("Orange")).toBeInTheDocument();
		});
	});

	it("filters items when typing", async () => {
		await Default.run();

		const input = screen.getByRole("combobox");
		await userEvent.click(input);
		await userEvent.type(input, "app");

		await waitFor(() => {
			expect(screen.getByText("Apple")).toBeInTheDocument();
			expect(screen.getByText("Pineapple")).toBeInTheDocument();
		});
	});

	it("allows selecting an item", async () => {
		await Default.run();

		const input = screen.getByRole("combobox");
		await userEvent.click(input);

		await waitFor(() => {
			expect(screen.getByText("Apple")).toBeInTheDocument();
		});

		const option = screen.getByText("Apple");
		await userEvent.click(option);

		await waitFor(() => {
			expect(input).toHaveValue("Apple");
		});
	});

	it("renders groups with labels", async () => {
		await WithGroups.run();

		const input = screen.getByRole("combobox");
		await userEvent.click(input);

		await waitFor(() => {
			expect(screen.getByText("Fruits")).toBeInTheDocument();
			expect(screen.getByText("Vegetables")).toBeInTheDocument();
			expect(screen.getByText("Sweets")).toBeInTheDocument();
			expect(screen.getByText("Carrot")).toBeInTheDocument();
		});
	});
});
