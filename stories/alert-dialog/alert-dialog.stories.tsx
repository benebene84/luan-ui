import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@components/alert-dialog/alert-dialog";
import { Button } from "@components/button/button";
import type { Meta, StoryObj } from "@storybook/react-vite";

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
			<AlertDialogTrigger
				render={(props) => (
					<Button {...props} variant="destructive">
						Delete Account
					</Button>
				)}
			/>
			<AlertDialogContent>
				<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
				<AlertDialogDescription>
					This action cannot be undone. This will permanently delete your
					account and remove your data from our servers.
				</AlertDialogDescription>
				<div className="flex justify-end gap-4">
					<AlertDialogCancel
						render={(props) => (
							<Button {...props} variant="secondary">
								Cancel
							</Button>
						)}
					/>
					<AlertDialogAction
						render={(props) => (
							<Button {...props} variant="destructive">
								Delete Account
							</Button>
						)}
					/>
				</div>
			</AlertDialogContent>
		</AlertDialog>
	),
};
