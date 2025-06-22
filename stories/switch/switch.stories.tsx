import type { Meta, StoryObj } from "@storybook/react-vite";
import { Switch } from "../../src/components/switch/switch";

const meta = {
	title: "Components/Switch",
	component: Switch,
	tags: ["autodocs"],
	args: {
		disabled: false,
	},
	argTypes: {
		disabled: {
			control: "boolean",
			description: "Disables the switch",
		},
		size: {
			control: "radio",
			options: ["small", "medium", "large"],
			description: "The size of the switch",
		},
		onCheckedChange: {
			action: "changed",
		},
	},
} satisfies Meta<typeof Switch>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		disabled: false,
	},
	render: (args) => (
		<form>
			<Switch {...args} />
		</form>
	),
};
