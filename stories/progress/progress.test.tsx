import { composeStories } from "@storybook/react";
import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import * as stories from "./progress.stories";

const { Default } = composeStories(stories);

describe("Progress", () => {
	it("renders the progress bar with default value", async () => {
		await Default.run();

		const progressBar = screen.getByRole("progressbar");
		const progressLabel = screen.getByText("50%");

		expect(progressBar).toBeInTheDocument();
		expect(progressLabel).toBeInTheDocument();
	});

	it("renders the progress bar with different max values", async () => {
		await Default.run({ args: { max: 200, value: 100 } });

		const progressBar = screen.getByRole("progressbar");
		const progressLabel = screen.getByText("100%");

		expect(progressBar).toBeInTheDocument();
		expect(progressLabel).toBeInTheDocument();
		expect(progressBar).toHaveAttribute("aria-valuemax", "200");
	});
});
