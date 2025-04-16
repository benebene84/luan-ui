import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "../../src/components/button/button";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "../../src/components/popover/popover";

const meta: Meta<typeof Popover> = {
	title: "Example/Popover",
	component: Popover,
	tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		showArrow: true,
		side: "left",
	},
	decorators: [
		(Story) => (
			<div className="flex h-screen w-screen items-center justify-center">
				<Story />
			</div>
		),
	],
	render: (args) => (
		<Popover>
			<PopoverTrigger asChild>
				<Button variant="secondary">Open Popover</Button>
			</PopoverTrigger>
			<PopoverContent showArrow={args.showArrow} side={args.side}>
				<div className="flex flex-col gap-2">
					<h3 className="font-medium">Popover Title</h3>
					<p>This is a basic popover content with some text.</p>
				</div>
			</PopoverContent>
		</Popover>
	),
};
