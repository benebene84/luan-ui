import { Icon } from "@components/icon/icon";
import { CheckCircledIcon } from "@radix-ui/react-icons";
import type { Meta, StoryObj } from "@storybook/react-vite";
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
			<Icon render={<CheckCircledIcon />} size="small" />
			<AlertTitle render={(props) => <h4 {...props}>Information</h4>} />
			<AlertDescription
				render={<p>This is an informational alert message.</p>}
			/>
		</Alert>
	),
};

export const WithRenderProp: Story = {
	render: ({ variant = "primary", size = "medium" }) => (
		<Alert
			// biome-ignore lint/a11y/useAnchorContent: <just a demo>
			render={<a href="https://example.com" />}
			variant={variant}
			size={size}
		>
			<AlertTitle>Clickable Alert</AlertTitle>
			<AlertDescription>
				This alert is clickable and acts as a link.
			</AlertDescription>
		</Alert>
	),
};

export const Responsive: Story = {
	render: ({ variant = "primary" }) => (
		<Alert variant={variant} size={{ initial: "small", md: "medium" }}>
			<Icon render={<CheckCircledIcon />} size="small" />
			<AlertTitle>Responsive Alert</AlertTitle>
			<AlertDescription>
				This is an informational alert message.
			</AlertDescription>
		</Alert>
	),
};
