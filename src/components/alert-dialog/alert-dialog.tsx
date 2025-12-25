import { AlertDialog as BaseAlertDialog } from "@base-ui/react/alert-dialog";
import { cn } from "@utilities/cn/cn";
import {
	type ComponentPropsWithoutRef,
	type ComponentRef,
	forwardRef,
} from "react";

const AlertDialog = BaseAlertDialog.Root;

const AlertDialogTrigger = BaseAlertDialog.Trigger;

const AlertDialogPortal = BaseAlertDialog.Portal;

export type AlertDialogOverlayProps = ComponentPropsWithoutRef<
	typeof BaseAlertDialog.Backdrop
>;

const AlertDialogOverlay = forwardRef<
	ComponentRef<typeof BaseAlertDialog.Backdrop>,
	AlertDialogOverlayProps
>(({ className, ...props }, ref) => (
	<BaseAlertDialog.Backdrop
		ref={ref}
		className={cn(
			"fixed inset-0 z-50 bg-black/50 transition-opacity duration-150 data-ending-style:opacity-0 data-starting-style:opacity-0",
			className,
		)}
		{...props}
	/>
));
AlertDialogOverlay.displayName = "AlertDialogOverlay";

export type AlertDialogContentProps = ComponentPropsWithoutRef<
	typeof BaseAlertDialog.Popup
>;

const AlertDialogContent = forwardRef<
	ComponentRef<typeof BaseAlertDialog.Popup>,
	AlertDialogContentProps
>(({ className, ...props }, ref) => (
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
));
AlertDialogContent.displayName = "AlertDialogContent";

export type AlertDialogTitleProps = ComponentPropsWithoutRef<
	typeof BaseAlertDialog.Title
>;

const AlertDialogTitle = forwardRef<
	ComponentRef<typeof BaseAlertDialog.Title>,
	AlertDialogTitleProps
>(({ className, ...props }, ref) => (
	<BaseAlertDialog.Title
		ref={ref}
		className={cn("font-medium text-lg", className)}
		{...props}
	/>
));
AlertDialogTitle.displayName = "AlertDialogTitle";

export type AlertDialogDescriptionProps = ComponentPropsWithoutRef<
	typeof BaseAlertDialog.Description
>;

const AlertDialogDescription = forwardRef<
	ComponentRef<typeof BaseAlertDialog.Description>,
	AlertDialogDescriptionProps
>(({ className, ...props }, ref) => (
	<BaseAlertDialog.Description
		ref={ref}
		className={cn("text-gray-500 text-sm", className)}
		{...props}
	/>
));
AlertDialogDescription.displayName = "AlertDialogDescription";

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
