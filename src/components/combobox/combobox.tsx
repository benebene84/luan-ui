import { Combobox as ComboboxPrimitive } from "@base-ui/react/combobox";
import { useFormContext } from "@components/form-field/form-field-context";
import { Icon } from "@components/icon/icon";
import { CheckIcon, ChevronDownIcon, Cross2Icon } from "@radix-ui/react-icons";
import { cn } from "@utilities/cn/cn";
import type { ComponentProps, JSX } from "react";

/**
 * Combobox
 *
 * An input combined with a list of predefined items to select.
 * Use when the input is restricted to a set of predefined selectable items,
 * similar to Select but whose items are filterable using an input.
 */

export type ComboboxProps<
	Value = unknown,
	Multiple extends boolean | undefined = false,
> = ComboboxPrimitive.Root.Props<Value, Multiple>;

function Combobox<Value, Multiple extends boolean | undefined = false>({
	disabled: initialDisabled,
	required: initialRequired,
	...props
}: ComboboxProps<Value, Multiple>): JSX.Element {
	const { disabled, required } = useFormContext({
		disabled: initialDisabled,
		required: initialRequired,
	});
	return (
		<ComboboxPrimitive.Root<Value, Multiple>
			disabled={disabled}
			required={required}
			{...props}
		/>
	);
}

/**
 * ComboboxInputGroup
 */

export type ComboboxInputGroupProps = ComponentProps<
	typeof ComboboxPrimitive.InputGroup
>;

function ComboboxInputGroup({
	className,
	ref,
	...props
}: ComboboxInputGroupProps) {
	return (
		<ComboboxPrimitive.InputGroup
			ref={ref}
			className={cn(
				"flex h-9 w-full items-center rounded-md border border-border-input bg-transparent text-sm shadow-sm ring-offset-background focus-within:outline-none focus-within:ring-1 focus-within:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
				className,
			)}
			{...props}
		/>
	);
}

/**
 * ComboboxInput
 */

export type ComboboxInputProps = ComponentProps<typeof ComboboxPrimitive.Input>;

function ComboboxInput({ className, ref, ...props }: ComboboxInputProps) {
	return (
		<ComboboxPrimitive.Input
			ref={ref}
			className={cn(
				"h-full w-full flex-1 bg-transparent px-3 py-2 text-sm outline-none placeholder:text-text-placeholder disabled:cursor-not-allowed",
				className,
			)}
			{...props}
		/>
	);
}

/**
 * ComboboxTrigger
 */

export type ComboboxTriggerProps = ComponentProps<
	typeof ComboboxPrimitive.Trigger
>;

function ComboboxTrigger({ className, ref, ...props }: ComboboxTriggerProps) {
	return (
		<ComboboxPrimitive.Trigger
			ref={ref}
			className={cn(
				"flex shrink-0 cursor-pointer items-center justify-center px-2 opacity-50 hover:opacity-100 disabled:cursor-not-allowed",
				className,
			)}
			{...props}
		>
			<Icon size="small">
				<ChevronDownIcon />
			</Icon>
		</ComboboxPrimitive.Trigger>
	);
}

/**
 * ComboboxClear
 */

export type ComboboxClearProps = ComponentProps<typeof ComboboxPrimitive.Clear>;

function ComboboxClear({ className, ref, ...props }: ComboboxClearProps) {
	return (
		<ComboboxPrimitive.Clear
			ref={ref}
			aria-label="Clear selection"
			className={cn(
				"flex shrink-0 cursor-pointer items-center justify-center px-1 opacity-50 hover:opacity-100 disabled:cursor-not-allowed",
				className,
			)}
			{...props}
		>
			<Icon size="small">
				<Cross2Icon />
			</Icon>
		</ComboboxPrimitive.Clear>
	);
}

/**
 * ComboboxContent
 */

export type ComboboxContentProps = ComponentProps<
	typeof ComboboxPrimitive.Popup
> & {
	sideOffset?: number;
};

function ComboboxContent({
	className,
	children,
	sideOffset = 4,
	ref,
	...props
}: ComboboxContentProps) {
	return (
		<ComboboxPrimitive.Portal>
			<ComboboxPrimitive.Positioner sideOffset={sideOffset}>
				<ComboboxPrimitive.Popup
					ref={ref}
					className={cn(
						"data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-closed:fade-out data-closed:zoom-out-95 data-open:fade-in data-open:zoom-in-95 relative z-50 max-h-(--available-height) min-w-(--anchor-width) origin-(--transform-origin) overflow-y-auto overflow-x-hidden rounded-md border border-border-input bg-surface text-text-secondary shadow-md transition-all data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=bottom]:translate-y-1 data-[side=top]:-translate-y-1 data-closed:animate-out data-open:animate-in",
						className,
					)}
					{...props}
				>
					{children}
				</ComboboxPrimitive.Popup>
			</ComboboxPrimitive.Positioner>
		</ComboboxPrimitive.Portal>
	);
}

/**
 * ComboboxList
 */

export type ComboboxListProps = ComponentProps<typeof ComboboxPrimitive.List>;

function ComboboxList({ className, ref, ...props }: ComboboxListProps) {
	return (
		<ComboboxPrimitive.List
			ref={ref}
			className={cn("w-full p-1 empty:hidden", className)}
			{...props}
		/>
	);
}

/**
 * ComboboxEmpty
 */

export type ComboboxEmptyProps = ComponentProps<typeof ComboboxPrimitive.Empty>;

function ComboboxEmpty({ className, ref, ...props }: ComboboxEmptyProps) {
	return (
		<ComboboxPrimitive.Empty
			ref={ref}
			className={cn(
				"px-2 py-4 text-center text-sm text-text-muted empty:hidden",
				className,
			)}
			{...props}
		/>
	);
}

/**
 * ComboboxItem
 */

export type ComboboxItemProps = ComponentProps<typeof ComboboxPrimitive.Item>;

function ComboboxItem({
	className,
	children,
	ref,
	...props
}: ComboboxItemProps) {
	return (
		<ComboboxPrimitive.Item
			ref={ref}
			className={cn(
				"relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pr-8 pl-2 text-sm outline-none data-disabled:pointer-events-none data-highlighted:bg-highlight data-highlighted:text-on-highlight data-disabled:opacity-50",
				className,
			)}
			{...props}
		>
			<span className="absolute right-2 flex h-3.5 w-3.5 items-center justify-center">
				<ComboboxPrimitive.ItemIndicator>
					<Icon size="small">
						<CheckIcon />
					</Icon>
				</ComboboxPrimitive.ItemIndicator>
			</span>
			{children}
		</ComboboxPrimitive.Item>
	);
}

/**
 * ComboboxGroup
 */

const ComboboxGroup = ComboboxPrimitive.Group;

/**
 * ComboboxGroupLabel
 */

export type ComboboxGroupLabelProps = ComponentProps<
	typeof ComboboxPrimitive.GroupLabel
>;

function ComboboxGroupLabel({
	className,
	ref,
	...props
}: ComboboxGroupLabelProps) {
	return (
		<ComboboxPrimitive.GroupLabel
			ref={ref}
			className={cn("px-2 py-1.5 font-semibold text-sm", className)}
			{...props}
		/>
	);
}

/**
 * ComboboxSeparator
 */

export type ComboboxSeparatorProps = ComponentProps<
	typeof ComboboxPrimitive.Separator
>;

function ComboboxSeparator({
	className,
	ref,
	...props
}: ComboboxSeparatorProps) {
	return (
		<ComboboxPrimitive.Separator
			ref={ref}
			className={cn("my-2 h-px bg-separator", className)}
			{...props}
		/>
	);
}

export {
	Combobox,
	ComboboxClear,
	ComboboxContent,
	ComboboxEmpty,
	ComboboxGroup,
	ComboboxGroupLabel,
	ComboboxInput,
	ComboboxInputGroup,
	ComboboxItem,
	ComboboxList,
	ComboboxSeparator,
	ComboboxTrigger,
};
