import type { Meta, StoryObj } from "@storybook/react";
import type { RadioGroup as RadioGroupPrimitive } from "radix-ui";
import { Label } from "../../src/components/label/label";
import {
	RadioGroup,
	RadioGroupItem,
} from "../../src/components/radio-group/radio-group";

const meta = {
	title: "Example/RadioGroup",
	component: RadioGroup,
	tags: ["autodocs"],
	argTypes: {
		disabled: {
			control: "boolean",
		},
		defaultValue: {
			control: "text",
		},
	},
} satisfies Meta<typeof RadioGroup>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		defaultValue: "option1",
	},
	render: (args) => (
		<RadioGroup {...args}>
			<div className="flex flex-row items-center gap-2">
				<RadioGroupItem value="option1" id="option1" className="peer" />
				<Label htmlFor="option1">Option 1</Label>
			</div>
			<div className="flex items-center gap-2">
				<RadioGroupItem value="option2" id="option2" className="peer" />
				<Label htmlFor="option2">Option 2</Label>
			</div>
			<div className="flex items-center gap-2">
				<RadioGroupItem value="option3" id="option3" className="peer" />
				<Label htmlFor="option3">Option 3</Label>
			</div>
		</RadioGroup>
	),
};
