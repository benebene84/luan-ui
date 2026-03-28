import { FormField } from "@components/form-field/form-field";
import { FormHelper } from "@components/form-helper/form-helper";
import { Label } from "@components/label/label";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
	Autocomplete,
	AutocompleteClear,
	AutocompleteContent,
	AutocompleteEmpty,
	AutocompleteGroup,
	AutocompleteGroupLabel,
	AutocompleteInput,
	AutocompleteInputGroup,
	AutocompleteItem,
	AutocompleteList,
	AutocompleteSeparator,
	AutocompleteTrigger,
} from "../../src/components/autocomplete/autocomplete";

const meta: Meta<typeof Autocomplete> = {
	title: "Components/Autocomplete",
	component: Autocomplete,
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

interface Tag {
	id: string;
	value: string;
}

const tagItems: Tag[] = [
	{ id: "t1", value: "feature" },
	{ id: "t2", value: "fix" },
	{ id: "t3", value: "bug" },
	{ id: "t4", value: "docs" },
	{ id: "t5", value: "internal" },
	{ id: "t6", value: "mobile" },
	{ id: "t7", value: "performance" },
	{ id: "t8", value: "security" },
	{ id: "t9", value: "testing" },
	{ id: "t10", value: "refactor" },
];

const componentTags: Tag[] = [
	{ id: "c1", value: "component: button" },
	{ id: "c2", value: "component: input" },
	{ id: "c3", value: "component: select" },
	{ id: "c4", value: "component: dialog" },
];

const utilityTags: Tag[] = [
	{ id: "u1", value: "utility: cn" },
	{ id: "u2", value: "utility: responsive" },
	{ id: "u3", value: "utility: merge-refs" },
];

export const Default: Story = {
	render: ({ disabled, required }) => (
		<Autocomplete
			items={tagItems}
			itemToStringValue={(tag: Tag) => tag.value}
			disabled={disabled}
			required={required}
		>
			<AutocompleteInputGroup className="w-60">
				<AutocompleteInput placeholder="Search tags..." />
				<AutocompleteClear />
				<AutocompleteTrigger />
			</AutocompleteInputGroup>
			<AutocompleteContent>
				<AutocompleteEmpty>No tags found.</AutocompleteEmpty>
				<AutocompleteList>
					{(tag: Tag) => (
						<AutocompleteItem key={tag.id} value={tag}>
							{tag.value}
						</AutocompleteItem>
					)}
				</AutocompleteList>
			</AutocompleteContent>
		</Autocomplete>
	),
};

export const WithGroups: Story = {
	render: ({ disabled, required }) => (
		<Autocomplete
			items={[...tagItems.slice(0, 4), ...componentTags, ...utilityTags]}
			itemToStringValue={(tag: Tag) => tag.value}
			disabled={disabled}
			required={required}
		>
			<AutocompleteInputGroup className="w-60">
				<AutocompleteInput placeholder="Search tags..." />
				<AutocompleteClear />
				<AutocompleteTrigger />
			</AutocompleteInputGroup>
			<AutocompleteContent>
				<AutocompleteEmpty>No tags found.</AutocompleteEmpty>
				<AutocompleteList>
					<AutocompleteGroup>
						<AutocompleteGroupLabel>General</AutocompleteGroupLabel>
						{tagItems.slice(0, 4).map((tag) => (
							<AutocompleteItem key={tag.id} value={tag}>
								{tag.value}
							</AutocompleteItem>
						))}
					</AutocompleteGroup>
					<AutocompleteSeparator />
					<AutocompleteGroup>
						<AutocompleteGroupLabel>Components</AutocompleteGroupLabel>
						{componentTags.map((tag) => (
							<AutocompleteItem key={tag.id} value={tag}>
								{tag.value}
							</AutocompleteItem>
						))}
					</AutocompleteGroup>
					<AutocompleteSeparator />
					<AutocompleteGroup>
						<AutocompleteGroupLabel>Utilities</AutocompleteGroupLabel>
						{utilityTags.map((tag) => (
							<AutocompleteItem key={tag.id} value={tag}>
								{tag.value}
							</AutocompleteItem>
						))}
					</AutocompleteGroup>
				</AutocompleteList>
			</AutocompleteContent>
		</Autocomplete>
	),
};

export const WithFormField: Story = {
	render: ({ disabled, required }) => (
		<form>
			<FormField orientation="vertical" disabled={disabled} required={required}>
				<Label htmlFor="autocomplete-tags">Search tags</Label>
				<Autocomplete
					items={tagItems}
					itemToStringValue={(tag: Tag) => tag.value}
				>
					<AutocompleteInputGroup className="w-60">
						<AutocompleteInput
							placeholder="Search tags..."
							id="autocomplete-tags"
						/>
						<AutocompleteClear />
						<AutocompleteTrigger />
					</AutocompleteInputGroup>
					<AutocompleteContent>
						<AutocompleteEmpty>No tags found.</AutocompleteEmpty>
						<AutocompleteList>
							{(tag: Tag) => (
								<AutocompleteItem key={tag.id} value={tag}>
									{tag.value}
								</AutocompleteItem>
							)}
						</AutocompleteList>
					</AutocompleteContent>
				</Autocomplete>
				<FormHelper>This is a helper text</FormHelper>
			</FormField>
		</form>
	),
};
