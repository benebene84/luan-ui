import type { Meta, StoryObj } from "@storybook/react";
import type { Checkbox as CheckboxPrimitive } from "radix-ui";
import { Checkbox } from "../../src/components/checkbox/checkbox";

const meta = {
	title: "Example/Checkbox",
	component: Checkbox,
	tags: ["autodocs"],
	argTypes: {
		disabled: {
			control: "boolean",
		},
		checked: {
			control: "boolean",
		},
		size: {
			control: "select",
			options: ["small", "medium", "large"],
		},
	},
} satisfies Meta<typeof Checkbox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		disabled: false,
		defaultChecked: false,
	},
	render: (args) => {
		return (
			<form>
				<Checkbox {...args} />
			</form>
		);
	},
};

export const Responsive: Story = {
	...Default,
	args: {
		...Default.args,
		size: {
			initial: "small",
			sm: "medium",
			md: "large",
		},
	},
};
