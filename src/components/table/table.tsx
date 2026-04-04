import { cn } from "@utilities/cn/cn";
import type { ComponentProps } from "react";

/**
 * Table
 */

export type TableProps = ComponentProps<"table">;

function Table({ className, ref, ...props }: TableProps) {
	return (
		<div className="relative w-full overflow-auto">
			<table
				ref={ref}
				className={cn("w-full caption-bottom text-sm", className)}
				{...props}
			/>
		</div>
	);
}

/**
 * TableHeader
 */

export type TableHeaderProps = ComponentProps<"thead">;

function TableHeader({ className, ref, ...props }: TableHeaderProps) {
	return (
		<thead
			ref={ref}
			className={cn(
				"[&_tr]:border-b [&_tr]:bg-primary! [&_tr]:text-on-primary [&_tr]:hover:bg-primary! [&_tr]:hover:text-on-primary!",
				className,
			)}
			{...props}
		/>
	);
}

/**
 * TableBody
 */

export type TableBodyProps = ComponentProps<"tbody">;

function TableBody({ className, ref, ...props }: TableBodyProps) {
	return (
		<tbody
			ref={ref}
			className={cn("[&_tr:last-child]:border-0", className)}
			{...props}
		/>
	);
}

/**
 * TableFooter
 */

export type TableFooterProps = ComponentProps<"tfoot">;

function TableFooter({ className, ref, ...props }: TableFooterProps) {
	return (
		<tfoot
			ref={ref}
			className={cn(
				"border-border border-t bg-surface-muted font-medium [&>tr]:bg-surface-muted! [&>tr]:text-text-secondary! [&>tr]:last:border-b-0",
				className,
			)}
			{...props}
		/>
	);
}

/**
 * TableRow
 */

export type TableRowProps = ComponentProps<"tr">;

function TableRow({ className, ref, ...props }: TableRowProps) {
	return (
		<tr
			ref={ref}
			className={cn(
				"border-border border-b transition-colors data-[state=selected]:bg-indicator data-[state=selected]:text-on-primary",
				className,
			)}
			{...props}
		/>
	);
}

/**
 * TableHead
 */

export type TableHeadProps = ComponentProps<"th">;

function TableHead({ className, ref, ...props }: TableHeadProps) {
	return (
		<th
			ref={ref}
			className={cn(
				"h-10 px-2 text-left align-middle font-medium [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
				className,
			)}
			{...props}
		/>
	);
}

/**
 * TableCell
 */

export type TableCellProps = ComponentProps<"td">;

function TableCell({ className, ref, ...props }: TableCellProps) {
	return (
		<td
			ref={ref}
			className={cn(
				"p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
				className,
			)}
			{...props}
		/>
	);
}

/**
 * TableCaption
 */

export type TableCaptionProps = ComponentProps<"caption">;

function TableCaption({ className, ref, ...props }: TableCaptionProps) {
	return (
		<caption
			ref={ref}
			className={cn("mt-4 text-start text-sm text-text-muted", className)}
			{...props}
		/>
	);
}

export {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
};
