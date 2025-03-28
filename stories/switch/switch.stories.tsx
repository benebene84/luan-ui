import type { Meta, StoryObj } from "@storybook/react";
import { Switch } from "../../src/components/switch/switch";

const meta = {
	title: "Example/Switch",
	component: Switch,
	tags: ["autodocs"],
	args: {
		disabled: false,
	},
	argTypes: {
		disabled: {
			control: "boolean",
			description: "Disables the switch",
		},
		onChange: {
			action: "changed",
		},
	},
} satisfies Meta<typeof Switch>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		disabled: false,
	},
};
