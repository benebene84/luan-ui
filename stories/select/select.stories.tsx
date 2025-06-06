import type { Meta, StoryObj } from "@storybook/react-webpack5";
import type { Select as SelectPrimitive } from "radix-ui";

import { FormField } from "@components/form-field/form-field";
import { FormHelper } from "@components/form-helper/form-helper";
import { Label } from "@components/label/label";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectSeparator,
	SelectTrigger,
	SelectValue,
} from "../../src/components/select/select";

const meta: Meta<typeof SelectPrimitive.Root> = {
	title: "Components/Select",
	component: Select,
	tags: ["autodocs"],
	argTypes: {
		disabled: {
			control: "boolean",
		},
		required: {
			control: "boolean",
		},
	},
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => (
		<Select>
			<SelectTrigger className="w-[180px]">
				<SelectValue placeholder="Select an option" />
			</SelectTrigger>
			<SelectContent className="max-h-[200px] overflow-y-auto">
				<SelectGroup>
					<SelectLabel>Fruits</SelectLabel>
					<SelectItem value="apple">Apple</SelectItem>
					<SelectItem value="banana">Banana</SelectItem>
					<SelectItem value="orange">Orange</SelectItem>
					<SelectItem value="pear">Pear</SelectItem>
					<SelectItem value="pineapple">Pineapple</SelectItem>
					<SelectItem value="strawberry">Strawberry</SelectItem>
					<SelectItem value="watermelon">Watermelon</SelectItem>
					<SelectItem value="mango">Mango</SelectItem>
					<SelectItem value="kiwi">Kiwi</SelectItem>
					<SelectItem value="grape">Grape</SelectItem>
					<SelectItem value="peach">Peach</SelectItem>
					<SelectItem value="plum">Plum</SelectItem>
					<SelectItem value="pomegranate">Pomegranate</SelectItem>
				</SelectGroup>
			</SelectContent>
		</Select>
	),
};

export const WithGroups: Story = {
	render: () => (
		<Select>
			<SelectTrigger className="w-[180px]">
				<SelectValue placeholder="Select a fruit" />
			</SelectTrigger>
			<SelectContent>
				<SelectGroup>
					<SelectLabel>Fruits</SelectLabel>
					<SelectItem value="apple">Apple</SelectItem>
					<SelectItem value="banana">Banana</SelectItem>
					<SelectItem value="orange">Orange</SelectItem>
				</SelectGroup>
				<SelectSeparator />
				<SelectGroup>
					<SelectLabel>Vegetables</SelectLabel>
					<SelectItem value="carrot">Carrot</SelectItem>
					<SelectItem value="potato">Potato</SelectItem>
					<SelectItem value="tomato">Tomato</SelectItem>
				</SelectGroup>
				<SelectSeparator />
				<SelectGroup>
					<SelectLabel>Sweets</SelectLabel>
					<SelectItem value="chocolate">Chocolate</SelectItem>
					<SelectItem value="ice-cream">Ice Cream</SelectItem>
					<SelectItem value="cake">Cake</SelectItem>
				</SelectGroup>
			</SelectContent>
		</Select>
	),
};

export const WithFormField: Story = {
	render: ({ disabled, required, error }) => (
		<form>
			<FormField
				orientation="vertical"
				disabled={disabled}
				required={required}
				error={error}
			>
				<Label htmlFor="fruits">Select your favorite fruit</Label>
				<Select>
					<SelectTrigger className="w-[180px]" id="fruits">
						<SelectValue placeholder="Select an option" />
					</SelectTrigger>
					<SelectContent className="max-h-[200px] overflow-y-auto">
						<SelectGroup>
							<SelectLabel>Fruits</SelectLabel>
							<SelectItem value="apple">Apple</SelectItem>
							<SelectItem value="banana">Banana</SelectItem>
							<SelectItem value="orange">Orange</SelectItem>
							<SelectItem value="pear">Pear</SelectItem>
							<SelectItem value="pineapple">Pineapple</SelectItem>
							<SelectItem value="strawberry">Strawberry</SelectItem>
							<SelectItem value="watermelon">Watermelon</SelectItem>
							<SelectItem value="mango">Mango</SelectItem>
							<SelectItem value="kiwi">Kiwi</SelectItem>
							<SelectItem value="grape">Grape</SelectItem>
							<SelectItem value="peach">Peach</SelectItem>
							<SelectItem value="plum">Plum</SelectItem>
							<SelectItem value="pomegranate">Pomegranate</SelectItem>
						</SelectGroup>
					</SelectContent>
				</Select>
				<FormHelper>
					{error ? "There was an error on this field" : "This is a helper text"}
				</FormHelper>
			</FormField>
		</form>
	),
};
