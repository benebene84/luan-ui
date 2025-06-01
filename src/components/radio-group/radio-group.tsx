import { useFormContext } from "@components/form-field/form-field-context";
import { cn } from "@utilities/cn/cn";
import { RadioGroup as RadixRadioGroup } from "radix-ui";
import {
	type ComponentPropsWithoutRef,
	type ComponentRef,
	forwardRef,
} from "react";

/**
 * A RadioGroup component that provides a set of radio buttons where only one can be selected at a time.
 *
 * @example
 * ```tsx
 * <RadioGroup defaultValue="option1">
 *   <div>
 *     <RadioGroupItem value="option1" id="option1" />
 *     <label htmlFor="option1">Option 1</label>
 *   </div>
 *   <div>
 *     <RadioGroupItem value="option2" id="option2" />
 *     <label htmlFor="option2">Option 2</label>
 *   </div>
 * </RadioGroup>
 * ```
 *
 * @param {string} [className] - Additional CSS classes to apply to the root element
 * @param {string} [defaultValue] - The value of the radio item that should be checked when initially rendered
 * @param {string} [value] - The controlled value of the radio item to check
 * @param {function} [onValueChange] - Event handler called when the value changes
 * @param {boolean} [disabled] - When true, prevents the user from interacting with the radio group
 * @param {boolean} [required] - When true, indicates that the user must select a value before the owning form can be submitted
 * @param {string} [name] - The name of the group. Submitted with its owning form as part of a name/value pair
 * @param {string} [dir] - The reading direction of the radio group
 * @param {string} [orientation] - The orientation of the radio group
 * @param {boolean} [loop] - When true, keyboard navigation will loop from last item to first, and vice versa
 * @returns {React.ForwardRefExoticComponent} A React component that renders a radio group
 */
const RadioGroup = forwardRef<
	ComponentRef<typeof RadixRadioGroup.Root>,
	ComponentPropsWithoutRef<typeof RadixRadioGroup.Root>
>(
	(
		{
			className,
			disabled: initialDisabled,
			required: initialRequired,
			...props
		},
		ref,
	) => {
		const { disabled, required } = useFormContext({
			disabled: initialDisabled,
			required: initialRequired,
		});
		return (
			<RadixRadioGroup.Root
				ref={ref}
				className={cn("flex flex-col gap-2", className)}
				disabled={disabled}
				required={required}
				{...props}
			/>
		);
	},
);

const RadioGroupItem = forwardRef<
	ComponentRef<typeof RadixRadioGroup.Item>,
	ComponentPropsWithoutRef<typeof RadixRadioGroup.Item>
>(({ className, ...props }, ref) => (
	<RadixRadioGroup.Item
		ref={ref}
		className={cn(
			"flex h-4 w-4 items-center justify-center rounded-full border border-gray-700 bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-700 data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50",
			className,
		)}
		{...props}
	>
		<RadixRadioGroup.Indicator className="relative h-2 w-2 rounded-full bg-gray-500" />
	</RadixRadioGroup.Item>
));

export { RadioGroup, RadioGroupItem };
