import { composeStories } from "@storybook/react-vite";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import * as stories from "./autocomplete.stories";

const { Default, WithGroups } = composeStories(stories);

describe("Autocomplete", () => {
	it("renders the autocomplete input", async () => {
		await Default.run();

		const input = screen.getByRole("combobox");
		expect(input).toBeInTheDocument();
		expect(input).toHaveAttribute("placeholder", "Search tags...");
	});

	it("opens the popup and shows items when typing", async () => {
		await Default.run();

		const input = screen.getByRole("combobox");
		await userEvent.type(input, "f");

		await waitFor(() => {
			expect(screen.getByText("feature")).toBeInTheDocument();
			expect(screen.getByText("fix")).toBeInTheDocument();
		});
	});

	it("filters items based on input", async () => {
		await Default.run();

		const input = screen.getByRole("combobox");
		await userEvent.type(input, "bug");

		await waitFor(() => {
			expect(screen.getByText("bug")).toBeInTheDocument();
		});
	});

	it("allows selecting a suggestion", async () => {
		await Default.run();

		const input = screen.getByRole("combobox");
		await userEvent.type(input, "feat");

		await waitFor(() => {
			expect(screen.getByText("feature")).toBeInTheDocument();
		});

		const option = screen.getByText("feature");
		await userEvent.click(option);

		await waitFor(() => {
			expect(input).toHaveValue("feature");
		});
	});

	it("renders groups with labels", async () => {
		await WithGroups.run();

		const input = screen.getByRole("combobox");
		await userEvent.type(input, "c");

		await waitFor(() => {
			expect(screen.getByText("Components")).toBeInTheDocument();
		});
	});
});
