import { Icon } from "@components/icon/icon";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import type { Meta, StoryObj } from "@storybook/react";
import { mapResponsiveValue } from "@utilities/responsive/responsive";
import { Badge } from "../../src/components/badge/badge";
const meta = {
	title: "Components/Badge",
	component: Badge,
	tags: ["autodocs"],
	argTypes: {
		variant: {
			control: "radio",
			options: ["primary", "secondary", "destructive", "outline"],
		},
		size: {
			control: "radio",
			options: ["small", "medium", "large"],
		},
	},
} satisfies Meta<typeof Badge>;

export default meta;

type Story = StoryObj<typeof meta>;

const badgeSizeToIconSize = {
	small: "small",
	medium: "small",
	large: "medium",
} as const;

export const Default: Story = {
	args: {
		variant: "primary",
		size: "medium",
		children: "Badge",
	},
};

export const WithIcon: Story = {
	args: {
		variant: "primary",
		size: "medium",
	},
	render: ({ ...args }) => (
		<Badge {...args}>
			<Icon
				asChild
				size={mapResponsiveValue(
					args.size,
					(size) => badgeSizeToIconSize[size ?? "small"],
				)}
			>
				<ArrowRightIcon />
			</Icon>
			<span>Badge</span>
		</Badge>
	),
};

export const AsChild: Story = {
	render: () => (
		<Badge asChild>
			<a href="https://www.google.com">Link Badge</a>
		</Badge>
	),
};

export const Responsive: Story = {
	args: {
		...Default.args,
		size: {
			initial: "small",
			sm: "medium",
			md: "large",
		},
	},
};
