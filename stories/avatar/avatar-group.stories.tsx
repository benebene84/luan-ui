import type { Meta, StoryObj } from "@storybook/react-webpack5";

import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from "../../src/components/avatar/avatar";
import { AvatarGroup } from "../../src/components/avatar/avatar-group";

const meta = {
	title: "Components/AvatarGroup",
	component: AvatarGroup,
	tags: ["autodocs"],
	argTypes: {
		className: {
			control: "text",
		},
		maxAvatars: {
			control: "number",
		},
	},
} satisfies Meta<typeof AvatarGroup>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: { children: null, maxAvatars: 3 },
	render: ({ maxAvatars }) => (
		<AvatarGroup maxAvatars={maxAvatars}>
			<Avatar>
				<AvatarImage
					src="https://github.com/benebene84.png"
					alt="@benebene84"
				/>
				<AvatarFallback>BS</AvatarFallback>
			</Avatar>
			<Avatar>
				<AvatarImage
					src="https://avatars.githubusercontent.com/u/1234567?v=4"
					alt="@user2"
				/>
				<AvatarFallback>U2</AvatarFallback>
			</Avatar>
			<Avatar>
				<AvatarImage
					src="https://avatars.githubusercontent.com/u/7654321?v=4"
					alt="@user3"
				/>
				<AvatarFallback>U3</AvatarFallback>
			</Avatar>
			<Avatar>
				<AvatarImage
					src="https://github.com/benebene84.png"
					alt="@benebene84"
				/>
				<AvatarFallback>BS</AvatarFallback>
			</Avatar>
			<Avatar>
				<AvatarImage
					src="https://avatars.githubusercontent.com/u/1234567?v=4"
					alt="@user4"
				/>
				<AvatarFallback>U4</AvatarFallback>
			</Avatar>
			<Avatar>
				<AvatarImage
					src="https://avatars.githubusercontent.com/u/7654321?v=4"
					alt="@user5"
				/>
				<AvatarFallback>U5</AvatarFallback>
			</Avatar>
		</AvatarGroup>
	),
};

export const WithFallbacks: Story = {
	args: { children: null },
	render: () => (
		<AvatarGroup>
			<Avatar>
				<AvatarFallback>BS</AvatarFallback>
			</Avatar>
			<Avatar>
				<AvatarFallback>U2</AvatarFallback>
			</Avatar>
			<Avatar>
				<AvatarFallback>U3</AvatarFallback>
			</Avatar>
		</AvatarGroup>
	),
};
