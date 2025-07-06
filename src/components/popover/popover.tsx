import { Icon } from "@components/icon/icon";
import { Cross1Icon } from "@radix-ui/react-icons";
import { getVariants } from "@utilities/responsive/responsive";
import { Popover as RadixPopover } from "radix-ui";
import {
	type ComponentRef,
	createContext,
	forwardRef,
	useContext,
	useMemo,
} from "react";

/**
 * Popover Context
 */

const PopoverContext = createContext<PopoverProps | undefined>(undefined);

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
} & RadixPopover.PopoverProps &
	Pick<RadixPopover.PopoverContentProps, "side">;

/**
 * Popover component that provides a popover container with a trigger and content.
 *
 * @param {boolean} [props.showArrow=true] - Whether to show the arrow pointing to the trigger
 * @param {string} [props.closeButtonAriaLabel="Close"] - Aria label for the close button
 * @param {boolean} [props.showCloseButton=true] - Whether to show the close button
 * @param {RadixPopover.PopoverContentProps["side"]} [props.side] - The preferred side to show the popover
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
const Popover = ({
	children,
	showArrow = true,
	closeButtonAriaLabel = "Close",
	showCloseButton = true,
	side,
	...props
}: PopoverProps) => {
	const contextValue = useMemo(
		() => ({
			showArrow,
			closeButtonAriaLabel,
			side,
			showCloseButton,
		}),
		[showArrow, closeButtonAriaLabel, side, showCloseButton],
	);
	return (
		<PopoverContext.Provider value={contextValue}>
			<RadixPopover.Root {...props}>{children}</RadixPopover.Root>
		</PopoverContext.Provider>
	);
};

const PopoverTrigger = RadixPopover.Trigger;

export type PopoverContentProps = RadixPopover.PopoverContentProps & {
	showArrow?: boolean;
	closeButtonAriaLabel?: string;
};

const popoverContentStyles = getVariants({
	base: "relative z-50 w-fit max-w-72 rounded-md bg-gray-700 p-4 text-sm text-white shadow-md",
	variants: {},
});

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
const PopoverContent = forwardRef<
	ComponentRef<typeof RadixPopover.Content>,
	PopoverContentProps
>(({ children, className, sideOffset = 4, ...props }, ref) => {
	const { showArrow, closeButtonAriaLabel, side, showCloseButton } =
		usePopoverContext();
	return (
		<RadixPopover.Content
			className={popoverContentStyles({ className })}
			sideOffset={sideOffset}
			side={side}
			{...props}
			ref={ref}
		>
			{showCloseButton && (
				<PopoverClose
					className="absolute top-4 right-4"
					aria-label={closeButtonAriaLabel}
				>
					<Icon asChild size="small">
						<Cross1Icon />
					</Icon>
				</PopoverClose>
			)}
			{children}
			{showArrow && <RadixPopover.Arrow className="fill-gray-700" />}
		</RadixPopover.Content>
	);
});

/**
 * Popover Close
 */

const PopoverClose = RadixPopover.Close;

/**
 * Popover Portal
 */

const PopoverPortal = RadixPopover.Portal;

/**
 * Popover Anchor
 */

const PopoverAnchor = RadixPopover.Anchor;

export {
	Popover,
	PopoverTrigger,
	PopoverContent,
	PopoverClose,
	PopoverPortal,
	PopoverAnchor,
};
