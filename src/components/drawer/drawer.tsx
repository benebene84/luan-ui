import { Drawer as BaseDrawer } from "@base-ui/react/drawer";
import { Cross1Icon } from "@radix-ui/react-icons";
import { cn } from "@utilities/cn/cn";
import type { ComponentProps } from "react";

const SIDE_TO_SWIPE_DIRECTION = {
	left: "left",
	right: "right",
	top: "up",
	bottom: "down",
} as const;

type DrawerSide = keyof typeof SIDE_TO_SWIPE_DIRECTION;

export type DrawerProps = ComponentProps<typeof BaseDrawer.Root> & {
	side?: DrawerSide;
};

function Drawer({ children, side = "right", ...props }: DrawerProps) {
	const swipeDirection = SIDE_TO_SWIPE_DIRECTION[side];
	return (
		<BaseDrawer.Root swipeDirection={swipeDirection} {...props}>
			{children}
		</BaseDrawer.Root>
	);
}

const DrawerTrigger = BaseDrawer.Trigger;

const DrawerClose = BaseDrawer.Close;

export type DrawerOverlayProps = ComponentProps<typeof BaseDrawer.Backdrop>;

function DrawerOverlay({ className, ref, ...props }: DrawerOverlayProps) {
	return (
		<BaseDrawer.Backdrop
			ref={ref}
			className={cn(
				"fixed inset-0 z-50 bg-overlay transition-opacity duration-150 data-ending-style:opacity-0 data-starting-style:opacity-0",
				className,
			)}
			{...props}
		/>
	);
}

export type DrawerContentProps = Omit<
	ComponentProps<typeof BaseDrawer.Popup>,
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
	return (
		<BaseDrawer.Portal>
			<DrawerOverlay />
			<BaseDrawer.Viewport>
				<BaseDrawer.Popup
					className={cn(
						"fixed z-50 flex flex-col gap-4 bg-surface p-4 transition-transform duration-300 data-swiping:duration-0",
						"data-[swipe-direction=right]:data-ending-style:translate-x-full data-[swipe-direction=right]:data-starting-style:translate-x-full data-[swipe-direction=right]:top-0 data-[swipe-direction=right]:right-0 data-[swipe-direction=right]:h-screen data-[swipe-direction=right]:w-fit data-[swipe-direction=right]:translate-x-(--drawer-swipe-movement-x,0px) data-[swipe-direction=right]:rounded-l-lg",
						"data-[swipe-direction=left]:data-ending-style:-translate-x-full data-[swipe-direction=left]:data-starting-style:-translate-x-full data-[swipe-direction=left]:top-0 data-[swipe-direction=left]:left-0 data-[swipe-direction=left]:h-screen data-[swipe-direction=left]:w-fit data-[swipe-direction=left]:translate-x-(--drawer-swipe-movement-x,0px) data-[swipe-direction=left]:rounded-r-lg",
						"data-[swipe-direction=up]:data-ending-style:-translate-y-full data-[swipe-direction=up]:data-starting-style:-translate-y-full data-[swipe-direction=up]:top-0 data-[swipe-direction=up]:right-0 data-[swipe-direction=up]:left-0 data-[swipe-direction=up]:h-fit data-[swipe-direction=up]:w-screen data-[swipe-direction=up]:translate-y-(--drawer-swipe-movement-y,0px) data-[swipe-direction=up]:rounded-b-lg",
						"data-[swipe-direction=down]:data-ending-style:translate-y-full data-[swipe-direction=down]:data-starting-style:translate-y-full data-[swipe-direction=down]:right-0 data-[swipe-direction=down]:bottom-0 data-[swipe-direction=down]:left-0 data-[swipe-direction=down]:h-fit data-[swipe-direction=down]:w-screen data-[swipe-direction=down]:translate-y-(--drawer-swipe-movement-y,0px) data-[swipe-direction=down]:rounded-t-lg",
						className,
					)}
					ref={ref}
					{...props}
				>
					<DrawerClose className="absolute top-4 right-4">
						<Cross1Icon className="h-4 w-4" />
					</DrawerClose>
					{children}
				</BaseDrawer.Popup>
			</BaseDrawer.Viewport>
		</BaseDrawer.Portal>
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

export type DrawerTitleProps = ComponentProps<typeof BaseDrawer.Title>;

function DrawerTitle({ className, ref, ...props }: DrawerTitleProps) {
	return (
		<BaseDrawer.Title
			ref={ref}
			className={cn("font-semibold text-lg", className)}
			{...props}
		/>
	);
}

export type DrawerDescriptionProps = ComponentProps<
	typeof BaseDrawer.Description
>;

function DrawerDescription({
	className,
	ref,
	...props
}: DrawerDescriptionProps) {
	return (
		<BaseDrawer.Description
			ref={ref}
			className={cn("text-sm text-text-muted", className)}
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
