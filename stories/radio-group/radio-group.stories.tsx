import { FormField } from "@components/form-field/form-field";
import { FormHelper } from "@components/form-helper/form-helper";
import type { Meta, StoryObj } from "@storybook/react-webpack5";
import type { RadioGroup as RadioGroupPrimitive } from "radix-ui";
import { Label } from "../../src/components/label/label";
import {
	RadioGroup,
	RadioGroupItem,
} from "../../src/components/radio-group/radio-group";

const meta = {
	title: "Components/RadioGroup",
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

export const WithFormField: Story = {
	render: ({ disabled, required }) => (
		<form>
			<FormField orientation="vertical" disabled={disabled} required={required}>
				<Label htmlFor="fruits">Select your favorite fruit</Label>
				<RadioGroup>
					<div className="flex flex-row items-center gap-2">
						<RadioGroupItem value="apple" id="apple" className="peer" />
						<Label htmlFor="apple">Apple</Label>
					</div>
					<div className="flex items-center gap-2">
						<RadioGroupItem value="banana" id="banana" className="peer" />
						<Label htmlFor="banana">Banana</Label>
					</div>
					<div className="flex items-center gap-2">
						<RadioGroupItem value="orange" id="orange" className="peer" />
						<Label htmlFor="orange">Orange</Label>
					</div>
				</RadioGroup>
				<FormHelper>Please select your favorite fruit</FormHelper>
			</FormField>
		</form>
	),
};
