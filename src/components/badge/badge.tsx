import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import type { ResponsiveValue } from "@utilities/responsive/responsive";
import { getVariants } from "@utilities/responsive/responsive";
import type { ComponentProps } from "react";

/**
 * Props for the Badge component
 * @interface BadgeProps
 * @extends {useRender.ComponentProps<"div">}
 */
export type BadgeProps = Omit<ComponentProps<"div">, "className"> &
	useRender.ComponentProps<"div"> & {
		/** The visual style variant of the badge */
		variant?: "primary" | "secondary" | "destructive" | "outline";
		/** The size of the badge, can be responsive */
		size?: ResponsiveValue<"small" | "medium" | "large">;
		/** Additional CSS classes to apply */
		className?: string;
	};

const badgeStyles = getVariants({
	base: "flex w-fit items-center justify-center rounded-full font-medium",
	variants: {
		variant: {
			primary: "bg-gray-700 text-white",
			secondary: "bg-gray-200 text-gray-700",
			destructive: "bg-red-500 text-white",
			outline: "border border-gray-700 bg-white text-gray-700",
		},
		size: {
			small: "gap-1 px-2 py-1 text-xs",
			medium: "gap-1 px-3 py-1 text-sm",
			large: "gap-2 px-4 py-2 text-lg",
		},
	},
});

/**
 * Badge component for displaying status, labels, or counts
 * @component
 * @example
 * ```tsx
 * <Badge variant="primary" size="medium">New</Badge>
 * ```
 *
 * @example
 * // With render prop to change the element
 * ```tsx
 * <Badge render={<a href="/link" />}>Link Badge</Badge>
 * ```
 */
function Badge({
	className,
	variant = "primary",
	size = "medium",
	render,
	...props
}: BadgeProps) {
	const defaultProps: useRender.ElementProps<"div"> = {
		className: badgeStyles({ className, variant, size }),
	};

	return useRender({
		defaultTagName: "div",
		render,
		props: mergeProps<"div">(defaultProps, props),
	});
}

export { Badge };
