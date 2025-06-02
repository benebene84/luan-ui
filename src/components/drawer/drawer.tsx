import { Cross1Icon } from "@radix-ui/react-icons";
import { cn } from "@utilities/cn/cn";
import { getVariants } from "@utilities/get-variants/get-variants";
import { Dialog as RadixDialog } from "radix-ui";
import {
	type ComponentPropsWithoutRef,
	type ComponentRef,
	createContext,
	forwardRef,
	useContext,
	useMemo,
} from "react";

/**
 * Drawer Context
 */

type DrawerContextValue = {
	side?: "left" | "right" | "top" | "bottom";
};

const DrawerContext = createContext<DrawerContextValue | undefined>(undefined);

const useDrawerContext = () => {
	const context = useContext(DrawerContext);
	if (!context) {
		throw new Error("Drawer components must be used within a Drawer");
	}
	return context;
};

const Drawer = ({
	children,
	side,
	...props
}: RadixDialog.DialogProps & DrawerContextValue) => {
	const contextValue = useMemo(
		() => ({
			side,
		}),
		[side],
	);
	return (
		<DrawerContext.Provider value={contextValue}>
			<RadixDialog.Root {...props}>{children}</RadixDialog.Root>
		</DrawerContext.Provider>
	);
};

const DrawerTrigger = RadixDialog.Trigger;

const DrawerClose = RadixDialog.Close;

const DrawerOverlay = forwardRef<
	ComponentRef<typeof RadixDialog.Overlay>,
	ComponentPropsWithoutRef<typeof RadixDialog.Overlay>
>(({ className, ...props }, ref) => (
	<RadixDialog.Overlay
		ref={ref}
		className={cn(
			"fixed inset-0 z-50 bg-black/50 data-[state=closed]:animate-fade-out data-[state=closed]:animate-out data-[state=open]:animate-fade-in data-[state=open]:animate-in",
			className,
		)}
		{...props}
	/>
));
DrawerOverlay.displayName = RadixDialog.Overlay.displayName;

const drawerContentStyles = getVariants({
	base: "fixed z-50 flex flex-col gap-4 bg-white p-4",
	variants: {
		side: {
			left: "left-0 h-screen w-fit rounded-r-lg data-[state=closed]:animate-slide-out-left data-[state=open]:animate-slide-in-left",
			right:
				"right-0 h-screen w-fit rounded-l-lg data-[state=closed]:animate-slide-out-right data-[state=open]:animate-slide-in-right",
			top: "top-0 h-fit w-screen rounded-b-lg data-[state=closed]:animate-slide-out-top data-[state=open]:animate-slide-in-top",
			bottom:
				"bottom-0 h-fit w-screen rounded-t-lg data-[state=closed]:animate-slide-out-bottom data-[state=open]:animate-slide-in-bottom",
		},
	},
});

const DrawerContent = forwardRef<
	ComponentRef<typeof RadixDialog.Content>,
	ComponentPropsWithoutRef<typeof RadixDialog.Content>
>(({ children, className, ...props }, ref) => {
	const { side = "right" } = useDrawerContext();
	return (
		<DrawerOverlay>
			<DrawerOverlay />
			<RadixDialog.Content
				className={drawerContentStyles({ side })}
				{...props}
				ref={ref}
			>
				<DrawerClose asChild>
					<button type="button" className="absolute top-4 right-4">
						<Cross1Icon className="h-4 w-4" />
					</button>
				</DrawerClose>
				{children}
			</RadixDialog.Content>
		</DrawerOverlay>
	);
});

const DrawerHeader = forwardRef<
	HTMLDivElement,
	ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => (
	<div ref={ref} className={cn("flex flex-col gap-1", className)} {...props} />
));

DrawerHeader.displayName = "DrawerHeader";

const DrawerTitle = forwardRef<
	ComponentRef<typeof RadixDialog.Title>,
	ComponentPropsWithoutRef<typeof RadixDialog.Title>
>(({ className, ...props }, ref) => (
	<RadixDialog.Title
		ref={ref}
		className={cn("font-semibold text-lg", className)}
		{...props}
	/>
));

DrawerTitle.displayName = "DrawerTitle";

const DrawerDescription = forwardRef<
	ComponentRef<typeof RadixDialog.Description>,
	ComponentPropsWithoutRef<typeof RadixDialog.Description>
>(({ className, ...props }, ref) => (
	<RadixDialog.Description
		ref={ref}
		className={cn("text-gray-500 text-sm", className)}
		{...props}
	/>
));

DrawerDescription.displayName = "DrawerDescription";

const DrawerFooter = forwardRef<
	HTMLDivElement,
	ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => (
	<div
		ref={ref}
		className={cn("flex justify-end gap-2", className)}
		{...props}
	/>
));

DrawerFooter.displayName = "DrawerFooter";

export {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
};
