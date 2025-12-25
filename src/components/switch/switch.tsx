import { Switch as SwitchPrimitive } from "@base-ui/react/switch";
import { useFormContext } from "@components/form-field/form-field-context";
import type { ResponsiveValue } from "@utilities/responsive/responsive";
import { getVariants } from "@utilities/responsive/responsive";
import { type ComponentRef, forwardRef } from "react";

export type SwitchProps = Omit<SwitchPrimitive.Root.Props, "className"> & {
	size?: ResponsiveValue<"small" | "medium" | "large">;
	error?: boolean;
	className?: string;
};

const thumbStyles = getVariants({
	slots: {
		root: "relative flex cursor-pointer appearance-none items-center rounded-full bg-gray-500 transition-colors duration-500 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-light-blue-300 data-[checked]:bg-green-500",
		thumb:
			"absolute left-1 h-5 w-5 rounded-full transition-transform duration-500 ease-out data-[checked]:translate-x-[1.125rem]",
	},
	variants: {
		disabled: {
			true: {
				root: "cursor-not-allowed opacity-50",
				thumb: "bg-gray-300",
			},
			false: {
				root: "cursor-pointer opacity-100",
				thumb: "bg-white",
			},
		},
		error: {
			true: {
				root: "bg-red-600 data-[checked]:bg-red-600",
				thumb: "bg-red-600",
			},
		},
		size: {
			small: {
				root: "h-5 w-10",
				thumb: "h-3 w-3",
			},
			medium: {
				root: "h-7 w-12",
				thumb: "h-5 w-5",
			},
			large: {
				root: "h-9 w-14",
				thumb: "h-7 w-7",
			},
		},
	},
});

const { root, thumb } = thumbStyles();

/**
 * A switch component that toggles between on and off states.
 * Built on top of Base UI's Switch primitive.
 *
 * @param {SwitchProps} props - The props for the Switch component
 * @param {ResponsiveValue<"small" | "medium" | "large">} [props.size="medium"] - The size of the switch
 * @param {boolean} [props.disabled] - Whether the switch is disabled
 * @param {string} [props.className] - Additional CSS classes to apply
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
	ComponentRef<typeof SwitchPrimitive.Root>,
	SwitchProps
>(
	(
		{
			className,
			disabled: initialDisabled,
			size = "medium",
			error: initialError,
			...props
		},
		ref,
	) => {
		const { disabled, error } = useFormContext({
			disabled: initialDisabled,
			error: initialError,
		});
		return (
			<SwitchPrimitive.Root
				className={root({ disabled, size, error, className })}
				disabled={disabled}
				{...props}
				ref={ref}
			>
				<SwitchPrimitive.Thumb className={thumb({ disabled, size })} />
			</SwitchPrimitive.Root>
		);
	},
);

Switch.displayName = "Switch";
