import { Icon } from "@components/icon/icon";
import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";
import type { Meta, StoryObj } from "@storybook/react-vite";

import { Button } from "../../src/components/button/button";

// Define the Meta type with the Button component props
const meta = {
	title: "Components/Button",
	component: Button,
	tags: ["autodocs"],
	argTypes: {
		variant: {
			control: "radio",
			options: ["primary", "secondary", "destructive"],
		},
		size: {
			control: "radio",
			options: ["small", "medium", "large"],
		},
	},
} satisfies Meta<typeof Button>;

export default meta;

// Use the inferred type from meta
export type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		variant: "primary",
		size: "medium",
		disabled: false,
	},
	render: (args) => (
		<Button {...args}>
			<Icon
				render={<ArrowLeftIcon aria-label="ArrowLeftIcon" />}
				size="small"
			/>
			Button
			<Icon
				render={<ArrowRightIcon aria-label="ArrowRightIcon" />}
				size="small"
			/>
		</Button>
	),
};

export const WithoutIcons: Story = {
	args: {
		variant: "primary",
		size: "medium",
		children: "Button",
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
	},
	render: (args) => (
		<Button {...args}>
			<Icon render={<ArrowLeftIcon />} size={args.size} />
			Button
			<Icon render={<ArrowRightIcon />} size={args.size} />
		</Button>
	),
};

export const AsLink: Story = {
	render: () => (
		// biome-ignore lint/a11y/useAnchorContent: <just a demo>
		<Button render={<a href="https://www.google.com" />}>
			<Icon render={<ArrowLeftIcon />} size="small" />
			Link Button
			<Icon render={<ArrowRightIcon />} size="small" />
		</Button>
	),
};
