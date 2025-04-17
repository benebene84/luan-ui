import type { Meta, StoryObj } from "@storybook/react";
import {
	Pagination,
	PaginationItem,
	PaginationNext,
	PaginationPrev,
} from "../../src/components/pagination/pagination";

const meta = {
	title: "Example/Pagination",
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
				<PaginationPrev />
				{Array.from({ length: args.totalPages }, (_, index) => (
					<PaginationItem
						key={`pagination-item-${
							// biome-ignore lint/suspicious/noArrayIndexKey: we just have the index
							index
						}`}
					/>
				))}
				<PaginationNext />
			</Pagination>
		);
	},
};
