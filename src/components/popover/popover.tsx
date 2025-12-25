import { Popover as PopoverPrimitive } from "@base-ui/react/popover";
import { Icon } from "@components/icon/icon";
import { Cross1Icon } from "@radix-ui/react-icons";
import { cn } from "@utilities/cn/cn";
import type { ComponentProps } from "react";
import { createContext, useContext, useMemo } from "react";

/**
 * Popover Context
 */

type PopoverContextValue = {
	showArrow?: boolean;
	closeButtonAriaLabel?: string;
	showCloseButton?: boolean;
	side?: "top" | "right" | "bottom" | "left";
	sideOffset?: number;
};

const PopoverContext = createContext<PopoverContextValue | undefined>(
	undefined,
);

const usePopoverContext = () => {
	const context = useContext(PopoverContext);
	if (!context) {
		throw new Error("Popover components must be used within a Popover");
	}
	return context;
};

/**
 * Popover
 */

export type PopoverProps = {
	showArrow?: boolean;
	closeButtonAriaLabel?: string;
	showCloseButton?: boolean;
	side?: "top" | "right" | "bottom" | "left";
	sideOffset?: number;
	children?: React.ReactNode;
} & ComponentProps<typeof PopoverPrimitive.Root>;

/**
 * Popover component that provides a popover container with a trigger and content.
 *
 * @param {boolean} [props.showArrow=true] - Whether to show the arrow pointing to the trigger
 * @param {string} [props.closeButtonAriaLabel="Close"] - Aria label for the close button
 * @param {boolean} [props.showCloseButton=true] - Whether to show the close button
 * @param {"top" | "right" | "bottom" | "left"} [props.side] - The preferred side to show the popover
 * @param {number} [props.sideOffset=4] - The offset from the trigger
 *
 * @example
 * ```tsx
 * <Popover>
 *   <PopoverTrigger>Open Popover</PopoverTrigger>
 *   <PopoverContent>
 *     <p>Popover content goes here</p>
 *   </PopoverContent>
 * </Popover>
 * ```
 */
function Popover({
	children,
	showArrow = true,
	closeButtonAriaLabel = "Close",
	showCloseButton = true,
	side,
	sideOffset = 10,
	...props
}: PopoverProps) {
	const contextValue = useMemo(
		() => ({
			showArrow,
			closeButtonAriaLabel,
			side,
			showCloseButton,
			sideOffset,
		}),
		[showArrow, closeButtonAriaLabel, side, showCloseButton, sideOffset],
	);
	return (
		<PopoverContext.Provider value={contextValue}>
			<PopoverPrimitive.Root {...props}>{children}</PopoverPrimitive.Root>
		</PopoverContext.Provider>
	);
}

export type PopoverTriggerProps = ComponentProps<
	typeof PopoverPrimitive.Trigger
>;

function PopoverTrigger({ className, ref, ...props }: PopoverTriggerProps) {
	return (
		<PopoverPrimitive.Trigger ref={ref} className={className} {...props} />
	);
}

export type PopoverContentProps = ComponentProps<
	typeof PopoverPrimitive.Popup
> & {
	showArrow?: boolean;
	closeButtonAriaLabel?: string;
	sideOffset?: number;
};

/**
 * Popover Content
 */

/**
 * Popover Content component that provides the content area for the Popover.
 * Inherits size from parent Popover component.
 *
 * @example
 * ```tsx
 * <PopoverContent>
 *   <p>Popover content goes here</p>
 * </PopoverContent>
 * ```
 */
function PopoverContent({
	children,
	className,
	sideOffset: sideOffsetProp,
	ref,
	...props
}: PopoverContentProps) {
	const {
		showArrow,
		closeButtonAriaLabel,
		side,
		showCloseButton,
		sideOffset: sideOffsetContext,
	} = usePopoverContext();
	const sideOffset = sideOffsetProp ?? sideOffsetContext ?? 10;

	return (
		<PopoverPrimitive.Portal>
			<PopoverPrimitive.Positioner side={side} sideOffset={sideOffset}>
				<PopoverPrimitive.Popup
					className={cn(
						"relative z-50 w-fit max-w-72 rounded-md bg-gray-700 p-4 text-sm text-white shadow-md",
						className,
					)}
					{...props}
					ref={ref}
				>
					{showCloseButton && (
						<PopoverClose
							className="absolute top-4 right-4"
							aria-label={closeButtonAriaLabel}
						>
							<Icon render={<Cross1Icon />} size="small" />
						</PopoverClose>
					)}
					{children}
					{showArrow && (
						<PopoverPrimitive.Arrow className="data-[side=bottom]:-top-1.25 data-[side=left]:-right-1.25 data-[side=top]:-bottom-1.25 data-[side=right]:-left-1.25">
							<div className="h-2.5 w-2.5 rotate-45 bg-gray-700" />
						</PopoverPrimitive.Arrow>
					)}
				</PopoverPrimitive.Popup>
			</PopoverPrimitive.Positioner>
		</PopoverPrimitive.Portal>
	);
}

/**
 * Popover Close
 */

export type PopoverCloseProps = ComponentProps<typeof PopoverPrimitive.Close>;

function PopoverClose({ className, ref, ...props }: PopoverCloseProps) {
	return <PopoverPrimitive.Close ref={ref} className={className} {...props} />;
}

/**
 * Popover Portal
 */

const PopoverPortal = PopoverPrimitive.Portal;

/**
 * Popover Anchor
 */

export type PopoverAnchorProps = ComponentProps<
	typeof PopoverPrimitive.Positioner
> & {
	children?: React.ReactNode;
};

function PopoverAnchor({ children, ref, ...props }: PopoverAnchorProps) {
	return (
		<PopoverPrimitive.Positioner ref={ref} {...props}>
			{children}
		</PopoverPrimitive.Positioner>
	);
}

/**
 * Popover Title
 */

const PopoverTitle = PopoverPrimitive.Title;

/**
 * Popover Description
 */

const PopoverDescription = PopoverPrimitive.Description;

export {
	Popover,
	PopoverTrigger,
	PopoverContent,
	PopoverClose,
	PopoverPortal,
	PopoverAnchor,
	PopoverTitle,
	PopoverDescription,
};
