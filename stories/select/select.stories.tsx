import { FormField } from "@components/form-field/form-field";
import { FormHelper } from "@components/form-helper/form-helper";
import { Label } from "@components/label/label";
import type { Meta, StoryObj } from "@storybook/react-vite";
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

const meta: Meta<typeof Select> = {
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

const fruitItems = [
	{ value: null, label: "Select an option" },
	{ value: "apple", label: "Apple" },
	{ value: "banana", label: "Banana" },
	{ value: "orange", label: "Orange" },
	{ value: "pear", label: "Pear" },
	{ value: "pineapple", label: "Pineapple" },
	{ value: "strawberry", label: "Strawberry" },
	{ value: "watermelon", label: "Watermelon" },
	{ value: "mango", label: "Mango" },
	{ value: "kiwi", label: "Kiwi" },
	{ value: "grape", label: "Grape" },
	{ value: "peach", label: "Peach" },
	{ value: "plum", label: "Plum" },
	{ value: "pomegranate", label: "Pomegranate" },
];

const fruitOnlyItems = fruitItems.filter((item) => item.value !== null);

const vegetableItems = [
	{ value: "carrot", label: "Carrot" },
	{ value: "potato", label: "Potato" },
	{ value: "tomato", label: "Tomato" },
];

const sweetItems = [
	{ value: "chocolate", label: "Chocolate" },
	{ value: "ice-cream", label: "Ice Cream" },
	{ value: "cake", label: "Cake" },
];

const groupedItems = [
	{ value: null, label: "Select a fruit" },
	...fruitOnlyItems.slice(0, 3),
	...vegetableItems,
	...sweetItems,
];

export const Default: Story = {
	render: () => (
		<Select items={fruitItems}>
			<SelectTrigger className="w-45">
				<SelectValue />
			</SelectTrigger>
			<SelectContent className="max-h-50 overflow-y-auto">
				<SelectGroup>
					<SelectLabel>Fruits</SelectLabel>
					{fruitOnlyItems.map((item) => (
						<SelectItem key={item.value} value={item.value}>
							{item.label}
						</SelectItem>
					))}
				</SelectGroup>
			</SelectContent>
		</Select>
	),
};

export const WithGroups: Story = {
	render: () => (
		<Select items={groupedItems}>
			<SelectTrigger className="w-45">
				<SelectValue />
			</SelectTrigger>
			<SelectContent>
				<SelectGroup>
					<SelectLabel>Fruits</SelectLabel>
					{fruitOnlyItems.slice(0, 3).map((item) => (
						<SelectItem key={item.value} value={item.value}>
							{item.label}
						</SelectItem>
					))}
				</SelectGroup>
				<SelectSeparator />
				<SelectGroup>
					<SelectLabel>Vegetables</SelectLabel>
					{vegetableItems.map((item) => (
						<SelectItem key={item.value} value={item.value}>
							{item.label}
						</SelectItem>
					))}
				</SelectGroup>
				<SelectSeparator />
				<SelectGroup>
					<SelectLabel>Sweets</SelectLabel>
					{sweetItems.map((item) => (
						<SelectItem key={item.value} value={item.value}>
							{item.label}
						</SelectItem>
					))}
				</SelectGroup>
			</SelectContent>
		</Select>
	),
};

export const WithFormField: Story = {
	render: ({ disabled, required }) => (
		<form>
			<FormField orientation="vertical" disabled={disabled} required={required}>
				<Label htmlFor="fruits">Select your favorite fruit</Label>
				<Select items={fruitItems}>
					<SelectTrigger className="w-45" id="fruits">
						<SelectValue />
					</SelectTrigger>
					<SelectContent className="max-h-50 overflow-y-auto">
						<SelectGroup>
							<SelectLabel>Fruits</SelectLabel>
							{fruitOnlyItems.map((item) => (
								<SelectItem key={item.value} value={item.value}>
									{item.label}
								</SelectItem>
							))}
						</SelectGroup>
					</SelectContent>
				</Select>
				<FormHelper>This is a helper text</FormHelper>
			</FormField>
		</form>
	),
};
