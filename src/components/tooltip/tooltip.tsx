import { Tooltip as BaseTooltip } from "@base-ui-components/react";
import { cn } from "@utilities/cn/cn";
import { createContext, forwardRef, useContext, useMemo } from "react";

/**
 * Tooltip Context
 */

type TooltipContextType = {
	showArrow?: boolean;
	side?: "top" | "right" | "bottom" | "left";
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
 * Tooltip Provider
 *
 * Provides common configuration for all tooltips within its scope.
 * Should be placed at the app root level.
 *
 * @example
 * ```tsx
 * <TooltipProvider delayDuration={500}>
 *   <App />
 * </TooltipProvider>
 * ```
 */
const TooltipProvider = BaseTooltip.Provider;

/**
 * Tooltip
 */

export type TooltipProps = React.ComponentProps<typeof BaseTooltip.Root> & {
	showArrow?: boolean;
	side?: "top" | "right" | "bottom" | "left";
};

/**
 * A tooltip component built on top of Base UI's tooltip primitive.
 *
 * @param {TooltipProps} props - The props for the Tooltip component
 * @param {boolean} [props.showArrow=true] - Whether to show the arrow pointing to the trigger
 * @param {"top" | "right" | "bottom" | "left"} [props.side] - The preferred side to show the tooltip
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
	side = "top",
	...props
}: TooltipProps) => {
	const contextValue = useMemo(
		() => ({
			showArrow,
			side,
		}),
		[showArrow, side],
	);
	return (
		<TooltipContext.Provider value={contextValue}>
			<BaseTooltip.Root {...props}>{children}</BaseTooltip.Root>
		</TooltipContext.Provider>
	);
};

/**
 * Tooltip Trigger
 */

const TooltipTrigger = BaseTooltip.Trigger;

/**
 * Tooltip Content
 */

const TooltipContent = forwardRef<
	HTMLDivElement,
	React.ComponentPropsWithoutRef<typeof BaseTooltip.Popup> & {
		showArrow?: boolean;
		sideOffset?: number;
	}
>(({ className, sideOffset = 4, children, ...props }, ref) => {
	const { showArrow, side } = useTooltipContext();
	return (
		<BaseTooltip.Portal>
			<BaseTooltip.Positioner side={side} sideOffset={sideOffset}>
				<BaseTooltip.Popup
					className={cn(
						"relative z-50 w-fit max-w-72 rounded-md bg-gray-700 p-2 text-sm text-white shadow-md",
						className,
					)}
					role="tooltip"
					{...props}
					ref={ref}
				>
					{children}
					{showArrow && <BaseTooltip.Arrow className="fill-gray-700" />}
				</BaseTooltip.Popup>
			</BaseTooltip.Positioner>
		</BaseTooltip.Portal>
	);
});

TooltipContent.displayName = BaseTooltip.Popup.displayName;

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };
