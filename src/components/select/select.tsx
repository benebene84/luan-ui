import { Select as SelectPrimitive } from "@base-ui/react/select";
import { useFormContext } from "@components/form-field/form-field-context";
import { Icon } from "@components/icon/icon";
import {
	CheckIcon,
	ChevronDownIcon,
	ChevronUpIcon,
} from "@radix-ui/react-icons";
import { cn } from "@utilities/cn/cn";
import { type ComponentPropsWithoutRef, forwardRef } from "react";

/**
 * Select
 */

const Select = ({
	disabled: initialDisabled,
	required: initialRequired,
	...props
}: ComponentPropsWithoutRef<typeof SelectPrimitive.Root>) => {
	const { disabled, required } = useFormContext({
		disabled: initialDisabled,
		required: initialRequired,
	});
	return (
		<SelectPrimitive.Root disabled={disabled} required={required} {...props} />
	);
};

/**
 * SelectGroup
 */

const SelectGroup = SelectPrimitive.Group;

/**
 * SelectValue
 */

const SelectValue = forwardRef<
	HTMLSpanElement,
	ComponentPropsWithoutRef<typeof SelectPrimitive.Value>
>(({ ...props }, ref) => <SelectPrimitive.Value ref={ref} {...props} />);
SelectValue.displayName = "SelectValue";

/**
 * SelectTrigger
 */

const SelectTrigger = forwardRef<
	HTMLButtonElement,
	ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
	<SelectPrimitive.Trigger
		ref={ref}
		className={cn(
			"flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-gray-400 bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-placeholder:text-gray-500 [&>span]:line-clamp-1",
			className,
		)}
		{...props}
	>
		{children}
		<SelectPrimitive.Icon
			render={
				<Icon size="small" className="opacity-50">
					<ChevronDownIcon />
				</Icon>
			}
		/>
	</SelectPrimitive.Trigger>
));
SelectTrigger.displayName = "SelectTrigger";

/**
 * SelectScrollUpArrow
 */

const SelectScrollUpArrow = forwardRef<
	HTMLDivElement,
	ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpArrow>
>(({ className, ...props }, ref) => (
	<SelectPrimitive.ScrollUpArrow
		ref={ref}
		className={cn(
			"flex cursor-default items-center justify-center py-1",
			className,
		)}
		{...props}
	>
		<Icon size="small" className="opacity-50">
			<ChevronUpIcon />
		</Icon>
	</SelectPrimitive.ScrollUpArrow>
));
SelectScrollUpArrow.displayName = "SelectScrollUpArrow";

/**
 * SelectScrollDownArrow
 */

const SelectScrollDownArrow = forwardRef<
	HTMLDivElement,
	ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownArrow>
>(({ className, ...props }, ref) => (
	<SelectPrimitive.ScrollDownArrow
		ref={ref}
		className={cn(
			"flex cursor-default items-center justify-center py-1",
			className,
		)}
		{...props}
	>
		<Icon size="small" className="opacity-50">
			<ChevronDownIcon />
		</Icon>
	</SelectPrimitive.ScrollDownArrow>
));
SelectScrollDownArrow.displayName = "SelectScrollDownArrow";

/**
 * SelectContent
 */

const SelectContent = forwardRef<
	HTMLDivElement,
	ComponentPropsWithoutRef<typeof SelectPrimitive.Popup> & {
		sideOffset?: number;
	}
>(({ className, children, sideOffset = 4, ...props }, ref) => (
	<SelectPrimitive.Portal>
		<SelectPrimitive.Positioner
			sideOffset={sideOffset}
			alignItemWithTrigger={false}
		>
			<SelectScrollUpArrow />
			<SelectPrimitive.Popup
				ref={ref}
				className={cn(
					"data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-closed:fade-out data-closed:zoom-out-95 data-open:fade-in data-open:zoom-in-95 relative z-50 max-h-(--available-height) min-w-32 origin-(--transform-origin) overflow-y-auto overflow-x-hidden rounded-md border border-gray-400 bg-white text-gray-700 shadow-md transition-all data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=bottom]:translate-y-1 data-[side=top]:-translate-y-1 data-closed:animate-out data-open:animate-in",
					className,
				)}
				{...props}
			>
				<SelectPrimitive.List className="w-full min-w-(--anchor-width) p-1">
					{children}
				</SelectPrimitive.List>
			</SelectPrimitive.Popup>
			<SelectScrollDownArrow />
		</SelectPrimitive.Positioner>
	</SelectPrimitive.Portal>
));
SelectContent.displayName = "SelectContent";

/**
 * SelectLabel
 */

const SelectLabel = forwardRef<
	HTMLDivElement,
	ComponentPropsWithoutRef<typeof SelectPrimitive.GroupLabel>
>(({ className, ...props }, ref) => (
	<SelectPrimitive.GroupLabel
		ref={ref}
		className={cn("px-2 py-1.5 font-semibold text-sm", className)}
		{...props}
	/>
));
SelectLabel.displayName = "SelectLabel";

/**
 * SelectItem
 */

const SelectItem = forwardRef<
	HTMLDivElement,
	ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
	<SelectPrimitive.Item
		ref={ref}
		className={cn(
			"relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pr-8 pl-2 text-sm outline-none data-disabled:pointer-events-none data-highlighted:bg-gray-700 data-highlighted:text-white data-disabled:opacity-50",
			className,
		)}
		{...props}
	>
		<span className="absolute right-2 flex h-3.5 w-3.5 items-center justify-center">
			<SelectPrimitive.ItemIndicator>
				<Icon size="small">
					<CheckIcon />
				</Icon>
			</SelectPrimitive.ItemIndicator>
		</span>
		<SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
	</SelectPrimitive.Item>
));
SelectItem.displayName = "SelectItem";

/**
 * SelectSeparator
 */

const SelectSeparator = forwardRef<
	HTMLDivElement,
	ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
	<SelectPrimitive.Separator
		ref={ref}
		className={cn("my-2 h-px bg-gray-200", className)}
		{...props}
	/>
));
SelectSeparator.displayName = "SelectSeparator";

export {
	Select,
	SelectGroup,
	SelectValue,
	SelectTrigger,
	SelectContent,
	SelectLabel,
	SelectItem,
	SelectSeparator,
	SelectScrollUpArrow,
	SelectScrollDownArrow,
};
