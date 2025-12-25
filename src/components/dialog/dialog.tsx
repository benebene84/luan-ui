import { Dialog as BaseDialog } from "@base-ui/react/dialog";
import { Cross1Icon } from "@radix-ui/react-icons";
import { cn } from "@utilities/cn/cn";
import {
	type ComponentPropsWithoutRef,
	type ComponentRef,
	forwardRef,
} from "react";

const Dialog = BaseDialog.Root;

const DialogTrigger = BaseDialog.Trigger;

const DialogClose = BaseDialog.Close;

const DialogPortal = BaseDialog.Portal;

export type DialogOverlayProps = ComponentPropsWithoutRef<
	typeof BaseDialog.Backdrop
>;

const DialogOverlay = forwardRef<
	ComponentRef<typeof BaseDialog.Backdrop>,
	DialogOverlayProps
>(({ className, ...props }, ref) => (
	<BaseDialog.Backdrop
		ref={ref}
		className={cn(
			"fixed inset-0 z-50 bg-black/50 transition-opacity duration-150 data-ending-style:opacity-0 data-starting-style:opacity-0",
			className,
		)}
		{...props}
	/>
));
DialogOverlay.displayName = "DialogOverlay";

export type DialogContentProps = ComponentPropsWithoutRef<
	typeof BaseDialog.Popup
>;

const DialogContent = forwardRef<
	ComponentRef<typeof BaseDialog.Popup>,
	DialogContentProps
>(({ children, className, ...props }, ref) => {
	return (
		<DialogPortal>
			<DialogOverlay />
			<BaseDialog.Popup
				className={cn(
					"fixed top-1/2 left-1/2 z-50 flex w-fit max-w-xl -translate-x-1/2 -translate-y-1/2 flex-col gap-4 rounded-lg bg-white p-4 transition-all duration-150 data-ending-style:scale-95 data-starting-style:scale-95 data-ending-style:opacity-0 data-starting-style:opacity-0",
					className,
				)}
				{...props}
				ref={ref}
			>
				<DialogClose className="absolute top-4 right-4">
					<Cross1Icon className="h-4 w-4" />
				</DialogClose>
				{children}
			</BaseDialog.Popup>
		</DialogPortal>
	);
});
DialogContent.displayName = "DialogContent";

const DialogHeader = forwardRef<
	HTMLDivElement,
	ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => (
	<div ref={ref} className={cn("flex flex-col gap-1", className)} {...props} />
));

DialogHeader.displayName = "DialogHeader";

export type DialogTitleProps = ComponentPropsWithoutRef<
	typeof BaseDialog.Title
>;

const DialogTitle = forwardRef<
	ComponentRef<typeof BaseDialog.Title>,
	DialogTitleProps
>(({ className, ...props }, ref) => (
	<BaseDialog.Title
		ref={ref}
		className={cn("font-semibold text-lg", className)}
		{...props}
	/>
));

DialogTitle.displayName = "DialogTitle";

export type DialogDescriptionProps = ComponentPropsWithoutRef<
	typeof BaseDialog.Description
>;

const DialogDescription = forwardRef<
	ComponentRef<typeof BaseDialog.Description>,
	DialogDescriptionProps
>(({ className, ...props }, ref) => (
	<BaseDialog.Description
		ref={ref}
		className={cn("text-gray-500 text-sm", className)}
		{...props}
	/>
));

DialogDescription.displayName = "DialogDescription";

const DialogFooter = forwardRef<
	HTMLDivElement,
	ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => (
	<div
		ref={ref}
		className={cn("flex justify-end gap-2", className)}
		{...props}
	/>
));

DialogFooter.displayName = "DialogFooter";

export {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
};
