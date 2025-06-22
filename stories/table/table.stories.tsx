import type { Meta, StoryObj } from "@storybook/react-vite";
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
} from "../../src/components/table/table";

const meta: Meta<typeof Table> = {
	title: "Components/Table",
	component: Table,
	tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Table>;

export const Default: Story = {
	render: () => (
		<Table>
			<TableCaption>A list of your recent invoices.</TableCaption>
			<TableHeader>
				<TableRow>
					<TableHead>Invoice</TableHead>
					<TableHead>Status</TableHead>
					<TableHead>Method</TableHead>
					<TableHead>Amount</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				<TableRow>
					<TableCell>INV001</TableCell>
					<TableCell>Paid</TableCell>
					<TableCell>Credit Card</TableCell>
					<TableCell>$250.00</TableCell>
				</TableRow>
				<TableRow>
					<TableCell>INV002</TableCell>
					<TableCell>Pending</TableCell>
					<TableCell>PayPal</TableCell>
					<TableCell>$150.00</TableCell>
				</TableRow>
				<TableRow>
					<TableCell>INV003</TableCell>
					<TableCell>Unpaid</TableCell>
					<TableCell>Bank Transfer</TableCell>
					<TableCell>$350.00</TableCell>
				</TableRow>
				<TableRow>
					<TableCell>INV004</TableCell>
					<TableCell>Paid</TableCell>
					<TableCell>Credit Card</TableCell>
					<TableCell>$450.00</TableCell>
				</TableRow>
				<TableRow>
					<TableCell>INV005</TableCell>
					<TableCell>Unpaid</TableCell>
					<TableCell>Bank Transfer</TableCell>
					<TableCell>$550.00</TableCell>
				</TableRow>
				<TableRow>
					<TableCell>INV006</TableCell>
					<TableCell>Paid</TableCell>
					<TableCell>Credit Card</TableCell>
					<TableCell>$650.00</TableCell>
				</TableRow>
			</TableBody>
			<TableFooter>
				<TableRow>
					<TableCell colSpan={3}>Total</TableCell>
					<TableCell>$750.00</TableCell>
				</TableRow>
			</TableFooter>
		</Table>
	),
};

export const WithoutFooter: Story = {
	render: () => (
		<Table>
			<TableCaption>A list of your recent invoices.</TableCaption>
			<TableHeader>
				<TableRow>
					<TableHead>Invoice</TableHead>
					<TableHead>Status</TableHead>
					<TableHead>Method</TableHead>
					<TableHead>Amount</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				<TableRow>
					<TableCell>INV001</TableCell>
					<TableCell>Paid</TableCell>
					<TableCell>Credit Card</TableCell>
					<TableCell>$250.00</TableCell>
				</TableRow>
				<TableRow>
					<TableCell>INV002</TableCell>
					<TableCell>Pending</TableCell>
					<TableCell>PayPal</TableCell>
					<TableCell>$150.00</TableCell>
				</TableRow>
				<TableRow>
					<TableCell>INV003</TableCell>
					<TableCell>Unpaid</TableCell>
					<TableCell>Bank Transfer</TableCell>
					<TableCell>$350.00</TableCell>
				</TableRow>
				<TableRow>
					<TableCell>INV004</TableCell>
					<TableCell>Paid</TableCell>
					<TableCell>Credit Card</TableCell>
					<TableCell>$450.00</TableCell>
				</TableRow>
			</TableBody>
		</Table>
	),
};
