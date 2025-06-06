import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { Button } from "../../src/components/button/button";
import { Toaster, toast } from "../../src/components/toast/toast";

const meta = {
	title: "Components/Toast",
	component: toast,
	tags: ["autodocs"],
} satisfies Meta<typeof toast>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		title: "Toast Title",
		description: "This is a description for the toast notification.",
		button: {
			label: "Close",
			onClick: () => console.log("Toast action clicked"),
		},
	},
	render: (args) => {
		return (
			<>
				<Button
					type="button"
					variant="primary"
					onClick={() => {
						toast({ ...args });
					}}
				>
					Show Toast
				</Button>
				<Toaster />
			</>
		);
	},
};
