import { StarIcon } from "@radix-ui/react-icons";
import type { Meta, StoryObj } from "@storybook/react-vite";

import { Icon } from "../../src/components/icon/icon";

// Define the Meta type with the Icon component props
const meta = {
	title: "Components/Icon",
	component: Icon,
	tags: ["autodocs"],
	argTypes: {
		size: {
			control: "radio",
			options: ["small", "medium", "large"],
		},
	},
} satisfies Meta<typeof Icon>;

export default meta;

// Use the inferred type from meta
type Story = StoryObj<typeof meta>;

StarIcon.displayName = "StarIcon";

export const Default: Story = {
	args: {
		size: "small",
		asChild: true,
		children: <StarIcon data-testid="StarIcon" />,
	},
};

export const Responsive: Story = {
	args: {
		size: {
			initial: "small",
			sm: "medium",
			md: "large",
		},
		asChild: true,
		children: <StarIcon data-testid="StarIcon" />,
	},
};
