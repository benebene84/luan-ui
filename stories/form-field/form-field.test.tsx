import { composeStories } from "@storybook/react";
import { render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import * as stories from "./form-field.stories";

const { Vertical, Horizontal } = composeStories(stories);

describe("FormField", () => {
	it("renders vertical form field correctly", async () => {
		await Vertical.run();

		const label = screen.getByText("Email");
		const input = screen.getByPlaceholderText("Enter your email");
		const helperText = screen.getByText("This is a helper text");

		expect(label).toBeInTheDocument();
		expect(input).toBeInTheDocument();
		expect(helperText).toBeInTheDocument();
	});

	it("renders horizontal form field correctly", async () => {
		await Horizontal.run();

		const label = screen.getByText("Agree to terms and conditions");
		const checkbox = screen.getByRole("checkbox");
		const helperText = screen.getByText("This is a helper text");

		expect(label).toBeInTheDocument();
		expect(checkbox).toBeInTheDocument();
		expect(helperText).toBeInTheDocument();
	});

	it("shows error state correctly", async () => {
		const { container } = render(<Vertical error={true} />);

		await waitFor(
			() => {
				const errorText = screen.getByText("There was an error on this field");
				expect(errorText).toBeInTheDocument();
			},
			{ container },
		);
	});

	it("shows disabled state correctly", async () => {
		render(<Vertical disabled={true} />);

		const input = screen.getByPlaceholderText("Enter your email");
		expect(input).toBeDisabled();
	});

	it("shows required state correctly", async () => {
		render(<Vertical required={true} />);

		const input = screen.getByPlaceholderText("Enter your email");
		expect(input).toBeRequired();
	});
});
