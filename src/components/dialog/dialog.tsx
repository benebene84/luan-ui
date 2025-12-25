import { Dialog as BaseDialog } from "@base-ui/react/dialog";
import { Cross1Icon } from "@radix-ui/react-icons";
import { cn } from "@utilities/cn/cn";
import type { ComponentProps } from "react";

const Dialog = BaseDialog.Root;

const DialogTrigger = BaseDialog.Trigger;

const DialogClose = BaseDialog.Close;

const DialogPortal = BaseDialog.Portal;

export type DialogOverlayProps = ComponentProps<typeof BaseDialog.Backdrop>;

function DialogOverlay({ className, ref, ...props }: DialogOverlayProps) {
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

export type DialogContentProps = ComponentProps<typeof BaseDialog.Popup>;

function DialogContent({
	children,
	className,
	ref,
	...props
}: DialogContentProps) {
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
}

export type DialogHeaderProps = ComponentProps<"div">;

function DialogHeader({ className, ref, ...props }: DialogHeaderProps) {
	return (
		<div
			ref={ref}
			className={cn("flex flex-col gap-1", className)}
			{...props}
		/>
	);
}

export type DialogTitleProps = ComponentProps<typeof BaseDialog.Title>;

function DialogTitle({ className, ref, ...props }: DialogTitleProps) {
	return (
		<BaseDialog.Title
			ref={ref}
			className={cn("font-semibold text-lg", className)}
			{...props}
		/>
	);
}

export type DialogDescriptionProps = ComponentProps<
	typeof BaseDialog.Description
>;

function DialogDescription({
	className,
	ref,
	...props
}: DialogDescriptionProps) {
	return (
		<BaseDialog.Description
			ref={ref}
			className={cn("text-gray-500 text-sm", className)}
			{...props}
		/>
	);
}

export type DialogFooterProps = ComponentProps<"div">;

function DialogFooter({ className, ref, ...props }: DialogFooterProps) {
	return (
		<div
			ref={ref}
			className={cn("flex justify-end gap-2", className)}
			{...props}
		/>
	);
}

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
