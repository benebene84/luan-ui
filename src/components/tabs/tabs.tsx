import { Tabs as TabsPrimitive } from "@base-ui/react/tabs";
import { cn } from "@utilities/cn/cn";
import type { ComponentProps } from "react";

const Tabs = TabsPrimitive.Root;

export type TabsListProps = ComponentProps<typeof TabsPrimitive.List>;

function TabsList({ className, ref, ...props }: TabsListProps) {
	return (
		<TabsPrimitive.List
			ref={ref}
			className={cn(
				"inline-flex h-10 items-center justify-center gap-2 bg-surface-muted px-1 text-text-secondary",
				className,
			)}
			{...props}
		/>
	);
}

export type TabsTriggerProps = ComponentProps<typeof TabsPrimitive.Tab>;

function TabsTrigger({ className, ref, ...props }: TabsTriggerProps) {
	return (
		<TabsPrimitive.Tab
			ref={ref}
			className={cn(
				"inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 font-medium text-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-active:bg-surface data-active:shadow-sm",
				className,
			)}
			{...props}
		/>
	);
}

export type TabsContentProps = ComponentProps<typeof TabsPrimitive.Panel>;

function TabsContent({ className, ref, ...props }: TabsContentProps) {
	return (
		<TabsPrimitive.Panel
			ref={ref}
			className={cn(
				"mt-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2",
				className,
			)}
			{...props}
		/>
	);
}

export { Tabs, TabsContent, TabsList, TabsTrigger };
