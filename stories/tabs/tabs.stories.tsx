import type { Meta, StoryObj } from "@storybook/react";

import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from "../../src/components/tabs/tabs";

type TabsProps = React.ComponentProps<typeof Tabs>;

const meta: Meta<TabsProps> = {
	title: "Components/Tabs",
	component: Tabs,
	tags: ["autodocs"],
} satisfies Meta<typeof Tabs>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => (
		<Tabs defaultValue="account">
			<TabsList>
				<TabsTrigger value="account">Account</TabsTrigger>
				<TabsTrigger value="password">Password</TabsTrigger>
				<TabsTrigger value="settings">Settings</TabsTrigger>
				<TabsTrigger value="disabled" disabled>
					Disabled
				</TabsTrigger>
			</TabsList>
			<TabsContent value="account">Account settings content</TabsContent>
			<TabsContent value="password">Password settings content</TabsContent>
			<TabsContent value="settings">Other settings content</TabsContent>
		</Tabs>
	),
};
