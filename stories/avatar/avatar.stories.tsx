import type { Meta, StoryObj } from "@storybook/react-vite";

import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from "../../src/components/avatar/avatar";

import type { Avatar as AvatarType } from "radix-ui";

const meta = {
	title: "Components/Avatar",
	component: Avatar,
	tags: ["autodocs"],
	argTypes: {
		className: {
			control: "text",
		},
	},
} satisfies Meta<typeof Avatar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const WithImage: Story = {
	render: () => (
		<Avatar>
			<AvatarImage
				src="https://avatars.githubusercontent.com/u/62141265?v=4"
				alt="@benebene84"
			/>
			<AvatarFallback>BS</AvatarFallback>
		</Avatar>
	),
};

export const WithFallback: Story = {
	render: () => (
		<Avatar>
			<AvatarFallback>BS</AvatarFallback>
		</Avatar>
	),
};

export const CustomSize: Story = {
	render: () => (
		<Avatar className="h-16 w-16">
			<AvatarImage
				src="https://avatars.githubusercontent.com/u/62141265?v=4"
				alt="@benebene84"
			/>
			<AvatarFallback>BS</AvatarFallback>
		</Avatar>
	),
};
