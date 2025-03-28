import * as RadixSwitch from "@radix-ui/react-switch";
import { type ComponentRef, forwardRef } from "react";
import { getVariants } from "../../utilities/get-variants/get-variants";

type SwitchProps = RadixSwitch.SwitchProps;

const rootStyles = getVariants({
	base: "relative flex h-7 w-12 cursor-pointer appearance-none items-center rounded-full bg-gray-500 transition-colors duration-500 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-light-blue-300 data-[state=checked]:bg-green-500",
	variants: {
		disabled: {
			true: "cursor-not-allowed opacity-50",
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
	},
});

export const Switch = forwardRef<
	ComponentRef<typeof RadixSwitch.Root>,
	SwitchProps
>(({ className, disabled, ...props }, ref) => {
	return (
		<RadixSwitch.Root
			className={rootStyles({ disabled, className })}
			disabled={disabled}
			{...props}
			ref={ref}
		>
			<RadixSwitch.Thumb className={thumbStyles({ disabled })} />
		</RadixSwitch.Root>
	);
});
