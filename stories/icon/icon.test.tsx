import { composeStories } from "@storybook/react-webpack5";
import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import * as stories from "./icon.stories";

const { Default, Responsive } = composeStories(stories);

describe("Icon", () => {
	it("renders small icon correctly", async () => {
		await Default.run({
			args: {
				...Default.args,
				size: "small",
			},
		});

		const icon = screen.getByTestId("StarIcon");
		expect(icon).toBeInTheDocument();
		expect(icon).toHaveClass("h-4", "w-4"); // small size classes
	});

	it("renders middle icon correctly", async () => {
		await Default.run({
			args: {
				...Default.args,
				size: "medium",
			},
		});

		const icon = screen.getByTestId("StarIcon");
		expect(icon).toBeInTheDocument();
		expect(icon).toHaveClass("h-6", "w-6"); // middle size classes
	});

	it("renders large icon correctly", async () => {
		await Default.run({
			args: {
				...Default.args,
				size: "large",
			},
		});

		const icon = screen.getByTestId("StarIcon");
		expect(icon).toBeInTheDocument();
		expect(icon).toHaveClass("h-8", "w-8"); // large size classes
	});

	it("renders with responsive sizes", async () => {
		await Responsive.run();

		const icon = screen.getByTestId("StarIcon");
		expect(icon).toHaveClass("h-4", "w-4"); // initial size
		expect(icon).toHaveClass("sm:h-6", "sm:w-6"); // sm breakpoint
		expect(icon).toHaveClass("md:h-8", "md:w-8"); // md breakpoint
	});
});
