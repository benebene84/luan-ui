import type { Meta, StoryObj } from "@storybook/react";
import type { Accordion as RadixAccordion } from "radix-ui";

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "../../src/components/accordion/accordion";
import { accordionContents } from "./accordion.data";

const meta = {
	title: "Components/Accordion",
	component: Accordion,
	tags: ["autodocs"],
	argTypes: {
		type: {
			control: "radio",
			options: ["single", "multiple"],
		},
		collapsible: {
			control: "boolean",
		},
	},
} satisfies Meta<typeof Accordion>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		type: "single",
		collapsible: true,
	},
	render: (args) => (
		<Accordion {...args} className="w-full">
			<AccordionItem value={accordionContents.single[0].value}>
				<AccordionTrigger>
					{accordionContents.single[0].trigger}
				</AccordionTrigger>
				<AccordionContent>
					{accordionContents.single[0].content}
				</AccordionContent>
			</AccordionItem>
			<AccordionItem value={accordionContents.single[1].value}>
				<AccordionTrigger>
					{accordionContents.single[1].trigger}
				</AccordionTrigger>
				<AccordionContent>
					{accordionContents.single[1].content}
				</AccordionContent>
			</AccordionItem>
			<AccordionItem value={accordionContents.single[2].value}>
				<AccordionTrigger>
					{accordionContents.single[2].trigger}
				</AccordionTrigger>
				<AccordionContent>
					{accordionContents.single[2].content}
				</AccordionContent>
			</AccordionItem>
		</Accordion>
	),
};

export const Multiple: Story = {
	args: {
		type: "multiple",
	},
	render: (args) => (
		<Accordion {...args} className="w-full">
			<AccordionItem value={accordionContents.multiple[0].value}>
				<AccordionTrigger>
					{accordionContents.multiple[0].trigger}
				</AccordionTrigger>
				<AccordionContent>
					{accordionContents.multiple[0].content}
				</AccordionContent>
			</AccordionItem>
			<AccordionItem value={accordionContents.multiple[1].value}>
				<AccordionTrigger>
					{accordionContents.multiple[1].trigger}
				</AccordionTrigger>
				<AccordionContent>
					{accordionContents.multiple[1].content}
				</AccordionContent>
			</AccordionItem>
		</Accordion>
	),
};
