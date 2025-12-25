import { Dialog as BaseDialog } from "@base-ui/react/dialog";
import { Cross1Icon } from "@radix-ui/react-icons";
import { cn } from "@utilities/cn/cn";
import { getVariants } from "@utilities/responsive/responsive";
import type { ComponentProps } from "react";
import { createContext, useContext, useMemo } from "react";

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

type DrawerProps = ComponentProps<typeof BaseDialog.Root> & DrawerContextValue;

function Drawer({ children, side, ...props }: DrawerProps) {
	const contextValue = useMemo(
		() => ({
			side,
		}),
		[side],
	);
	return (
		<DrawerContext.Provider value={contextValue}>
			<BaseDialog.Root {...props}>{children}</BaseDialog.Root>
		</DrawerContext.Provider>
	);
}

const DrawerTrigger = BaseDialog.Trigger;

const DrawerClose = BaseDialog.Close;

const DrawerPortal = BaseDialog.Portal;

export type DrawerOverlayProps = ComponentProps<typeof BaseDialog.Backdrop>;

function DrawerOverlay({ className, ref, ...props }: DrawerOverlayProps) {
	return (
		<BaseDialog.Backdrop
			ref={ref}
			className={cn(
				"fixed inset-0 z-50 bg-black/50 transition-opacity duration-150 data-ending-style:opacity-0 data-starting-style:opacity-0",
				className,
			)}
			{...props}
		/>
	);
}

const drawerContentStyles = getVariants({
	base: "fixed z-50 flex flex-col gap-4 bg-white p-4 transition-transform duration-300",
	variants: {
		side: {
			left: "top-0 left-0 h-screen w-fit rounded-r-lg data-ending-style:-translate-x-full data-starting-style:-translate-x-full",
			right:
				"top-0 right-0 h-screen w-fit rounded-l-lg data-ending-style:translate-x-full data-starting-style:translate-x-full",
			top: "top-0 left-0 h-fit w-screen rounded-b-lg data-ending-style:-translate-y-full data-starting-style:-translate-y-full",
			bottom:
				"bottom-0 left-0 h-fit w-screen rounded-t-lg data-ending-style:translate-y-full data-starting-style:translate-y-full",
		},
	},
});

export type DrawerContentProps = Omit<
	ComponentProps<typeof BaseDialog.Popup>,
	"className"
> & {
	className?: string;
};

function DrawerContent({
	children,
	className,
	ref,
	...props
}: DrawerContentProps) {
	const { side = "right" } = useDrawerContext();
	return (
		<DrawerPortal>
			<DrawerOverlay />
			<BaseDialog.Popup
				className={drawerContentStyles({ side, className })}
				{...props}
				ref={ref}
			>
				<DrawerClose className="absolute top-4 right-4">
					<Cross1Icon className="h-4 w-4" />
				</DrawerClose>
				{children}
			</BaseDialog.Popup>
		</DrawerPortal>
	);
}

export type DrawerHeaderProps = ComponentProps<"div">;

function DrawerHeader({ className, ref, ...props }: DrawerHeaderProps) {
	return (
		<div
			ref={ref}
			className={cn("flex flex-col gap-1", className)}
			{...props}
		/>
	);
}

export type DrawerTitleProps = ComponentProps<typeof BaseDialog.Title>;

function DrawerTitle({ className, ref, ...props }: DrawerTitleProps) {
	return (
		<BaseDialog.Title
			ref={ref}
			className={cn("font-semibold text-lg", className)}
			{...props}
		/>
	);
}

export type DrawerDescriptionProps = ComponentProps<
	typeof BaseDialog.Description
>;

function DrawerDescription({
	className,
	ref,
	...props
}: DrawerDescriptionProps) {
	return (
		<BaseDialog.Description
			ref={ref}
			className={cn("text-gray-500 text-sm", className)}
			{...props}
		/>
	);
}

export type DrawerFooterProps = ComponentProps<"div">;

function DrawerFooter({ className, ref, ...props }: DrawerFooterProps) {
	return (
		<div
			ref={ref}
			className={cn("flex justify-end gap-2", className)}
			{...props}
		/>
	);
}

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
