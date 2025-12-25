import { Accordion as BaseAccordion } from "@base-ui/react/accordion";
import { Icon } from "@components/icon/icon";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { cn } from "@utilities/cn/cn";
import {
	type ComponentPropsWithoutRef,
	type ComponentRef,
	forwardRef,
} from "react";

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

export type AccordionProps = ComponentPropsWithoutRef<
	typeof BaseAccordion.Root
>;

const Accordion = BaseAccordion.Root;

export type AccordionItemProps = ComponentPropsWithoutRef<
	typeof BaseAccordion.Item
>;

const AccordionItem = forwardRef<
	ComponentRef<typeof BaseAccordion.Item>,
	AccordionItemProps
>(({ className, ...props }, ref) => (
	<BaseAccordion.Item
		ref={ref}
		className={cn("border-gray-200 border-b", className)}
		{...props}
	/>
));
AccordionItem.displayName = "AccordionItem";

export type AccordionTriggerProps = ComponentPropsWithoutRef<
	typeof BaseAccordion.Trigger
>;

const AccordionTrigger = forwardRef<
	ComponentRef<typeof BaseAccordion.Trigger>,
	AccordionTriggerProps
>(({ className, children, ...props }, ref) => (
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
			<Icon asChild size="small">
				<ChevronDownIcon className="shrink-0 cursor-pointer text-gray-500 transition-transform duration-350" />
			</Icon>
		</BaseAccordion.Trigger>
	</BaseAccordion.Header>
));
AccordionTrigger.displayName = "AccordionTrigger";

export type AccordionContentProps = ComponentPropsWithoutRef<
	typeof BaseAccordion.Panel
>;

const AccordionContent = forwardRef<
	ComponentRef<typeof BaseAccordion.Panel>,
	AccordionContentProps
>(({ className, children, ...props }, ref) => (
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
));
AccordionContent.displayName = "AccordionContent";

export { Accordion, AccordionContent, AccordionItem, AccordionTrigger };
