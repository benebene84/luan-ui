import type { Meta, StoryObj } from "@storybook/react-vite";

import { Textarea } from "../../src/components/text-area/text-area";

const meta = {
	title: "Components/Textarea",
	component: Textarea,
	tags: ["autodocs"],
	argTypes: {
		placeholder: {
			control: "text",
		},
		disabled: {
			control: "boolean",
		},
		error: {
			control: "boolean",
		},
		rows: {
			control: "number",
		},
		cols: {
			control: "number",
		},
	},
} satisfies Meta<typeof Textarea>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		placeholder: "Enter your message...",
		disabled: false,
		error: false,
		rows: 4,
	},
};
