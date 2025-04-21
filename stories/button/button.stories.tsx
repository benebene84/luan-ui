import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";
import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "../../src/components/button/button";

// Define the Meta type with the Button component props
const meta = {
	title: "Example/Button",
	component: Button,
	tags: ["autodocs"],
	argTypes: {
		variant: {
			control: "radio",
			options: ["primary", "secondary"],
		},
		size: {
			control: "radio",
			options: ["small", "medium", "large"],
		},
	},
} satisfies Meta<typeof Button>;

export default meta;

// Use the inferred type from meta
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		variant: "primary",
		size: "medium",
		children: "Button",
		disabled: false,
		iconStart: <ArrowLeftIcon aria-label="ArrowLeftIcon" />,
		iconEnd: <ArrowRightIcon aria-label="ArrowRightIcon" />,
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
		iconStart: <ArrowLeftIcon />,
		iconEnd: <ArrowRightIcon />,
	},
};

export const AsChild: Story = {
	render: () => (
		<Button asChild iconStart={<ArrowLeftIcon />} iconEnd={<ArrowRightIcon />}>
			<a href="https://www.google.com">Test</a>
		</Button>
	),
};
