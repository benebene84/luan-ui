import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { Button } from "../../src/components/button/button";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "../../src/components/popover/popover";

const meta: Meta<typeof Popover> = {
	title: "Components/Popover",
	component: Popover,
	tags: ["autodocs"],
	argTypes: {
		showArrow: {
			control: "boolean",
		},
		side: {
			control: "select",
			options: ["top", "right", "bottom", "left"],
		},
		showCloseButton: {
			control: "boolean",
		},
	},
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		showArrow: true,
		side: "left",
		showCloseButton: true,
	},
	decorators: [
		(Story) => (
			<div className="flex h-screen w-screen items-center justify-center">
				<Story />
			</div>
		),
	],
	render: (args) => (
		<Popover {...args}>
			<PopoverTrigger asChild>
				<Button variant="secondary">Open Popover</Button>
			</PopoverTrigger>
			<PopoverContent>
				<div className="flex flex-col gap-2">
					<h3 className="font-medium">Popover Title</h3>
					<p>This is a basic popover content with some text.</p>
				</div>
			</PopoverContent>
		</Popover>
	),
};
