import type { Meta, StoryObj } from "@storybook/react-webpack5";

import { Progress } from "../../src/components/progress/progress";

import type { Progress as ProgressPrimitive } from "radix-ui";

const meta = {
	title: "Components/Progress",
	component: Progress,
	tags: ["autodocs"],
	argTypes: {
		value: {
			control: {
				type: "range",
				min: 0,
				max: 100,
				step: 1,
			},
		},
	},
} satisfies Meta<typeof Progress>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		value: 50,
	},
};
