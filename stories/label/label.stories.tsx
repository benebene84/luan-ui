import type { Meta, StoryObj } from "@storybook/react";

import { Input } from "@components/input/input";
import { Label } from "@components/label/label";

type LabelStoryProps = React.ComponentProps<typeof Label> & {
	disabled?: boolean;
};

const meta = {
	title: "Example/Label",
	component: Label,
	tags: ["autodocs"],
	argTypes: {
		children: {
			control: "text",
		},
		disabled: {
			control: "boolean",
		},
	},
} satisfies Meta<LabelStoryProps>;

export default meta;

type Story = StoryObj<LabelStoryProps>;

export const Default: Story = {
	render: ({ disabled, children, ...args }) => {
		return (
			<div className="flex w-fit flex-col-reverse gap-2">
				<Input
					id="input-field"
					placeholder="Type something..."
					className="peer"
					disabled={disabled}
				/>
				<Label htmlFor="input-field" {...args}>
					{children}
				</Label>
			</div>
		);
	},
	args: {
		children: "Label",
		disabled: false,
	},
};
