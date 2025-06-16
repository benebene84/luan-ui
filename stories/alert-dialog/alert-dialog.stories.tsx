import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogOverlay,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@components/alert-dialog/alert-dialog";
import { Button } from "@components/button/button";
import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { AlertDialog as RadixAlertDialog } from "radix-ui";

const meta = {
	title: "Components/AlertDialog",
	component: AlertDialog,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
} satisfies Meta<typeof AlertDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => (
		<AlertDialog>
			<AlertDialogTrigger asChild>
				<Button variant="destructive">Delete Account</Button>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
				<AlertDialogDescription>
					This action cannot be undone. This will permanently delete your
					account and remove your data from our servers.
				</AlertDialogDescription>
				<div className="flex justify-end gap-4">
					<AlertDialogCancel asChild>
						<Button variant="secondary">Cancel</Button>
					</AlertDialogCancel>
					<AlertDialogAction asChild>
						<Button variant="destructive">Delete Account</Button>
					</AlertDialogAction>
				</div>
			</AlertDialogContent>
		</AlertDialog>
	),
};
