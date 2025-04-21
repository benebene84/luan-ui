import { Icon } from "@components/icon/icon";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { cn } from "@utilities/cn/cn";
import { Accordion as RadixAccordion } from "radix-ui";
import {
	type ComponentPropsWithoutRef,
	type ComponentRef,
	forwardRef,
} from "react";

/**
 * Accordion component that allows users to expand and collapse content sections.
 * Built on top of Radix UI's Accordion primitive.
 *
 * @example
 * ```tsx
 * <Accordion type="single" collapsible>
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
 * @param {"single" | "multiple"} [props.type="single"] - Whether to allow single or multiple items expanded
 * @param {boolean} [props.collapsible=false] - Whether the expanded item can be collapsed
 * @param {string} [props.value] - The controlled value(s) of the expanded accordion item(s)
 * @param {function} [props.onValueChange] - Callback when value changes
 * @returns {React.ReactNode} The rendered accordion component
 */
const Accordion = RadixAccordion.Root;

const AccordionItem = forwardRef<
	ComponentRef<typeof RadixAccordion.Item>,
	ComponentPropsWithoutRef<typeof RadixAccordion.Item>
>(({ className, ...props }, ref) => (
	<RadixAccordion.Item
		ref={ref}
		className={cn("border-gray-200 border-b", className)}
		{...props}
	/>
));
AccordionItem.displayName = "AccordionItem";

const AccordionTrigger = forwardRef<
	ComponentRef<typeof RadixAccordion.Trigger>,
	ComponentPropsWithoutRef<typeof RadixAccordion.Trigger>
>(({ className, children, ...props }, ref) => (
	<RadixAccordion.Header className="flex">
		<RadixAccordion.Trigger
			ref={ref}
			className={cn(
				"flex flex-1 cursor-pointer items-center justify-between py-4 text-left font-medium text-sm transition-all hover:underline [&[data-state=open]>svg]:rotate-180",
				className,
			)}
			{...props}
		>
			{children}
			<Icon asChild size="small">
				<ChevronDownIcon className="shrink-0 cursor-pointer text-gray-500 transition-transform duration-350" />
			</Icon>
		</RadixAccordion.Trigger>
	</RadixAccordion.Header>
));
AccordionTrigger.displayName = "AccordionTrigger";

const AccordionContent = forwardRef<
	ComponentRef<typeof RadixAccordion.Content>,
	ComponentPropsWithoutRef<typeof RadixAccordion.Content>
>(({ className, children, ...props }, ref) => (
	<RadixAccordion.Content
		ref={ref}
		className={cn(
			"overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
			className,
		)}
		{...props}
	>
		<div className="pt-0 pb-4">{children}</div>
	</RadixAccordion.Content>
));
AccordionContent.displayName = "AccordionContent";

export { Accordion, AccordionContent, AccordionItem, AccordionTrigger };
