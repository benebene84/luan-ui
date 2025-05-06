import type { Meta, StoryObj } from "@storybook/react";

import { Input } from "../../src/components/input/input";

const meta = {
	title: "Components/Input",
	component: Input,
	tags: ["autodocs"],
	argTypes: {
		placeholder: {
			control: "text",
		},
		disabled: {
			control: "boolean",
		},
		type: {
			control: "select",
			options: ["text", "email", "password", "number"],
		},
	},
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		placeholder: "Enter text...",
		disabled: false,
		type: "text",
	},
};
