import type { Meta, StoryObj } from "@storybook/react-vite";

import { Button } from "../../src/components/button/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from "../../src/components/card/card";

const meta = {
	title: "Components/Card",
	component: Card,
	tags: ["autodocs"],
	argTypes: {
		size: {
			control: "radio",
			options: ["small", "medium", "large"],
		},
	},
} satisfies Meta<typeof Card>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		children: "This is a basic card with some content",
	},
	render: (args) => (
		<Card {...args}>
			<CardHeader>
				<h3 className="font-semibold text-lg">Card Title</h3>
			</CardHeader>
			<CardContent>
				{args.children}
				<img
					src="https://placehold.co/600x400"
					alt="Placeholder"
					className="h-40 w-full object-cover"
				/>
			</CardContent>
			<CardFooter>
				<Button variant="secondary" size={args.size}>
					Read More
				</Button>
			</CardFooter>
		</Card>
	),
};

export const Responsive: Story = {
	args: {
		size: {
			initial: "small",
			sm: "medium",
			md: "large",
		},
		children: "This is a responsive card with some content",
	},
	render: (args) => (
		<Card {...args}>
			<CardHeader>
				<h3 className="font-semibold text-lg">Card Title</h3>
			</CardHeader>
			<CardContent>
				{args.children}
				<img
					src="https://placehold.co/600x400"
					alt="Placeholder"
					className="h-40 w-full object-cover"
				/>
			</CardContent>
			<CardFooter {...args}>
				<Button variant="secondary" size={args.size}>
					Read More
				</Button>
			</CardFooter>
		</Card>
	),
};

export const CustomStyles: Story = {
	render: () => (
		<Card className="bg-gradient-to-r from-purple-500 to-pink-500 p-6 text-white">
			<CardHeader className="border-white/20 border-b pb-4">
				<h3 className="font-bold text-xl">Custom Styled Card</h3>
			</CardHeader>
			<div className="mt-4">
				<p>
					This card demonstrates custom styling capabilities using className.
				</p>
			</div>
		</Card>
	),
};
