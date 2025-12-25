import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import type { ResponsiveValue } from "@utilities/responsive/responsive";
import { getVariants } from "@utilities/responsive/responsive";

export type ButtonProps = useRender.ComponentProps<"button"> &
	Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "className"> & {
		variant?: "primary" | "secondary" | "destructive";
		size?: ResponsiveValue<"small" | "medium" | "large">;
		className?: string;
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
	base: "flex w-fit cursor-pointer items-center justify-center gap-2 rounded border font-semibold",
	variants: {
		variant: {
			primary:
				"border-transparent bg-gray-700 text-white hover:bg-gray-800 active:bg-gray-900",
			secondary:
				"border-gray-700 bg-white text-gray-700 hover:bg-gray-50 active:bg-gray-100",
			destructive:
				"border-transparent bg-red-500 text-white hover:bg-red-600 active:bg-red-700",
		},
		size: {
			small: "gap-2 px-2 py-1 text-sm",
			medium: "gap-3 px-4 py-2 text-base",
			large: "gap-4 px-6 py-3 text-lg",
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
 * A flexible button component that supports variants and sizes.
 * Icons should be rendered by the consumer as part of children.
 *
 * @param {Object} props - The props for the Button component
 * @param {'primary' | 'secondary' | 'destructive'} [props.variant='primary'] - The visual style variant of the button
 * @param {'small' | 'medium' | 'large'} [props.size='medium'] - The size of the button
 * @param {React.ReactElement | ((props, state) => React.ReactElement)} [props.render] - Custom element to render instead of button
 * @param {string} [props.className] - Additional CSS classes to apply
 * @param {boolean} [props.disabled] - Whether the button is disabled
 * @returns {React.ReactElement} The Button component
 *
 * @example
 * // Basic usage
 * <Button>Click me</Button>
 *
 * @example
 * // With variants and size
 * <Button variant="secondary" size="large">
 *   Large Secondary Button
 * </Button>
 *
 * @example
 * // With icons (rendered by consumer)
 * <Button>
 *   <Icon render={<SearchIcon />} size="small" />
 *   Search
 *   <Icon render={<ArrowRightIcon />} size="small" />
 * </Button>
 *
 * @example
 * // As a link using render prop
 * <Button render={<a href="/contact" />}>Contact Us</Button>
 *
 * @example
 * // Disabled state
 * <Button disabled>Disabled Button</Button>
 */
export function Button({
	children,
	variant = "primary",
	size = "medium",
	className,
	disabled,
	render,
	...props
}: ButtonProps) {
	const defaultProps: useRender.ElementProps<"button"> = {
		className: buttonStyles({ variant, size, disabled, className }),
		children,
	};

	return useRender({
		defaultTagName: "button",
		render,
		props: mergeProps<"button">(defaultProps, props),
	});
}

Button.displayName = "Button";
