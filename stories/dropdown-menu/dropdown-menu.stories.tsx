import type { Meta, StoryObj } from "@storybook/react-vite";
import type { DropdownMenu as DropdownMenuPrimitive } from "radix-ui";
import { useState } from "react";
import { Button } from "../../src/components/button/button";
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger,
} from "../../src/components/dropdown-menu/dropdown-menu";

const meta = {
	title: "Components/DropdownMenu",
	component: DropdownMenu,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
} satisfies Meta<typeof DropdownMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button>Open Menu</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuLabel>My Account</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem>
					Profile
					<DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
				</DropdownMenuItem>
				<DropdownMenuItem>
					Settings
					<DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
				</DropdownMenuItem>
				<DropdownMenuItem>
					Help
					<DropdownMenuShortcut>⌘H</DropdownMenuShortcut>
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem>Log out</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	),
};

export const WithCheckboxItems: Story = {
	render: () => {
		const [showToolbar, setShowToolbar] = useState(true);
		const [showStatusbar, setShowStatusbar] = useState(false);
		const [showSidebar, setShowSidebar] = useState(false);
		return (
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button>View Options</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent className="w-48">
					<DropdownMenuLabel>View Options</DropdownMenuLabel>
					<DropdownMenuSeparator />
					<DropdownMenuCheckboxItem
						checked={showToolbar}
						onCheckedChange={setShowToolbar}
					>
						Show Toolbar
						<DropdownMenuShortcut>⌘T</DropdownMenuShortcut>
					</DropdownMenuCheckboxItem>
					<DropdownMenuCheckboxItem
						checked={showStatusbar}
						onCheckedChange={setShowStatusbar}
					>
						Show Statusbar
						<DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
					</DropdownMenuCheckboxItem>
					<DropdownMenuCheckboxItem
						checked={showSidebar}
						onCheckedChange={setShowSidebar}
					>
						Show Sidebar
						<DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
					</DropdownMenuCheckboxItem>
				</DropdownMenuContent>
			</DropdownMenu>
		);
	},
};

export const WithSubmenu: Story = {
	render: () => (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button>More Actions</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuItem>
					New Tab
					<DropdownMenuShortcut>⌘T</DropdownMenuShortcut>
				</DropdownMenuItem>
				<DropdownMenuItem>
					New Window
					<DropdownMenuShortcut>⌘N</DropdownMenuShortcut>
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuSub>
					<DropdownMenuSubTrigger>More Tools</DropdownMenuSubTrigger>
					<DropdownMenuSubContent>
						<DropdownMenuItem>Save Page As...</DropdownMenuItem>
						<DropdownMenuItem>Create Shortcut...</DropdownMenuItem>
						<DropdownMenuItem>Name Window...</DropdownMenuItem>
						<DropdownMenuSeparator />
						<DropdownMenuItem>Developer Tools</DropdownMenuItem>
					</DropdownMenuSubContent>
				</DropdownMenuSub>
				<DropdownMenuSeparator />
				<DropdownMenuItem>
					Settings
					<DropdownMenuShortcut>⌘,</DropdownMenuShortcut>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	),
};
