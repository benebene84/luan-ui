import { Cross1Icon } from "@radix-ui/react-icons";
import { Popover as RadixPopover } from "radix-ui";
import {
	type ComponentRef,
	createContext,
	forwardRef,
	useContext,
	useMemo,
} from "react";
import { getVariants } from "../../utilities/get-variants/get-variants";
import { Icon } from "../icon/icon";

const PopoverContext = createContext<PopoverProps | undefined>(undefined);

const usePopoverContext = () => {
	const context = useContext(PopoverContext);
	if (!context) {
		throw new Error("Popover components must be used within a Popover");
	}
	return context;
};

type PopoverProps = {
	showArrow?: boolean;
	closeButtonAriaLabel?: string;
	showCloseButton?: boolean;
} & RadixPopover.PopoverProps &
	Pick<RadixPopover.PopoverContentProps, "side">;

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

type PopoverContentProps = RadixPopover.PopoverContentProps & {
	showArrow?: boolean;
	closeButtonAriaLabel?: string;
};

const popoverContentStyles = getVariants({
	base: "relative z-50 w-fit max-w-72 rounded-md bg-gray-700 p-4 text-sm text-white shadow-md",
	variants: {},
});

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

const PopoverClose = RadixPopover.Close;

const PopoverPortal = RadixPopover.Portal;

const PopoverAnchor = RadixPopover.Anchor;

export {
	Popover,
	PopoverTrigger,
	PopoverContent,
	PopoverClose,
	PopoverPortal,
	PopoverAnchor,
};
