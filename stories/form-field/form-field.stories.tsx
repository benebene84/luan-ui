import type { Meta, StoryObj } from "@storybook/react-vite";

import { Checkbox } from "../../src/components/checkbox/checkbox";
import { FormField } from "../../src/components/form-field/form-field";
import { FormHelper } from "../../src/components/form-helper/form-helper";
import { Input } from "../../src/components/input/input";
import { Label } from "../../src/components/label/label";
type FormFieldStoryProps = React.ComponentProps<typeof FormField>;

const meta = {
	title: "Components/FormField",
	component: FormField,
	tags: ["autodocs"],
	argTypes: {
		orientation: {
			control: "select",
			options: ["horizontal", "vertical"],
		},
		disabled: {
			control: "boolean",
		},
		required: {
			control: "boolean",
		},
		error: {
			control: "boolean",
		},
	},
} satisfies Meta<FormFieldStoryProps>;

export default meta;

type Story = StoryObj<FormFieldStoryProps>;

export const Vertical: Story = {
	render: ({ disabled, required, error }) => (
		<form>
			<FormField
				orientation="vertical"
				disabled={disabled}
				required={required}
				error={error}
			>
				<Label htmlFor="email">Email</Label>
				<Input id="email" type="email" placeholder="Enter your email" />
				<FormHelper>
					{error ? "There was an error on this field" : "This is a helper text"}
				</FormHelper>
			</FormField>
		</form>
	),
};

export const Horizontal: Story = {
	render: ({ disabled, required, error }) => (
		<form>
			<FormField
				orientation="horizontal"
				disabled={disabled}
				required={required}
				error={error}
			>
				<Label htmlFor="terms">Agree to terms and conditions</Label>
				<Checkbox id="terms" />
				<FormHelper>
					{error
						? "You must agree to the terms and conditions"
						: "This is a helper text"}
				</FormHelper>
			</FormField>
		</form>
	),
};
