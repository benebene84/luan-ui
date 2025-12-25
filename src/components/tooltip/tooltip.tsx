import { Tooltip as TooltipPrimitive } from "@base-ui/react/tooltip";
import { cn } from "@utilities/cn/cn";
import { createContext, forwardRef, useContext, useMemo } from "react";

/**
 * Tooltip Context
 */

type TooltipContextType = {
	showArrow?: boolean;
	side?: "top" | "right" | "bottom" | "left";
	sideOffset?: number;
};

const TooltipContext = createContext<TooltipContextType | undefined>(undefined);

const useTooltipContext = () => {
	const context = useContext(TooltipContext);
	if (!context) {
		throw new Error("Tooltip components must be used within a TooltipProvider");
	}
	return context;
};

/**
 * Tooltip
 */

export type TooltipProps = React.ComponentProps<
	typeof TooltipPrimitive.Root
> & {
	showArrow?: boolean;
	side?: "top" | "right" | "bottom" | "left";
	sideOffset?: number;
	delayDuration?: number;
};

/**
 * A tooltip component built on top of Base UI's tooltip primitive.
 *
 * @param {TooltipProps} props - The props for the Tooltip component
 * @param {boolean} [props.showArrow=true] - Whether to show the arrow pointing to the trigger
 * @param {"top" | "right" | "bottom" | "left"} [props.side] - The preferred side to show the tooltip
 * @param {number} [props.sideOffset=10] - Distance between the anchor and the popup
 * @param {number} [props.delayDuration=600] - How long to wait before opening the tooltip (in ms)
 *
 * @example
 * ```tsx
 * <Tooltip>
 *   <TooltipTrigger>Hover me</TooltipTrigger>
 *   <TooltipContent>Tooltip content</TooltipContent>
 * </Tooltip>
 * ```
 */
const Tooltip = ({
	children,
	showArrow = true,
	side,
	sideOffset = 10,
	delayDuration = 600,
	...props
}: TooltipProps) => {
	const contextValue = useMemo(
		() => ({
			showArrow,
			side,
			sideOffset,
		}),
		[showArrow, side, sideOffset],
	);
	return (
		<TooltipContext.Provider value={contextValue}>
			<TooltipPrimitive.Provider delay={delayDuration}>
				<TooltipPrimitive.Root {...props}>{children}</TooltipPrimitive.Root>
			</TooltipPrimitive.Provider>
		</TooltipContext.Provider>
	);
};

/**
 * Tooltip Trigger
 */

type TooltipTriggerProps = React.ComponentProps<
	typeof TooltipPrimitive.Trigger
> & {
	render?: React.ReactElement;
};

const TooltipTrigger = forwardRef<HTMLButtonElement, TooltipTriggerProps>(
	({ render, children, ...props }, ref) => {
		if (render) {
			return (
				<TooltipPrimitive.Trigger ref={ref} render={render} {...props}>
					{children}
				</TooltipPrimitive.Trigger>
			);
		}
		return (
			<TooltipPrimitive.Trigger ref={ref} {...props}>
				{children}
			</TooltipPrimitive.Trigger>
		);
	},
);
TooltipTrigger.displayName = "TooltipTrigger";

/**
 * Tooltip Content
 */

const TooltipContent = forwardRef<
	HTMLDivElement,
	React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Popup> & {
		showArrow?: boolean;
	}
>(({ className, children, ...props }, ref) => {
	const { showArrow, side, sideOffset } = useTooltipContext();
	return (
		<TooltipPrimitive.Portal>
			<TooltipPrimitive.Positioner side={side} sideOffset={sideOffset ?? 10}>
				<TooltipPrimitive.Popup
					className={cn(
						"relative z-50 w-fit max-w-72 rounded-md bg-gray-700 p-2 text-sm text-white shadow-md",
						className,
					)}
					{...props}
					ref={ref}
				>
					{children}
					{showArrow && (
						<TooltipPrimitive.Arrow className="data-[side=bottom]:-top-1.25 data-[side=left]:-right-1.25 data-[side=top]:-bottom-1.25 data-[side=right]:-left-1.25">
							<div className="h-2.5 w-2.5 rotate-45 bg-gray-700" />
						</TooltipPrimitive.Arrow>
					)}
				</TooltipPrimitive.Popup>
			</TooltipPrimitive.Positioner>
		</TooltipPrimitive.Portal>
	);
});

TooltipContent.displayName = "TooltipContent";

export { Tooltip, TooltipTrigger, TooltipContent };
