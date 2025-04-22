import { cn } from "@utilities/cn/cn";
import { Tooltip as RadixTooltip } from "radix-ui";
import { createContext, forwardRef, useContext, useMemo } from "react";

/**
 * Tooltip Context
 */

type TooltipContextType = {
	showArrow?: boolean;
	side?: RadixTooltip.TooltipContentProps["side"];
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

export type TooltipProps = React.ComponentProps<typeof RadixTooltip.Root> & {
	showArrow?: boolean;
	side?: RadixTooltip.TooltipContentProps["side"];
};

const Tooltip = ({
	children,
	showArrow = true,
	side,
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
			<RadixTooltip.Provider>
				<RadixTooltip.Root {...props}>{children}</RadixTooltip.Root>
			</RadixTooltip.Provider>
		</TooltipContext.Provider>
	);
};

/**
 * Tooltip Trigger
 */

const TooltipTrigger = RadixTooltip.Trigger;

/**
 * Tooltip Content
 */

const TooltipContent = forwardRef<
	HTMLDivElement,
	React.ComponentPropsWithoutRef<typeof RadixTooltip.Content> & {
		showArrow?: boolean;
	}
>(({ className, sideOffset = 4, children, ...props }, ref) => {
	const { showArrow, side } = useTooltipContext();
	return (
		<RadixTooltip.Content
			className={cn(
				"relative z-50 w-fit max-w-72 rounded-md bg-gray-700 p-2 text-sm text-white shadow-md",
				className,
			)}
			sideOffset={sideOffset}
			side={side}
			{...props}
			ref={ref}
		>
			{children}
			{showArrow && <RadixTooltip.Arrow className="fill-gray-700" />}
		</RadixTooltip.Content>
	);
});

TooltipContent.displayName = RadixTooltip.Content.displayName;

export { Tooltip, TooltipTrigger, TooltipContent };
