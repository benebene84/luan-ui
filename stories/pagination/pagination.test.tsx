import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import {
	Pagination,
	PaginationItem,
	PaginationNext,
	PaginationPrev,
} from "../../src/components/pagination/pagination";

describe("Pagination", () => {
	const onPageChange = vi.fn();
	const user = userEvent.setup();

	beforeEach(() => {
		onPageChange.mockClear();
	});

	const renderPagination = (page: number, totalPages: number) => {
		return render(
			<Pagination
				page={page}
				totalPages={totalPages}
				onPageChange={onPageChange}
			>
				<PaginationPrev>
					<ChevronLeftIcon className="h-5 w-5" />
				</PaginationPrev>
				{Array.from({ length: totalPages }, (_, i) => (
					<PaginationItem key={`page-${i + 1}`} />
				))}
				<PaginationNext>
					<ChevronRightIcon className="h-5 w-5" />
				</PaginationNext>
			</Pagination>,
		);
	};

	it("renders pagination with correct number of items", () => {
		renderPagination(1, 5);
		// Should render 5 page items + prev + next buttons
		expect(screen.getAllByRole("button")).toHaveLength(7);
	});

	it("highlights the active page", () => {
		renderPagination(3, 5);
		const activeButton = screen.getByText("3");
		expect(activeButton).toHaveClass("bg-gray-700");
	});

	it("calls onPageChange when clicking a page", async () => {
		renderPagination(1, 5);
		const pageButton = screen.getByText("2");
		await user.click(pageButton);
		expect(onPageChange).toHaveBeenCalledWith(2);
	});

	it("disables prev button on first page", () => {
		renderPagination(1, 5);
		const prevButton = screen.getAllByRole("button").at(0);
		expect(prevButton).toBeDisabled();
	});

	it("disables next button on last page", () => {
		renderPagination(5, 5);
		const nextButton = screen.getAllByRole("button").at(-1);
		expect(nextButton).toBeDisabled();
	});

	it("handles keyboard navigation", async () => {
		renderPagination(3, 5);
		const activeButton = screen.getByRole("button", { name: "3" });
		const allButtons = screen.getAllByRole("button");
		activeButton.focus();

		// Press left arrow to go to page 2
		await user.keyboard("[ArrowLeft]");
		await user.keyboard("[Enter]");

		expect(allButtons[2]).toHaveAttribute("aria-current", "page");

		// Press right arrow to go to page 4
		await user.keyboard("[ArrowRight]");
		await user.keyboard("[Enter]");

		expect(allButtons[3]).toHaveAttribute("aria-current", "page");
	});

	it("updates when page prop changes", () => {
		const { rerender } = renderPagination(1, 5);
		expect(screen.getByText("1")).toHaveClass("bg-gray-700");

		// Rerender with new page
		rerender(
			<Pagination page={3} totalPages={5} onPageChange={onPageChange}>
				<PaginationPrev>
					<ChevronLeftIcon className="h-5 w-5" />
				</PaginationPrev>
				{Array.from({ length: 5 }, (_, i) => (
					<PaginationItem key={`page-${i + 1}`} />
				))}
				<PaginationNext>
					<ChevronRightIcon className="h-5 w-5" />
				</PaginationNext>
			</Pagination>,
		);

		expect(screen.getByText("3")).toHaveClass("bg-gray-700");
	});
});
