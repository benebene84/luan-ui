import { cn } from "@utilities/cn/cn";
import { AlertDialog as RadixAlertDialog } from "radix-ui";
import {
	type ComponentPropsWithoutRef,
	type ComponentRef,
	forwardRef,
} from "react";

const AlertDialog = RadixAlertDialog.Root;

const AlertDialogTrigger = RadixAlertDialog.Trigger;

const AlertDialogOverlay = forwardRef<
	ComponentRef<typeof RadixAlertDialog.Overlay>,
	ComponentPropsWithoutRef<typeof RadixAlertDialog.Overlay>
>(({ className, ...props }, ref) => (
	<RadixAlertDialog.Overlay
		ref={ref}
		className={cn(
			"fixed inset-0 z-50 bg-black/50 data-[state=closed]:animate-fade-out data-[state=closed]:animate-out data-[state=open]:animate-fade-in data-[state=open]:animate-in",
			className,
		)}
		{...props}
	/>
));
AlertDialogOverlay.displayName = RadixAlertDialog.Overlay.displayName;

const AlertDialogContent = forwardRef<
	ComponentRef<typeof RadixAlertDialog.Content>,
	ComponentPropsWithoutRef<typeof RadixAlertDialog.Content>
>(({ className, ...props }, ref) => (
	<>
		<AlertDialogOverlay />
		<RadixAlertDialog.Content
			ref={ref}
			className={cn(
				"-translate-x-1/2 -translate-y-1/2 fixed top-1/2 left-1/2 z-50 flex w-fit max-w-xl flex-col gap-4 rounded-lg bg-white p-4",
				className,
			)}
			{...props}
		/>
	</>
));
AlertDialogContent.displayName = RadixAlertDialog.Content.displayName;

const AlertDialogTitle = forwardRef<
	ComponentRef<typeof RadixAlertDialog.Title>,
	ComponentPropsWithoutRef<typeof RadixAlertDialog.Title>
>(({ className, ...props }, ref) => (
	<RadixAlertDialog.Title
		ref={ref}
		className={cn("font-medium text-lg", className)}
		{...props}
	/>
));
AlertDialogTitle.displayName = RadixAlertDialog.Title.displayName;

const AlertDialogDescription = forwardRef<
	ComponentRef<typeof RadixAlertDialog.Description>,
	ComponentPropsWithoutRef<typeof RadixAlertDialog.Description>
>(({ className, ...props }, ref) => (
	<RadixAlertDialog.Description
		ref={ref}
		className={cn("text-gray-500 text-sm", className)}
		{...props}
	/>
));
AlertDialogDescription.displayName = RadixAlertDialog.Description.displayName;

const AlertDialogAction = RadixAlertDialog.Action;

const AlertDialogCancel = RadixAlertDialog.Cancel;

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
