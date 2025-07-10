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
>(({ className, sideOffset = 8, children, ...props }, ref) => {
	const { showArrow, side } = useTooltipContext();
	return (
		<BaseTooltip.Portal>
			<BaseTooltip.Positioner
				side={side}
				sideOffset={sideOffset}
				arrowPadding={6}
			>
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
					{showArrow && (
						<BaseTooltip.Arrow className="data-[side=top]:-bottom-1.5 data-[side=bottom]:-top-1.5 data-[side=left]:-right-2.5 data-[side=right]:-left-2.5 fill-gray-700 data-[side=bottom]:rotate-0 data-[side=left]:rotate-90 data-[side=right]:rotate-270 data-[side=top]:rotate-180">
							<ArrowSvg />
						</BaseTooltip.Arrow>
					)}
				</BaseTooltip.Popup>
			</BaseTooltip.Positioner>
		</BaseTooltip.Portal>
	);
});

TooltipContent.displayName = BaseTooltip.Popup.displayName;

const ArrowSvg = (props: React.ComponentProps<"svg">) => {
	return (
		<svg
			aria-hidden="true"
			width="20"
			height="10"
			viewBox="0 0 20 10"
			{...props}
		>
			<path d="M9.66437 2.60207L4.80758 6.97318C4.07308 7.63423 3.11989 8 2.13172 8H0V10H20V8H18.5349C17.5468 8 16.5936 7.63423 15.8591 6.97318L11.0023 2.60207C10.622 2.2598 10.0447 2.25979 9.66437 2.60207Z" />
			<path d="M8.99542 1.85876C9.75604 1.17425 10.9106 1.17422 11.6713 1.85878L16.5281 6.22989C17.0789 6.72568 17.7938 7.00001 18.5349 7.00001L15.89 7L11.0023 2.60207C10.622 2.2598 10.0447 2.2598 9.66436 2.60207L4.77734 7L2.13171 7.00001C2.87284 7.00001 3.58774 6.72568 4.13861 6.22989L8.99542 1.85876Z" />
			<path d="M10.3333 3.34539L5.47654 7.71648C4.55842 8.54279 3.36693 9 2.13172 9H0V8H2.13172C3.11989 8 4.07308 7.63423 4.80758 6.97318L9.66437 2.60207C10.0447 2.25979 10.622 2.2598 11.0023 2.60207L15.8591 6.97318C16.5936 7.63423 17.5468 8 18.5349 8H20V9H18.5349C17.2998 9 16.1083 8.54278 15.1901 7.71648L10.3333 3.34539Z" />
		</svg>
	);
};

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };
