import { AlertDialog as BaseAlertDialog } from "@base-ui/react/alert-dialog";
import { cn } from "@utilities/cn/cn";
import type { ComponentProps } from "react";

const AlertDialog = BaseAlertDialog.Root;

const AlertDialogTrigger = BaseAlertDialog.Trigger;

const AlertDialogPortal = BaseAlertDialog.Portal;

export type AlertDialogOverlayProps = ComponentProps<
	typeof BaseAlertDialog.Backdrop
>;

function AlertDialogOverlay({
	className,
	ref,
	...props
}: AlertDialogOverlayProps) {
	return (
		<BaseAlertDialog.Backdrop
			ref={ref}
			className={cn(
				"fixed inset-0 z-50 bg-black/50 transition-opacity duration-150 data-ending-style:opacity-0 data-starting-style:opacity-0",
				className,
			)}
			{...props}
		/>
	);
}

export type AlertDialogContentProps = ComponentProps<
	typeof BaseAlertDialog.Popup
>;

function AlertDialogContent({
	className,
	ref,
	...props
}: AlertDialogContentProps) {
	return (
		<AlertDialogPortal>
			<AlertDialogOverlay />
			<BaseAlertDialog.Popup
				ref={ref}
				className={cn(
					"fixed top-1/2 left-1/2 z-50 flex w-fit max-w-xl -translate-x-1/2 -translate-y-1/2 flex-col gap-4 rounded-lg bg-white p-4 transition-all duration-150 data-ending-style:scale-95 data-starting-style:scale-95 data-ending-style:opacity-0 data-starting-style:opacity-0",
					className,
				)}
				{...props}
			/>
		</AlertDialogPortal>
	);
}

export type AlertDialogTitleProps = ComponentProps<
	typeof BaseAlertDialog.Title
>;

function AlertDialogTitle({ className, ref, ...props }: AlertDialogTitleProps) {
	return (
		<BaseAlertDialog.Title
			ref={ref}
			className={cn("font-medium text-lg", className)}
			{...props}
		/>
	);
}

export type AlertDialogDescriptionProps = ComponentProps<
	typeof BaseAlertDialog.Description
>;

function AlertDialogDescription({
	className,
	ref,
	...props
}: AlertDialogDescriptionProps) {
	return (
		<BaseAlertDialog.Description
			ref={ref}
			className={cn("text-gray-500 text-sm", className)}
			{...props}
		/>
	);
}

// Base UI doesn't have separate Action/Cancel components - both use Close
// We export Close as both Action and Cancel for API compatibility
const AlertDialogAction = BaseAlertDialog.Close;

const AlertDialogCancel = BaseAlertDialog.Close;

export {
	AlertDialog,
	AlertDialogTrigger,
	AlertDialogContent,
	AlertDialogOverlay,
	AlertDialogTitle,
	AlertDialogDescription,
	AlertDialogAction,
	AlertDialogCancel,
};
