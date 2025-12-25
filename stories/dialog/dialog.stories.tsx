import { Input } from "@components/input/input";
import { Label } from "@components/label/label";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "../../src/components/button/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "../../src/components/dialog/dialog";

const meta: Meta<typeof Dialog> = {
	title: "Components/Dialog",
	component: Dialog,
	tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => (
		<Dialog>
			<DialogTrigger
				render={(props) => (
					<Button {...props} variant="secondary">
						Open Dialog
					</Button>
				)}
			/>
			<DialogContent className="w-11/12 md:min-w-md">
				<DialogHeader>
					<DialogTitle>Dialog Title</DialogTitle>
					<DialogDescription>This is a dialog description.</DialogDescription>
				</DialogHeader>
				<form className="flex flex-col gap-4">
					<div className="flex flex-col gap-2">
						<Label htmlFor="name">Name</Label>
						<Input placeholder="Name" id="name" type="text" />
					</div>
					<div className="flex flex-col gap-2">
						<Label htmlFor="email">Email</Label>
						<Input placeholder="Email" id="email" type="email" />
					</div>
				</form>
				<DialogFooter>
					<DialogClose
						render={(props) => (
							<Button {...props} variant="secondary">
								Close
							</Button>
						)}
					/>
					<Button variant="primary" onClick={() => alert("Save")}>
						Save
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	),
};
