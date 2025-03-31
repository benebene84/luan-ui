import { type ComponentRef, forwardRef } from "react";
import {
	type ResponsiveValue,
	getVariants,
} from "../../utilities/get-variants/get-variants";
import { Slot } from "../../utilities/slot/slot";

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

export const Icon = forwardRef<SVGSVGElement, IconProps>(
	({ className, size = "medium", asChild, ...props }, ref) => {
		const Comp = asChild ? Slot : "svg";
		return (
			<Comp ref={ref} className={iconStyles({ size, className })} {...props} />
		);
	},
);
