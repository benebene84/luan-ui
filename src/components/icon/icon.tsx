import { Slot } from "@components/slot/slot";
import type { ResponsiveValue } from "@utilities/responsive/responsive";
import { getVariants } from "@utilities/responsive/responsive";
import { forwardRef } from "react";

export type IconProps = React.SVGProps<SVGSVGElement> & {
	asChild?: boolean;
	size?: ResponsiveValue<"small" | "medium" | "large">;
};

export const SIZES = {
	sm: {
		small: "sm:h-4 sm:w-4",
		medium: "sm:h-6 sm:w-6",
		large: "sm:h-8 sm:w-8",
	},
	md: {
		small: "md:h-4 md:w-4",
		medium: "md:h-6 md:w-6",
		large: "md:h-8 md:w-8",
	},
	lg: {
		small: "lg:h-4 lg:w-4",
		medium: "lg:h-6 lg:w-6",
		large: "lg:h-8 lg:w-8",
	},
	xl: {
		small: "xl:h-4 xl:w-4",
		medium: "xl:h-6 xl:w-6",
		large: "xl:h-8 xl:w-8",
	},
};

const iconStyles = getVariants({
	base: "fill-current text-current",
	variants: {
		size: {
			small: "h-4 w-4",
			medium: "h-6 w-6",
			large: "h-8 w-8",
		},
	},
});

/**
 * A flexible icon component that serves as a wrapper for SVG icons.
 * Must be used with asChild={true} to render the actual icon component.
 *
 * @example
 * // Correct usage
 * <Icon asChild size="medium">
 *   <HomeIcon />
 * </Icon>
 *
 * @example
 * // With different sizes
 * <Icon asChild size="small">
 *   <UserIcon />
 * </Icon>
 *
 * @example
 * // With custom className
 * <Icon asChild className="text-blue-500">
 *   <SettingsIcon />
 * </Icon>
 *
 * @param {boolean} [props.asChild] - Should always be true when using this component
 * @param {ResponsiveValue<"small" | "medium" | "large">} [props.size="medium"] - The size of the icon
 * @param {string} [props.className] - Additional CSS classes to apply
 */
export const Icon = forwardRef<SVGSVGElement, IconProps>(
	({ className, size = "medium", asChild, ...props }, ref) => {
		const Comp = asChild ? Slot : "svg";
		return (
			<Comp ref={ref} className={iconStyles({ size, className })} {...props} />
		);
	},
);
