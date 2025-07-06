import { Slot } from "@components/slot/slot";
import type { ResponsiveValue } from "@utilities/responsive/responsive";
import { getVariants } from "@utilities/responsive/responsive";
import type { ComponentProps } from "react";
import { forwardRef } from "react";

/**
 * Props for the Badge component
 * @interface BadgeProps
 * @extends {ComponentProps<"div">}
 */
export type BadgeProps = ComponentProps<"div"> & {
	/** Whether to render the badge as a child component */
	asChild?: boolean;
	/** The visual style variant of the badge */
	variant?: "primary" | "secondary" | "destructive" | "outline";
	/** The size of the badge, can be responsive */
	size?: ResponsiveValue<"small" | "medium" | "large">;
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
 */
const Badge = forwardRef<HTMLDivElement, BadgeProps>(
	(
		{ className, asChild, variant = "primary", size = "medium", ...props },
		ref,
	) => {
		const Component = asChild ? Slot : "div";
		return (
			<Component
				className={badgeStyles({ className, variant, size })}
				ref={ref}
				{...props}
			/>
		);
	},
);

export { Badge };
