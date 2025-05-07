import { cn } from "@utilities/cn/cn";
import {
	type ComponentPropsWithoutRef,
	type ComponentRef,
	forwardRef,
} from "react";

/**
 * Skeleton
 */

const Skeleton = forwardRef<
	ComponentRef<"div">,
	ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => (
	<div
		ref={ref}
		className={cn("animate-pulse rounded-md bg-gray-200", className)}
		{...props}
	/>
));
Skeleton.displayName = "Skeleton";

export { Skeleton };
