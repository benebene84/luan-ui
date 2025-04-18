import { composeStories } from "@storybook/react";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import * as stories from "./pagination.stories";

describe("Pagination", () => {
	const user = userEvent.setup();

	const { Default } = composeStories(stories);

	it("renders pagination with correct number of items", async () => {
		await Default.run();
		// Should render 5 page items + prev + next buttons
		expect(screen.getAllByRole("button")).toHaveLength(7);
	});

	it("calls onPageChange when clicking a page", async () => {
		const onPageChange = vi.fn();
		await Default.run({
			args: { page: 2, totalPages: 5, onPageChange },
		});
		const pageButton = screen.getByText("2");
		await user.click(pageButton);
		expect(onPageChange).toHaveBeenCalledWith(2);
	});

	it("disables prev button on first page", async () => {
		await Default.run({ args: { page: 1, totalPages: 5 } });
		const prevButton = screen.getByRole("button", { name: "Previous" });
		expect(prevButton).toBeDisabled();
	});

	it("disables next button on last page", async () => {
		await Default.run({ args: { page: 5, totalPages: 5 } });
		const nextButton = screen.getByRole("button", { name: "Next" });
		expect(nextButton).toBeDisabled();
	});

	it("handles keyboard navigation", async () => {
		await Default.run({ args: { page: 3, totalPages: 5 } });
		const activeButton = screen.getByRole("button", { name: "3" });
		activeButton.focus();

		// Press left arrow to go to page 2
		await user.keyboard("[ArrowLeft]");
		expect(screen.getByRole("button", { name: "2" })).toHaveFocus();
		// Press enter to select the page
		await user.keyboard("[Enter]");

		expect(screen.getByRole("button", { name: "2" })).toHaveAttribute(
			"aria-current",
			"page",
		);

		// Press right arrow to go to page 4
		await user.keyboard("[ArrowRight][ArrowRight]");
		await user.keyboard("[Enter]");

		expect(screen.getByRole("button", { name: "4" })).toHaveAttribute(
			"aria-current",
			"page",
		);
	});

	it("renders ellipsis when there are more than 7 pages", async () => {
		await Default.run({ args: { page: 1, totalPages: 8 } });
		expect(screen.getByText("...")).toBeInTheDocument();
	});

	it("renders two ellipsis and the current page +- 2 pages and the last page", async () => {
		await Default.run({ args: { page: 8, totalPages: 25 } });
		expect(screen.getAllByText("...")).toHaveLength(2);
		expect(screen.getByRole("button", { name: "1" })).toBeInTheDocument();
		expect(screen.getByRole("button", { name: "6" })).toBeInTheDocument();
		expect(screen.getByRole("button", { name: "7" })).toBeInTheDocument();
		expect(screen.getByRole("button", { name: "8" })).toBeInTheDocument();
		expect(screen.getByRole("button", { name: "9" })).toBeInTheDocument();
		expect(screen.getByRole("button", { name: "10" })).toBeInTheDocument();
		expect(screen.getByRole("button", { name: "25" })).toBeInTheDocument();
	});

	it("doesn't render two ellipsis when the current page is at the beginning or end of the pagination (+- 4 pages)", async () => {
		await Default.run({ args: { page: 4, totalPages: 25 } });
		expect(screen.getAllByText("...")).toHaveLength(1);
		expect(screen.getByRole("button", { name: "1" })).toBeInTheDocument();
		expect(screen.getByRole("button", { name: "2" })).toBeInTheDocument();
		expect(screen.getByRole("button", { name: "3" })).toBeInTheDocument();
		expect(screen.getByRole("button", { name: "4" })).toBeInTheDocument();
		await Default.run({ args: { page: 22, totalPages: 25 } });
		expect(screen.getAllByText("...")).toHaveLength(1);
		expect(screen.getByRole("button", { name: "22" })).toBeInTheDocument();
		expect(screen.getByRole("button", { name: "23" })).toBeInTheDocument();
		expect(screen.getByRole("button", { name: "24" })).toBeInTheDocument();
		expect(screen.getByRole("button", { name: "25" })).toBeInTheDocument();
	});
});
