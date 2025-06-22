import { Button } from "@components/button/button";
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "@components/drawer/drawer";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
	title: "Components/Drawer",
	component: Drawer,
	parameters: {
		layout: "centered",
	},
	argTypes: {
		side: {
			control: "select",
			options: ["left", "right", "top", "bottom"],
		},
	},
	tags: ["autodocs"],
} satisfies Meta<typeof Drawer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: ({ side }) => (
		<Drawer side={side}>
			<DrawerTrigger asChild>
				<Button>Open Drawer</Button>
			</DrawerTrigger>
			<DrawerContent>
				<DrawerHeader>
					<DrawerTitle>Drawer Title</DrawerTitle>
					<DrawerDescription>
						This is a description of the drawer content.
					</DrawerDescription>
				</DrawerHeader>
				<div className="py-4">
					<p>This is the main content of the drawer.</p>
				</div>
				<DrawerFooter>
					<DrawerClose asChild>
						<Button variant="secondary">Cancel</Button>
					</DrawerClose>
					<Button>Save changes</Button>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	),
};
