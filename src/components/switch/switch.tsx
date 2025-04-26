import { getVariants } from "@utilities/get-variants/get-variants";
import type { ResponsiveValue } from "@utilities/responsive/responsive";
import { Switch as RadixSwitch } from "radix-ui";
import { type ComponentRef, forwardRef } from "react";

export type SwitchProps = RadixSwitch.SwitchProps & {
	size?: ResponsiveValue<"small" | "medium" | "large">;
};

const rootStyles = getVariants({
	base: "relative flex cursor-pointer appearance-none items-center rounded-full bg-gray-500 transition-colors duration-500 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-light-blue-300 data-[state=checked]:bg-green-500",
	variants: {
		disabled: {
			true: "cursor-not-allowed opacity-50",
		},
		size: {
			small: "h-5 w-10",
			medium: "h-7 w-12",
			large: "h-9 w-14",
		},
	},
});

const thumbStyles = getVariants({
	base: "absolute left-1 h-5 w-5 rounded-full transition-transform duration-500 ease-out data-[state=checked]:translate-x-[1.125rem]",
	variants: {
		disabled: {
			true: "bg-gray-300",
			false: "bg-white",
		},
		size: {
			small: "h-3 w-3",
			medium: "h-5 w-5",
			large: "h-7 w-7",
		},
	},
});

/**
 * A switch component that toggles between on and off states.
 * Built on top of Radix UI's Switch primitive.
 *
 * @example
 * // Basic usage
 * <Switch />
 *
 * @example
 * // With different sizes
 * <Switch size="small" />
 * <Switch size="medium" />
 * <Switch size="large" />
 *
 * @example
 * // Disabled state
 * <Switch disabled />
 *
 * @example
 * // With onChange handler
 * <Switch onCheckedChange={(checked) => console.log(checked)} />
 *
 * @param {ResponsiveValue<"small" | "medium" | "large">} [props.size="medium"] - The size of the switch
 * @param {boolean} [props.disabled] - Whether the switch is disabled
 * @param {string} [props.className] - Additional CSS classes to apply
 */
export const Switch = forwardRef<
	ComponentRef<typeof RadixSwitch.Root>,
	SwitchProps
>(({ className, disabled, size = "medium", ...props }, ref) => {
	return (
		<RadixSwitch.Root
			className={rootStyles({ disabled, size, className })}
			disabled={disabled}
			{...props}
			ref={ref}
		>
			<RadixSwitch.Thumb className={thumbStyles({ disabled, size })} />
		</RadixSwitch.Root>
	);
});
