import { composeStories } from "@storybook/react-vite";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import * as stories from "./slider.stories";

describe("Slider", () => {
	const user = userEvent.setup();
	const { Default, Range, Disabled } = composeStories(stories);

	it("renders with default value and shows tooltip", async () => {
		await Default.run();
		const slider = screen.getByRole("slider");
		expect(slider).toBeInTheDocument();
		expect(slider).toHaveAttribute("aria-valuenow", "50");
	});

	it("shows min and max values when showMinMax is true", async () => {
		await Default.run();
		const minValue = screen.getByText("0");
		const maxValue = screen.getByText("100");
		expect(minValue).toBeInTheDocument();
		expect(maxValue).toBeInTheDocument();
	});

	it("hides min and max values when showMinMax is false", async () => {
		await Default.run({ args: { showMinMax: false } });
		const minValue = screen.queryByText("0");
		const maxValue = screen.queryByText("100");
		expect(minValue).not.toBeInTheDocument();
		expect(maxValue).not.toBeInTheDocument();
	});

	it("renders range slider with two thumbs", async () => {
		await Range.run();
		const sliders = screen.getAllByRole("slider");
		expect(sliders).toHaveLength(2);
		expect(sliders[0]).toHaveAttribute("aria-valuenow", "25");
		expect(sliders[1]).toHaveAttribute("aria-valuenow", "75");
	});

	it("updates tooltip value when slider is moved", async () => {
		await Default.run();
		const slider = screen.getByRole("slider");
		slider.focus();
		await user.keyboard("[ArrowRight]");
		await waitFor(() => {
			expect(slider).toHaveAttribute("aria-valuenow", "51");
		});
	});
});
