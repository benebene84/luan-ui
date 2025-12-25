import { Accordion as BaseAccordion } from "@base-ui/react/accordion";
import { Icon } from "@components/icon/icon";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { cn } from "@utilities/cn/cn";
import type { ComponentProps } from "react";

/**
 * Accordion component that allows users to expand and collapse content sections.
 * Built on top of Base UI's Accordion primitive.
 *
 * @example
 * ```tsx
 * <Accordion>
 *   <AccordionItem value="item-1">
 *     <AccordionTrigger>Section 1</AccordionTrigger>
 *     <AccordionContent>Content for section 1</AccordionContent>
 *   </AccordionItem>
 * </Accordion>
 * ```
 *
 * @param {Object} props - The component props
 * @param {string} props.className - Optional class name for custom styling
 * @param {React.ReactNode} props.children - The accordion items to render
 * @param {boolean} [props.multiple=false] - Whether to allow multiple items expanded at once
 * @param {any[]} [props.value] - The controlled value(s) of the expanded accordion item(s)
 * @param {function} [props.onValueChange] - Callback when value changes
 * @returns {React.ReactNode} The rendered accordion component
 */

export type AccordionProps = ComponentProps<typeof BaseAccordion.Root>;

const Accordion = BaseAccordion.Root;

export type AccordionItemProps = ComponentProps<typeof BaseAccordion.Item>;

function AccordionItem({ className, ref, ...props }: AccordionItemProps) {
	return (
		<BaseAccordion.Item
			ref={ref}
			className={cn("border-gray-200 border-b", className)}
			{...props}
		/>
	);
}

export type AccordionTriggerProps = ComponentProps<
	typeof BaseAccordion.Trigger
>;

function AccordionTrigger({
	className,
	children,
	ref,
	...props
}: AccordionTriggerProps) {
	return (
		<BaseAccordion.Header className="flex">
			<BaseAccordion.Trigger
				ref={ref}
				className={cn(
					"flex flex-1 cursor-pointer items-center justify-between py-4 text-left font-medium text-sm transition-all hover:underline [&[data-panel-open]>svg]:rotate-180",
					className,
				)}
				{...props}
			>
				{children}
				<Icon
					render={
						<ChevronDownIcon className="shrink-0 cursor-pointer text-gray-500 transition-transform duration-350" />
					}
					size="small"
				/>
			</BaseAccordion.Trigger>
		</BaseAccordion.Header>
	);
}

export type AccordionContentProps = ComponentProps<typeof BaseAccordion.Panel>;

function AccordionContent({
	className,
	children,
	ref,
	...props
}: AccordionContentProps) {
	return (
		<BaseAccordion.Panel
			ref={ref}
			className={cn(
				"h-(--accordion-panel-height) overflow-hidden text-sm transition-[height] duration-350 ease-in-out data-ending-style:h-0 data-starting-style:h-0",
				className,
			)}
			{...props}
		>
			<div className="pt-0 pb-4">{children}</div>
		</BaseAccordion.Panel>
	);
}

export { Accordion, AccordionContent, AccordionItem, AccordionTrigger };
