import { Tabs as BaseTabs } from "@base-ui-components/react";
import { cn } from "@utilities/cn/cn";
import {
	type ComponentPropsWithoutRef,
	type ComponentRef,
	forwardRef,
} from "react";

const Tabs = BaseTabs.Root;

const TabsList = forwardRef<
	ComponentRef<typeof BaseTabs.List>,
	ComponentPropsWithoutRef<typeof BaseTabs.List>
>(({ className, ...props }, ref) => (
	<BaseTabs.List
		ref={ref}
		className={cn(
			"inline-flex h-10 items-center justify-center gap-2 bg-gray-100 px-1 text-gray-700",
			className,
		)}
		{...props}
	/>
));
TabsList.displayName = BaseTabs.List.displayName;

const TabsTrigger = forwardRef<
	ComponentRef<typeof BaseTabs.Tab>,
	ComponentPropsWithoutRef<typeof BaseTabs.Tab>
>(({ className, ...props }, ref) => (
	<BaseTabs.Tab
		ref={ref}
		className={cn(
			"inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 font-medium text-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-700 focus-visible:ring-offset-2 data-[disabled]:pointer-events-none data-[selected]:bg-white data-[disabled]:opacity-50 data-[selected]:shadow-sm",
			className,
		)}
		{...props}
	/>
));
TabsTrigger.displayName = BaseTabs.Tab.displayName;

const TabsContent = forwardRef<
	ComponentRef<typeof BaseTabs.Panel>,
	ComponentPropsWithoutRef<typeof BaseTabs.Panel>
>(({ className, ...props }, ref) => (
	<BaseTabs.Panel
		ref={ref}
		className={cn(
			"mt-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-700 focus-visible:ring-offset-2",
			className,
		)}
		{...props}
	/>
));
TabsContent.displayName = BaseTabs.Panel.displayName;

export { Tabs, TabsList, TabsTrigger, TabsContent };
