import { forwardRef } from "react";
import {
	type ResponsiveValue,
	getVariants,
} from "../../utilities/get-variants/get-variants";
import { Slot, Slottable } from "../../utilities/slot/slot";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
	variant?: ResponsiveValue<"primary" | "secondary">;
	size?: ResponsiveValue<"small" | "medium" | "large">;
	asChild?: boolean;
	iconStart?: React.ReactNode;
	iconEnd?: React.ReactNode;
};

export const SIZES = {
	sm: {
		small: "sm:text-sm sm:px-2 sm:gap-2",
		medium: "sm:text-base sm:px-4 sm:gap-4",
		large: "sm:text-lg sm:px-6 sm:gap-6",
	},
	md: {
		small: "md:text-sm md:px-2 md:gap-2",
		medium: "md:text-base md:px-4 md:gap-4",
		large: "md:text-lg md:px-6 md:gap-6",
	},
	lg: {
		small: "lg:text-sm lg:px-2 lg:gap-2",
		medium: "lg:text-base lg:px-4 lg:gap-4",
		large: "lg:text-lg lg:px-6 lg:gap-6",
	},
};

export const VARIANTS = {
	primary: {
		sm: "sm:bg-blue-500 sm:text-white sm:border-transparent sm:hover:bg-blue-600",
		md: "md:bg-blue-500 md:text-white md:border-transparent md:hover:bg-blue-600",
		lg: "lg:bg-blue-500 lg:text-white lg:border-transparent lg:hover:bg-blue-600",
	},
	secondary: {
		sm: "sm:bg-black sm:text-white sm:border-transparent sm:hover:bg-gray-800",
		md: "md:bg-black md:text-white md:border-transparent md:hover:bg-gray-800",
		lg: "lg:bg-black lg:text-white lg:border-transparent lg:hover:bg-gray-800",
	},
};

const buttonStyles = getVariants({
	base: "flex w-fit items-center justify-center gap-2 rounded border font-semibold",
	variants: {
		variant: {
			primary: "border-transparent bg-blue-500 text-white hover:bg-blue-600",
			secondary: "border-transparent bg-black text-white hover:bg-gray-800",
		},
		size: {
			small: "gap-2 px-2 text-sm",
			medium: "gap-4 px-4 text-base",
			large: "gap-6 px-6 text-lg",
		},
		disabled: {
			true: "cursor-not-allowed opacity-50",
		},
	},
	compoundVariants: [
		{
			variant: "secondary",
			size: "medium",
			className: "test-compound-variant",
		},
	],
});

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
	(
		{
			asChild,
			children,
			variant = "primary",
			size = "medium",
			className,
			disabled,
			iconStart,
			iconEnd,
			...props
		},
		ref,
	) => {
		const Component = asChild ? Slot : "button";
		return (
			<Component
				ref={ref}
				className={buttonStyles({ variant, size, disabled, className })}
				{...props}
			>
				<Slottable child={children}>
					{(child) => (
						<>
							{iconStart}
							{child}
							{iconEnd}
						</>
					)}
				</Slottable>
			</Component>
		);
	},
);

Button.displayName = "Button";
