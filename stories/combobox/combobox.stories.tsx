import { FormField } from "@components/form-field/form-field";
import { FormHelper } from "@components/form-helper/form-helper";
import { Label } from "@components/label/label";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Fragment } from "react";
import {
	Combobox,
	ComboboxClear,
	ComboboxCollection,
	ComboboxContent,
	ComboboxEmpty,
	ComboboxGroup,
	ComboboxGroupLabel,
	ComboboxInput,
	ComboboxInputGroup,
	ComboboxItem,
	ComboboxList,
	ComboboxSeparator,
	ComboboxTrigger,
	useComboboxFilteredItems,
} from "../../src/components/combobox/combobox";

const meta: Meta<typeof Combobox> = {
	title: "Components/Combobox",
	component: Combobox,
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

interface Fruit {
	label: string;
	value: string;
}

const fruitItems: Fruit[] = [
	{ label: "Apple", value: "apple" },
	{ label: "Banana", value: "banana" },
	{ label: "Orange", value: "orange" },
	{ label: "Pear", value: "pear" },
	{ label: "Pineapple", value: "pineapple" },
	{ label: "Strawberry", value: "strawberry" },
	{ label: "Watermelon", value: "watermelon" },
	{ label: "Mango", value: "mango" },
	{ label: "Kiwi", value: "kiwi" },
	{ label: "Grape", value: "grape" },
	{ label: "Peach", value: "peach" },
	{ label: "Plum", value: "plum" },
];

const vegetableItems: Fruit[] = [
	{ label: "Carrot", value: "carrot" },
	{ label: "Potato", value: "potato" },
	{ label: "Tomato", value: "tomato" },
];

const sweetItems: Fruit[] = [
	{ label: "Chocolate", value: "chocolate" },
	{ label: "Ice Cream", value: "ice-cream" },
	{ label: "Cake", value: "cake" },
];

interface ItemGroup {
	label: string;
	items: Fruit[];
}

const groupedItems: ItemGroup[] = [
	{ label: "Fruits", items: fruitItems.slice(0, 3) },
	{ label: "Vegetables", items: vegetableItems },
	{ label: "Sweets", items: sweetItems },
];

export const Default: Story = {
	render: ({ disabled, required, multiple }) => (
		<Combobox
			items={fruitItems}
			disabled={disabled}
			required={required}
			multiple={multiple}
		>
			<ComboboxInputGroup className="w-60">
				<ComboboxInput placeholder="Select a fruit..." />
				<ComboboxClear />
				<ComboboxTrigger />
			</ComboboxInputGroup>
			<ComboboxContent>
				<ComboboxEmpty>No fruits found.</ComboboxEmpty>
				<ComboboxList>
					{(item: Fruit) => (
						<ComboboxItem key={item.value} value={item}>
							{item.label}
						</ComboboxItem>
					)}
				</ComboboxList>
			</ComboboxContent>
		</Combobox>
	),
};

export const WithGroups: Story = {
	render: ({ disabled, required }) => {
		function GroupedList() {
			const filteredGroups = useComboboxFilteredItems<ItemGroup>();
			return (
				<>
					{filteredGroups.map((group, index) => (
						<Fragment key={group.label}>
							{index > 0 ? <ComboboxSeparator /> : null}
							<ComboboxGroup items={group.items}>
								<ComboboxGroupLabel>{group.label}</ComboboxGroupLabel>
								<ComboboxCollection>
									{(item: Fruit) => (
										<ComboboxItem key={item.value} value={item}>
											{item.label}
										</ComboboxItem>
									)}
								</ComboboxCollection>
							</ComboboxGroup>
						</Fragment>
					))}
				</>
			);
		}
		return (
			<Combobox items={groupedItems} disabled={disabled} required={required}>
				<ComboboxInputGroup className="w-60">
					<ComboboxInput placeholder="Search items..." />
					<ComboboxClear />
					<ComboboxTrigger />
				</ComboboxInputGroup>
				<ComboboxContent>
					<ComboboxEmpty>No items found.</ComboboxEmpty>
					<ComboboxList>
						<GroupedList />
					</ComboboxList>
				</ComboboxContent>
			</Combobox>
		);
	},
};

export const WithFormField: Story = {
	render: ({ disabled, required }) => (
		<form>
			<FormField orientation="vertical" disabled={disabled} required={required}>
				<Label htmlFor="combobox-fruit">Select your favorite fruit</Label>
				<Combobox items={fruitItems}>
					<ComboboxInputGroup className="w-60">
						<ComboboxInput
							placeholder="Select a fruit..."
							id="combobox-fruit"
						/>
						<ComboboxClear />
						<ComboboxTrigger />
					</ComboboxInputGroup>
					<ComboboxContent>
						<ComboboxEmpty>No fruits found.</ComboboxEmpty>
						<ComboboxList>
							{(item: Fruit) => (
								<ComboboxItem key={item.value} value={item}>
									{item.label}
								</ComboboxItem>
							)}
						</ComboboxList>
					</ComboboxContent>
				</Combobox>
				<FormHelper>This is a helper text</FormHelper>
			</FormField>
		</form>
	),
};
