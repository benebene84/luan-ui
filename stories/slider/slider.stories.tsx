import type { Meta, StoryObj } from "@storybook/react";
import type { Slider as SliderPrimitive } from "radix-ui";
import { Slider } from "../../src/components/slider/slider";

const meta: Meta<typeof Slider> = {
	title: "Components/Slider",
	component: Slider,
	tags: ["autodocs"],
	argTypes: {
		defaultValue: {
			control: "object",
			description: "The default value of the slider",
		},
		value: {
			control: "object",
			description: "The controlled value of the slider",
		},
		min: {
			control: "number",
			description: "The minimum value of the slider",
		},
		max: {
			control: "number",
			description: "The maximum value of the slider",
		},
		step: {
			control: "number",
			description: "The step value of the slider",
		},
		disabled: {
			control: "boolean",
			description: "Whether the slider is disabled",
		},
		showMinMax: {
			control: "boolean",
			description: "Whether to show the min and max values",
		},
	},
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		defaultValue: [50],
		min: 0,
		max: 100,
		step: 1,
		disabled: false,
		showMinMax: true,
	},
};

export const Range: Story = {
	args: {
		defaultValue: [25, 75],
		min: 0,
		max: 100,
		step: 1,
		disabled: false,
	},
};

export const Disabled: Story = {
	args: {
		defaultValue: [50],
		min: 0,
		max: 100,
		step: 1,
		disabled: true,
	},
};
