import { Autocomplete as AutocompletePrimitive } from "@base-ui/react/autocomplete";
import { useFormContext } from "@components/form-field/form-field-context";
import { Icon } from "@components/icon/icon";
import { ChevronDownIcon, Cross2Icon } from "@radix-ui/react-icons";
import { cn } from "@utilities/cn/cn";
import type React from "react";
import type { ComponentProps, JSX } from "react";

/**
 * Autocomplete
 *
 * An input that suggests options as you type.
 * Unlike Combobox, the input value can contain free-form text,
 * as suggestions only optionally autocomplete the text.
 */

export type AutocompleteProps<ItemValue = unknown> =
	AutocompletePrimitive.Root.Props<ItemValue>;

function Autocomplete<ItemValue>(
	props: AutocompleteProps<ItemValue>,
): JSX.Element {
	const { disabled, required } = useFormContext({
		disabled: props.disabled,
		required: props.required,
	});
	const Root = AutocompletePrimitive.Root as React.FC<
		AutocompleteProps<ItemValue>
	>;
	return <Root {...props} disabled={disabled} required={required} />;
}

/**
 * AutocompleteInputGroup
 */

export type AutocompleteInputGroupProps = ComponentProps<
	typeof AutocompletePrimitive.InputGroup
>;

function AutocompleteInputGroup({
	className,
	ref,
	...props
}: AutocompleteInputGroupProps) {
	return (
		<AutocompletePrimitive.InputGroup
			ref={ref}
			className={cn(
				"flex h-9 w-full items-center rounded-md border border-gray-400 bg-transparent text-sm shadow-sm ring-offset-background focus-within:outline-none focus-within:ring-1 focus-within:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
				className,
			)}
			{...props}
		/>
	);
}

/**
 * AutocompleteInput
 */

export type AutocompleteInputProps = ComponentProps<
	typeof AutocompletePrimitive.Input
>;

function AutocompleteInput({
	className,
	ref,
	...props
}: AutocompleteInputProps) {
	return (
		<AutocompletePrimitive.Input
			ref={ref}
			className={cn(
				"h-full w-full flex-1 bg-transparent px-3 py-2 text-sm outline-none placeholder:text-gray-400 disabled:cursor-not-allowed",
				className,
			)}
			{...props}
		/>
	);
}

/**
 * AutocompleteTrigger
 */

export type AutocompleteTriggerProps = ComponentProps<
	typeof AutocompletePrimitive.Trigger
>;

function AutocompleteTrigger({
	className,
	ref,
	...props
}: AutocompleteTriggerProps) {
	return (
		<AutocompletePrimitive.Trigger
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
		</AutocompletePrimitive.Trigger>
	);
}

/**
 * AutocompleteClear
 */

export type AutocompleteClearProps = ComponentProps<
	typeof AutocompletePrimitive.Clear
>;

function AutocompleteClear({
	className,
	ref,
	...props
}: AutocompleteClearProps) {
	return (
		<AutocompletePrimitive.Clear
			ref={ref}
			aria-label="Clear value"
			className={cn(
				"flex shrink-0 cursor-pointer items-center justify-center px-1 opacity-50 hover:opacity-100 disabled:cursor-not-allowed",
				className,
			)}
			{...props}
		>
			<Icon size="small">
				<Cross2Icon />
			</Icon>
		</AutocompletePrimitive.Clear>
	);
}

/**
 * AutocompleteContent
 */

export type AutocompleteContentProps = ComponentProps<
	typeof AutocompletePrimitive.Popup
> & {
	sideOffset?: number;
};

function AutocompleteContent({
	className,
	children,
	sideOffset = 4,
	ref,
	...props
}: AutocompleteContentProps) {
	return (
		<AutocompletePrimitive.Portal>
			<AutocompletePrimitive.Positioner sideOffset={sideOffset}>
				<AutocompletePrimitive.Popup
					ref={ref}
					className={cn(
						"data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-closed:fade-out data-closed:zoom-out-95 data-open:fade-in data-open:zoom-in-95 relative z-50 max-h-(--available-height) min-w-(--anchor-width) origin-(--transform-origin) overflow-y-auto overflow-x-hidden rounded-md border border-gray-400 bg-white text-gray-700 shadow-md transition-all data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=bottom]:translate-y-1 data-[side=top]:-translate-y-1 data-closed:animate-out data-open:animate-in",
						className,
					)}
					{...props}
				>
					{children}
				</AutocompletePrimitive.Popup>
			</AutocompletePrimitive.Positioner>
		</AutocompletePrimitive.Portal>
	);
}

/**
 * AutocompleteList
 */

export type AutocompleteListProps = ComponentProps<
	typeof AutocompletePrimitive.List
>;

function AutocompleteList({ className, ref, ...props }: AutocompleteListProps) {
	return (
		<AutocompletePrimitive.List
			ref={ref}
			className={cn("w-full p-1 empty:hidden", className)}
			{...props}
		/>
	);
}

/**
 * AutocompleteEmpty
 */

export type AutocompleteEmptyProps = ComponentProps<
	typeof AutocompletePrimitive.Empty
>;

function AutocompleteEmpty({
	className,
	ref,
	...props
}: AutocompleteEmptyProps) {
	return (
		<AutocompletePrimitive.Empty
			ref={ref}
			className={cn(
				"px-2 py-4 text-center text-gray-500 text-sm empty:hidden",
				className,
			)}
			{...props}
		/>
	);
}

/**
 * AutocompleteItem
 */

export type AutocompleteItemProps = ComponentProps<
	typeof AutocompletePrimitive.Item
>;

function AutocompleteItem({
	className,
	children,
	ref,
	...props
}: AutocompleteItemProps) {
	return (
		<AutocompletePrimitive.Item
			ref={ref}
			className={cn(
				"relative flex w-full cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-disabled:pointer-events-none data-highlighted:bg-gray-700 data-highlighted:text-white data-disabled:opacity-50",
				className,
			)}
			{...props}
		>
			{children}
		</AutocompletePrimitive.Item>
	);
}

/**
 * AutocompleteGroup
 */

const AutocompleteGroup = AutocompletePrimitive.Group;

/**
 * AutocompleteGroupLabel
 */

export type AutocompleteGroupLabelProps = ComponentProps<
	typeof AutocompletePrimitive.GroupLabel
>;

function AutocompleteGroupLabel({
	className,
	ref,
	...props
}: AutocompleteGroupLabelProps) {
	return (
		<AutocompletePrimitive.GroupLabel
			ref={ref}
			className={cn("px-2 py-1.5 font-semibold text-sm", className)}
			{...props}
		/>
	);
}

/**
 * AutocompleteSeparator
 */

export type AutocompleteSeparatorProps = ComponentProps<
	typeof AutocompletePrimitive.Separator
>;

function AutocompleteSeparator({
	className,
	ref,
	...props
}: AutocompleteSeparatorProps) {
	return (
		<AutocompletePrimitive.Separator
			ref={ref}
			className={cn("my-2 h-px bg-gray-200", className)}
			{...props}
		/>
	);
}

export {
	Autocomplete,
	AutocompleteClear,
	AutocompleteContent,
	AutocompleteEmpty,
	AutocompleteGroup,
	AutocompleteGroupLabel,
	AutocompleteInput,
	AutocompleteInputGroup,
	AutocompleteItem,
	AutocompleteList,
	AutocompleteSeparator,
	AutocompleteTrigger,
};
