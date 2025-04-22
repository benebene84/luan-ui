import type { Meta, StoryObj } from "@storybook/react";

import { Input } from "../../src/components/input/input";
import { Label } from "../../src/components/label/label";

const meta = {
	title: "Example/Label",
	component: Label,
	tags: ["autodocs"],
	argTypes: {
		children: {
			control: "text",
		},
		// @ts-expect-error
		disabled: {
			control: "boolean",
		},
	},
} satisfies Meta<typeof Label>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: (args) => (
		<div className="flex w-fit flex-col-reverse gap-2">
			<Input
				id="input-field"
				placeholder="Type something..."
				className="peer"
				// @ts-expect-error
				disabled={args.disabled}
			/>
			<Label htmlFor="input-field" {...args}>
				{args.children}
			</Label>
		</div>
	),
	args: {
		children: "Label",
	},
};
