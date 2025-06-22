import type { Meta, StoryObj } from "@storybook/react-vite";

import { Button } from "@components/button/button";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@components/tooltip/tooltip";

type TooltipStoryProps = React.ComponentProps<typeof Tooltip> & {
	children?: string;
	showArrow?: boolean;
};

const meta: Meta<TooltipStoryProps> = {
	title: "Components/Tooltip",
	component: Tooltip,
	tags: ["autodocs"],
	argTypes: {
		children: {
			control: "text",
		},
		showArrow: {
			control: "boolean",
		},
		side: {
			control: "select",
			options: ["top", "right", "bottom", "left"],
		},
	},
};

export default meta;

type Story = StoryObj<TooltipStoryProps>;

export const Default: Story = {
	decorators: [
		(Story) => (
			<div className="flex h-screen items-center justify-center">
				<Story />
			</div>
		),
	],
	render: ({ children, showArrow, side }) => (
		<Tooltip showArrow={showArrow} side={side}>
			<TooltipTrigger asChild>
				<Button variant="secondary">Hover me</Button>
			</TooltipTrigger>
			<TooltipContent>
				<p>{children}</p>
			</TooltipContent>
		</Tooltip>
	),
	args: {
		children: "This is a tooltip",
	},
};
