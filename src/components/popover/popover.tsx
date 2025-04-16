import { Cross1Icon } from "@radix-ui/react-icons";
import { Popover as RadixPopover } from "radix-ui";
import { type ComponentRef, forwardRef } from "react";
import { getVariants } from "../../utilities/get-variants/get-variants";
import { Icon } from "../icon/icon";

const Popover = RadixPopover.Root;

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
>(
	(
		{
			children,
			className,
			showArrow = true,
			sideOffset = 4,
			closeButtonAriaLabel = "Close",
			...props
		},
		ref,
	) => {
		return (
			<RadixPopover.Content
				className={popoverContentStyles({ className })}
				sideOffset={sideOffset}
				{...props}
				ref={ref}
			>
				<PopoverClose
					className="absolute top-4 right-4"
					aria-label={closeButtonAriaLabel}
				>
					<Icon asChild size="small">
						<Cross1Icon />
					</Icon>
				</PopoverClose>
				{children}
				{showArrow && <RadixPopover.Arrow className="fill-gray-700" />}
			</RadixPopover.Content>
		);
	},
);

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
