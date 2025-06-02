import { Cross1Icon } from "@radix-ui/react-icons";
import { cn } from "@utilities/cn/cn";
import { Dialog as RadixDialog } from "radix-ui";
import {
	type ComponentPropsWithoutRef,
	type ComponentRef,
	forwardRef,
} from "react";

const Dialog = RadixDialog.Root;

const DialogTrigger = RadixDialog.Trigger;

const DialogClose = RadixDialog.Close;

const DialogOverlay = forwardRef<
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
DialogOverlay.displayName = RadixDialog.Overlay.displayName;

const DialogContent = forwardRef<
	ComponentRef<typeof RadixDialog.Content>,
	ComponentPropsWithoutRef<typeof RadixDialog.Content>
>(({ children, className, ...props }, ref) => {
	return (
		<DialogOverlay>
			<DialogOverlay />
			<RadixDialog.Content
				className={cn(
					"-translate-x-1/2 -translate-y-1/2 fixed top-1/2 left-1/2 z-50 flex w-fit max-w-xl flex-col gap-4 rounded-lg bg-white p-4",
					className,
				)}
				{...props}
				ref={ref}
			>
				<DialogClose asChild>
					<button type="button" className="absolute top-4 right-4">
						<Cross1Icon className="h-4 w-4" />
					</button>
				</DialogClose>
				{children}
			</RadixDialog.Content>
		</DialogOverlay>
	);
});

const DialogHeader = forwardRef<
	HTMLDivElement,
	ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => (
	<div ref={ref} className={cn("flex flex-col gap-1", className)} {...props} />
));

DialogHeader.displayName = "DialogHeader";

const DialogTitle = forwardRef<
	ComponentRef<typeof RadixDialog.Title>,
	ComponentPropsWithoutRef<typeof RadixDialog.Title>
>(({ className, ...props }, ref) => (
	<RadixDialog.Title
		ref={ref}
		className={cn("font-semibold text-lg", className)}
		{...props}
	/>
));

DialogTitle.displayName = "DialogTitle";

const DialogDescription = forwardRef<
	ComponentRef<typeof RadixDialog.Description>,
	ComponentPropsWithoutRef<typeof RadixDialog.Description>
>(({ className, ...props }, ref) => (
	<RadixDialog.Description
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
