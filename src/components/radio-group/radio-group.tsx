import { Radio } from "@base-ui/react/radio";
import { RadioGroup as BaseRadioGroup } from "@base-ui/react/radio-group";
import { useFormContext } from "@components/form-field/form-field-context";
import { cn } from "@utilities/cn/cn";
import type { ComponentProps } from "react";

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
 * @returns {React.ReactElement} A React component that renders a radio group
 */

export type RadioGroupProps = ComponentProps<typeof BaseRadioGroup>;

function RadioGroup({
	className,
	disabled: initialDisabled,
	required: initialRequired,
	ref,
	...props
}: RadioGroupProps) {
	const { disabled, required } = useFormContext({
		disabled: initialDisabled,
		required: initialRequired,
	});
	return (
		<BaseRadioGroup
			ref={ref}
			className={cn("flex flex-col gap-2", className)}
			disabled={disabled}
			required={required}
			{...props}
		/>
	);
}

export type RadioGroupItemProps = ComponentProps<typeof Radio.Root>;

function RadioGroupItem({ className, ref, ...props }: RadioGroupItemProps) {
	return (
		<Radio.Root
			ref={ref}
			className={cn(
				"flex h-4 w-4 items-center justify-center rounded-full border border-gray-700 bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-700 data-disabled:cursor-not-allowed data-disabled:opacity-50",
				className,
			)}
			{...props}
		>
			<Radio.Indicator className="relative h-2 w-2 rounded-full bg-gray-500" />
		</Radio.Root>
	);
}

export { RadioGroup, RadioGroupItem };
