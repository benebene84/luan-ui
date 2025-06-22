import type { Meta, StoryObj } from "@storybook/react-vite";

import { Icon } from "@components/icon/icon";
import { CheckCircledIcon } from "@radix-ui/react-icons";
import {
	Alert,
	AlertDescription,
	AlertTitle,
} from "../../src/components/alert/alert";

const meta = {
	title: "Components/Alert",
	component: Alert,
	tags: ["autodocs"],
	argTypes: {
		variant: {
			control: "radio",
			options: ["primary", "secondary", "error"],
		},
		size: {
			control: "radio",
			options: ["small", "medium"],
		},
	},
} satisfies Meta<typeof Alert>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: ({ variant = "primary", size = "medium" }) => (
		<Alert variant={variant} size={size}>
			<Icon size="small" asChild>
				<CheckCircledIcon />
			</Icon>
			<AlertTitle asChild>
				<h4>Information</h4>
			</AlertTitle>
			<AlertDescription asChild>
				<p>This is an informational alert message.</p>
			</AlertDescription>
		</Alert>
	),
};

export const AsChild: Story = {
	render: ({ variant = "primary", size = "medium" }) => (
		<Alert asChild variant={variant} size={size}>
			<a href="https://example.com">
				<AlertTitle>Clickable Alert</AlertTitle>
				<AlertDescription>
					This alert is clickable and acts as a link.
				</AlertDescription>
			</a>
		</Alert>
	),
};

export const Responsive: Story = {
	render: ({ variant = "primary" }) => (
		<Alert variant={variant} size={{ initial: "small", md: "medium" }}>
			<Icon size="small" asChild>
				<CheckCircledIcon />
			</Icon>
			<AlertTitle>Responsive Alert</AlertTitle>
			<AlertDescription>
				This is an informational alert message.
			</AlertDescription>
		</Alert>
	),
};
