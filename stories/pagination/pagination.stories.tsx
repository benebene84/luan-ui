import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
	Pagination,
	PaginationItem,
	PaginationNext,
	PaginationPrev,
} from "../../src/components/pagination/pagination";

const meta = {
	title: "Components/Pagination",
	component: Pagination,
	tags: ["autodocs"],
	argTypes: {
		page: {
			control: "number",
			description: "Current page number",
		},
		totalPages: {
			control: "number",
			description: "Total number of pages",
		},
	},
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		page: 1,
		totalPages: 25,
		onPageChange: (page) => {
			console.log(page);
		},
	},
	render: (args) => {
		return (
			<Pagination {...args}>
				<PaginationPrev aria-label="Previous">
					<ChevronLeftIcon className="h-5 w-5" />
				</PaginationPrev>
				{Array.from({ length: args.totalPages }, (_, index) => (
					<PaginationItem
						key={`pagination-item-${
							// biome-ignore lint/suspicious/noArrayIndexKey: we just have the index
							index
						}`}
					/>
				))}
				<PaginationNext aria-label="Next">
					<ChevronRightIcon className="h-5 w-5" />
				</PaginationNext>
			</Pagination>
		);
	},
};
