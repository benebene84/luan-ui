import { Icon } from "@components/icon/icon";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import type { Meta, StoryObj } from "@storybook/react-vite";
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
				render={<ArrowRightIcon />}
				size={mapResponsiveValue(
					args.size,
					(size) => badgeSizeToIconSize[size ?? "small"],
				)}
			/>
			<span>Badge</span>
		</Badge>
	),
};

export const AsLink: Story = {
	render: () => (
		// biome-ignore lint/a11y/useAnchorContent: <just a demo>
		<Badge render={<a href="https://www.google.com" />}>Link Badge</Badge>
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
