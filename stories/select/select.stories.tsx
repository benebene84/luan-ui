import type { Meta, StoryObj } from "@storybook/react";
import type { Select as SelectPrimitive } from "radix-ui";

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
