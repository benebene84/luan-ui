import type { InputHTMLAttributes } from "react";
import { getVariants } from "../../utilities/get-variants/get-variants";
import { Slot } from "../../utilities/slot/slot";

type SwitchProps = Omit<InputHTMLAttributes<HTMLInputElement>, "onChange"> & {
	onChange?: (checked: boolean) => void;
	asChild?: boolean;
};

const switchStyles = getVariants({
	base: `focus-visible:ring-light-blue-300 relative flex h-7 w-12 cursor-pointer appearance-none items-center rounded-full bg-gray-500 transition-colors duration-500 ease-out before:absolute before:left-1 before:h-5 before:w-5 before:rounded-full before:bg-white before:transition-transform before:duration-500 before:ease-out before:content-[""] checked:bg-green-500 checked:before:translate-x-[1.125rem] focus:outline-none focus-visible:ring-2`,
	variants: {
		disabled: {
			true: "opacity-50 cursor-not-allowed",
		},
	},
});

export const Switch = ({
	asChild,
	className,
	onChange,
	disabled,
	...props
}: SwitchProps) => {
	const Component = asChild ? Slot : "input";
	return (
		<Component
			type="checkbox"
			className={switchStyles({ disabled, className })}
			onChange={(e) => {
				onChange?.(e.target.checked);
			}}
			disabled={disabled}
			{...props}
		/>
	);
};
