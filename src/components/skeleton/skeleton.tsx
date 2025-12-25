import { cn } from "@utilities/cn/cn";
import type { ComponentProps } from "react";

/**
 * Skeleton
 */

export type SkeletonProps = ComponentProps<"div">;

function Skeleton({ className, ref, ...props }: SkeletonProps) {
	return (
		<div
			ref={ref}
			className={cn("animate-pulse rounded-md bg-gray-200", className)}
			{...props}
		/>
	);
}

export { Skeleton };
