import type { Meta, StoryObj } from "@storybook/react";
import { Skeleton } from "../../src/components/skeleton/skeleton";

const meta = {
	title: "Components/Skeleton",
	component: Skeleton,
	tags: ["autodocs"],
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		className: "h-4 w-[250px]",
	},
};

export const Card: Story = {
	render: () => (
		<div className="flex flex-col gap-3">
			<Skeleton className="h-[125px] w-[250px] rounded-xl" />
			<div className="flex flex-col gap-2">
				<Skeleton className="h-4 w-[250px]" />
				<Skeleton className="h-4 w-[200px]" />
			</div>
		</div>
	),
};

export const Avatar: Story = {
	args: {
		className: "h-12 w-12 rounded-full",
	},
};

export const Text: Story = {
	render: () => (
		<div className="flex flex-col gap-2">
			<Skeleton className="h-4 w-[250px]" />
			<Skeleton className="h-4 w-[200px]" />
			<Skeleton className="h-4 w-[150px]" />
		</div>
	),
};
