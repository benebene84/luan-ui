import { Icon } from "@components/icon/icon";
import { Slot, Slottable } from "@components/slot/slot";
import { getVariants } from "@utilities/get-variants/get-variants";
import type { ResponsiveValue } from "@utilities/responsive/responsive";
import { forwardRef } from "react";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
	variant?: "primary" | "secondary";
	size?: ResponsiveValue<"small" | "medium" | "large">;
	asChild?: boolean;
	iconStart?: React.ReactNode;
	iconEnd?: React.ReactNode;
};

export const SIZES = {
	sm: {
		small: "sm:text-sm sm:px-2 sm:py-1 sm:gap-2",
		medium: "sm:text-base sm:px-4 sm:py-2 sm:gap-4",
		large: "sm:text-lg sm:px-6 sm:py-3 sm:gap-6",
	},
	md: {
		small: "md:text-sm md:px-2 md:py-1 md:gap-2",
		medium: "md:text-base md:px-4 md:py-2 md:gap-4",
		large: "md:text-lg md:px-6 md:py-3 md:gap-6",
	},
	lg: {
		small: "lg:text-sm lg:px-2 lg:py-1 lg:gap-2",
		medium: "lg:text-base lg:px-4 lg:py-2 lg:gap-4",
		large: "lg:text-lg lg:px-6 lg:py-3 lg:gap-6",
	},
};

const buttonStyles = getVariants({
	base: "flex w-fit items-center justify-center gap-2 rounded border font-semibold",
	variants: {
		variant: {
			primary: "border-transparent bg-blue-700 text-white hover:bg-blue-800",
			secondary: "border-transparent bg-black text-white hover:bg-gray-800",
		},
		size: {
			small: "gap-2 px-2 py-1 text-sm",
			medium: "gap-4 px-4 py-2 text-base",
			large: "gap-6 px-6 py-3 text-lg",
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

/**
 * A flexible button component that supports variants, sizes, and icons
 * @param {Object} props - The props for the Button component
 * @param {'primary' | 'secondary'} [props.variant='primary'] - The visual style variant of the button
 * @param {'small' | 'medium' | 'large'} [props.size='medium'] - The size of the button
 * @param {boolean} [props.asChild] - Whether to render the button as a child component using Radix Slot
 * @param {React.ReactNode} [props.iconStart] - Icon element to display before the button content
 * @param {React.ReactNode} [props.iconEnd] - Icon element to display after the button content
 * @param {string} [props.className] - Additional CSS classes to apply
 * @param {boolean} [props.disabled] - Whether the button is disabled
 * @returns {React.ReactElement} The Button component
 * @example
 * // Basic usage
 * <Button>Click me</Button>
 *
 * // With variants and size
 * <Button variant="secondary" size="large">
 *   Large Secondary Button
 * </Button>
 *
 * // With icons
 * <Button iconStart={<SearchIcon />} iconEnd={<ArrowRightIcon />}>
 *   Search
 * </Button>
 *
 * // Disabled state
 * <Button disabled>Disabled Button</Button>
 */
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
							{iconStart && (
								<Icon size={size} asChild>
									{iconStart}
								</Icon>
							)}
							{child}
							{iconEnd && (
								<Icon size={size} asChild>
									{iconEnd}
								</Icon>
							)}
						</>
					)}
				</Slottable>
			</Component>
		);
	},
);

Button.displayName = "Button";
