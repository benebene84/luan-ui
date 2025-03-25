import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "../../src/components/button/button";

const meta: Meta<typeof Button> = {
	title: "Example/Button",
	component: Button,
	tags: ["autodocs"],
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {
		variant: "primary",
		size: "large",
		children: "Button",
	},
};

export const Secondary: Story = {
	args: {
		variant: "secondary",
		size: "medium",
		children: "Button",
		className: "bg-red-500",
	},
};

export const Responsive: Story = {
	args: {
		variant: "primary",
		size: {
			initial: "small",
			sm: "medium",
			md: "large",
		},
		children: "Button",
	},
};
