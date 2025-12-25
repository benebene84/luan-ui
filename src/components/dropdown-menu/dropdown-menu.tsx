import { Menu } from "@base-ui/react/menu";
import { CheckIcon, ChevronRightIcon, CircleIcon } from "@radix-ui/react-icons";
import { cn } from "@utilities/cn/cn";
import type { ComponentProps } from "react";

const DropdownMenu = Menu.Root;

export type DropdownMenuTriggerProps = ComponentProps<typeof Menu.Trigger>;

function DropdownMenuTrigger({
	className,
	ref,
	...props
}: DropdownMenuTriggerProps) {
	return <Menu.Trigger ref={ref} className={className} {...props} />;
}

const DropdownMenuGroup = Menu.Group;

const DropdownMenuPortal = Menu.Portal;

const DropdownMenuSub = Menu.SubmenuRoot;

const DropdownMenuRadioGroup = Menu.RadioGroup;

export type DropdownMenuSubTriggerProps = ComponentProps<
	typeof Menu.SubmenuTrigger
> & {
	inset?: boolean;
};

function DropdownMenuSubTrigger({
	className,
	inset,
	children,
	ref,
	...props
}: DropdownMenuSubTriggerProps) {
	return (
		<Menu.SubmenuTrigger
			ref={ref}
			className={cn(
				"flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none data-highlighted:bg-gray-200 data-popup-open:bg-gray-200 data-highlighted:text-gray-700 data-popup-open:text-gray-900 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
				inset && "pl-8",
				className,
			)}
			{...props}
		>
			{children}
			<ChevronRightIcon className="ml-auto" />
		</Menu.SubmenuTrigger>
	);
}

export type DropdownMenuSubContentProps = ComponentProps<typeof Menu.Popup>;

function DropdownMenuSubContent({
	className,
	ref,
	...props
}: DropdownMenuSubContentProps) {
	return (
		<Menu.Portal>
			<Menu.Positioner>
				<Menu.Popup
					ref={ref}
					className={cn(
						"data-[starting-style]:zoom-out-95 data-[ending-style]:zoom-out-95 data-[open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 min-w-32 origin-[--transform-origin] overflow-hidden rounded-md border border-gray-200 bg-gray-50 p-1 text-gray-700 shadow-lg data-ending-style:animate-fade-out data-starting-style:animate-fade-in",
						className,
					)}
					{...props}
				/>
			</Menu.Positioner>
		</Menu.Portal>
	);
}

export type DropdownMenuContentProps = ComponentProps<typeof Menu.Popup> & {
	sideOffset?: number;
};

function DropdownMenuContent({
	className,
	sideOffset = 4,
	ref,
	...props
}: DropdownMenuContentProps) {
	return (
		<Menu.Portal>
			<Menu.Positioner sideOffset={sideOffset}>
				<Menu.Popup
					ref={ref}
					className={cn(
						"z-50 max-h-(--available-height) min-w-32 overflow-y-auto overflow-x-hidden rounded-md border border-gray-200 bg-gray-50 p-1 text-gray-700 shadow-md",
						"data-[ending-style]:zoom-out-95 data-[starting-style]:zoom-out-95 data-[open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--transform-origin] data-ending-style:animate-fade-out data-starting-style:animate-fade-in",
						className,
					)}
					{...props}
				/>
			</Menu.Positioner>
		</Menu.Portal>
	);
}

export type DropdownMenuItemProps = ComponentProps<typeof Menu.Item> & {
	inset?: boolean;
};

function DropdownMenuItem({
	className,
	inset,
	ref,
	...props
}: DropdownMenuItemProps) {
	return (
		<Menu.Item
			ref={ref}
			className={cn(
				"relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors data-disabled:pointer-events-none data-highlighted:bg-gray-200 data-highlighted:text-gray-700 data-disabled:opacity-50 [&>svg]:size-4 [&>svg]:shrink-0",
				inset && "pl-8",
				className,
			)}
			{...props}
		/>
	);
}

export type DropdownMenuCheckboxItemProps = ComponentProps<
	typeof Menu.CheckboxItem
>;

function DropdownMenuCheckboxItem({
	className,
	children,
	checked,
	onCheckedChange,
	ref,
	...props
}: DropdownMenuCheckboxItemProps) {
	return (
		<Menu.CheckboxItem
			ref={ref}
			className={cn(
				"relative flex cursor-default select-none items-center rounded-sm py-1.5 pr-2 pl-8 text-sm outline-none transition-colors data-disabled:pointer-events-none data-highlighted:bg-gray-200 data-highlighted:text-gray-700 data-disabled:opacity-50",
				className,
			)}
			checked={checked}
			onCheckedChange={onCheckedChange}
			{...props}
		>
			<span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
				<Menu.CheckboxItemIndicator>
					<CheckIcon className="h-4 w-4" />
				</Menu.CheckboxItemIndicator>
			</span>
			{children}
		</Menu.CheckboxItem>
	);
}

export type DropdownMenuRadioItemProps = ComponentProps<typeof Menu.RadioItem>;

function DropdownMenuRadioItem({
	className,
	children,
	ref,
	...props
}: DropdownMenuRadioItemProps) {
	return (
		<Menu.RadioItem
			ref={ref}
			className={cn(
				"relative flex cursor-default select-none items-center rounded-sm py-1.5 pr-2 pl-8 text-sm outline-none transition-colors data-disabled:pointer-events-none data-highlighted:bg-gray-200 data-highlighted:text-gray-900 data-disabled:opacity-50",
				className,
			)}
			{...props}
		>
			<span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
				<Menu.RadioItemIndicator>
					<CircleIcon className="h-2 w-2 fill-current" />
				</Menu.RadioItemIndicator>
			</span>
			{children}
		</Menu.RadioItem>
	);
}

export type DropdownMenuLabelProps = ComponentProps<typeof Menu.GroupLabel> & {
	inset?: boolean;
};

function DropdownMenuLabel({
	className,
	inset,
	ref,
	...props
}: DropdownMenuLabelProps) {
	return (
		<Menu.Group>
			<Menu.GroupLabel
				ref={ref}
				className={cn(
					"px-2 py-1.5 font-semibold text-sm",
					inset && "pl-8",
					className,
				)}
				{...props}
			/>
		</Menu.Group>
	);
}

export type DropdownMenuSeparatorProps = ComponentProps<typeof Menu.Separator>;

function DropdownMenuSeparator({
	className,
	ref,
	...props
}: DropdownMenuSeparatorProps) {
	return (
		<Menu.Separator
			ref={ref}
			className={cn("-mx-1 my-1 h-px bg-gray-200", className)}
			{...props}
		/>
	);
}

function DropdownMenuShortcut({
	className,
	...props
}: React.HTMLAttributes<HTMLSpanElement>) {
	return (
		<span
			className={cn("ml-auto text-xs tracking-widest opacity-60", className)}
			{...props}
		/>
	);
}

export {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuCheckboxItem,
	DropdownMenuRadioItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuGroup,
	DropdownMenuPortal,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuRadioGroup,
};
