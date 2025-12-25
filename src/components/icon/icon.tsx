import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import type { ResponsiveValue } from "@utilities/responsive/responsive";
import { getVariants } from "@utilities/responsive/responsive";

export type IconProps = useRender.ComponentProps<"svg"> & {
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
 * Use the render prop to render the actual icon component.
 *
 * @example
 * // Basic usage with render prop
 * <Icon render={<HomeIcon />} size="medium" />
 *
 * @example
 * // With different sizes
 * <Icon render={<UserIcon />} size="small" />
 *
 * @example
 * // With custom className
 * <Icon render={<SettingsIcon />} className="text-blue-500" />
 *
 * @param {React.ReactElement | ((props, state) => React.ReactElement)} [props.render] - The icon element or render function
 * @param {ResponsiveValue<"small" | "medium" | "large">} [props.size="medium"] - The size of the icon
 * @param {string} [props.className] - Additional CSS classes to apply
 */
export function Icon({
	className,
	size = "medium",
	render,
	ref,
	...props
}: IconProps) {
	const defaultProps: useRender.ElementProps<"svg"> = {
		className: iconStyles({ size, className }),
	};

	const element = useRender({
		defaultTagName: "svg",
		render,
		ref,
		props: mergeProps<"svg">(defaultProps, props),
	});

	return element;
}
