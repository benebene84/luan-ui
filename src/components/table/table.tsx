import { cn } from "@utilities/cn/cn";
import type { ComponentPropsWithoutRef, ComponentRef } from "react";
import { forwardRef } from "react";

/**
 * Table
 */

const Table = forwardRef<
	ComponentRef<"table">,
	ComponentPropsWithoutRef<"table">
>(({ className, ...props }, ref) => (
	<div className="relative w-full overflow-auto">
		<table
			ref={ref}
			className={cn("w-full caption-bottom text-sm", className)}
			{...props}
		/>
	</div>
));
Table.displayName = "Table";

/**
 * TableHeader
 */

const TableHeader = forwardRef<
	ComponentRef<"thead">,
	ComponentPropsWithoutRef<"thead">
>(({ className, ...props }, ref) => (
	<thead
		ref={ref}
		className={cn(
			"[&_tr]:border-b [&_tr]:bg-gray-700! [&_tr]:text-white [&_tr]:hover:bg-gray-700! [&_tr]:hover:text-white!",
			className,
		)}
		{...props}
	/>
));
TableHeader.displayName = "TableHeader";

/**
 * TableBody
 */

const TableBody = forwardRef<
	ComponentRef<"tbody">,
	ComponentPropsWithoutRef<"tbody">
>(({ className, ...props }, ref) => (
	<tbody
		ref={ref}
		className={cn("[&_tr:last-child]:border-0", className)}
		{...props}
	/>
));
TableBody.displayName = "TableBody";

/**
 * TableFooter
 */

const TableFooter = forwardRef<
	ComponentRef<"tfoot">,
	ComponentPropsWithoutRef<"tfoot">
>(({ className, ...props }, ref) => (
	<tfoot
		ref={ref}
		className={cn(
			"border-t bg-gray-100 font-medium [&>tr]:bg-gray-100! [&>tr]:text-gray-700! [&>tr]:last:border-b-0",
			className,
		)}
		{...props}
	/>
));
TableFooter.displayName = "TableFooter";

/**
 * TableRow
 */

const TableRow = forwardRef<ComponentRef<"tr">, ComponentPropsWithoutRef<"tr">>(
	({ className, ...props }, ref) => (
		<tr
			ref={ref}
			className={cn(
				"border-b transition-colors hover:bg-gray-400 hover:text-white data-[state=selected]:bg-gray-500 data-[state=selected]:text-white",
				className,
			)}
			{...props}
		/>
	),
);
TableRow.displayName = "TableRow";

/**
 * TableHead
 */

const TableHead = forwardRef<
	ComponentRef<"th">,
	ComponentPropsWithoutRef<"th">
>(({ className, ...props }, ref) => (
	<th
		ref={ref}
		className={cn(
			"h-10 px-2 text-left align-middle font-medium [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
			className,
		)}
		{...props}
	/>
));
TableHead.displayName = "TableHead";

/**
 * TableCell
 */

const TableCell = forwardRef<
	ComponentRef<"td">,
	ComponentPropsWithoutRef<"td">
>(({ className, ...props }, ref) => (
	<td
		ref={ref}
		className={cn(
			"p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
			className,
		)}
		{...props}
	/>
));
TableCell.displayName = "TableCell";

/**
 * TableCaption
 */

const TableCaption = forwardRef<
	ComponentRef<"caption">,
	ComponentPropsWithoutRef<"caption">
>(({ className, ...props }, ref) => (
	<caption
		ref={ref}
		className={cn("mt-4 text-start text-gray-500 text-sm", className)}
		{...props}
	/>
));
TableCaption.displayName = "TableCaption";

export {
	Table,
	TableHeader,
	TableBody,
	TableFooter,
	TableHead,
	TableRow,
	TableCell,
	TableCaption,
};
