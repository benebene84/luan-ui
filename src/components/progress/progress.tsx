import { cn } from "@utilities/cn/cn";
import { Progress as ProgressPrimitive } from "radix-ui";
import {
	type ComponentPropsWithoutRef,
	type ComponentRef,
	forwardRef,
} from "react";

export type ProgressProps = ComponentPropsWithoutRef<
	typeof ProgressPrimitive.Root
> & {
	showLabel?: boolean;
};

/**
 * A progress bar component that displays a progress indicator and a label.
 *
 * @param {Object} props - The component props.
 * @param {string} props.className - The class name for the component.
 * @param {number} props.value - The value of the progress bar.
 * @param {boolean} props.showLabel - Whether to show the label.
 */

const Progress = forwardRef<
	ComponentRef<typeof ProgressPrimitive.Root>,
	ProgressProps
>(({ className, value, showLabel = true, max = 100, ...props }, ref) => (
	<div className="flex items-center gap-4">
		<ProgressPrimitive.Root
			className={cn(
				"relative h-2 w-full overflow-hidden rounded-full bg-gray-200/80",
				className,
			)}
			max={max}
			{...props}
			ref={ref}
		>
			<ProgressPrimitive.Indicator
				className="h-full w-full flex-1 bg-gray-700/80 transition-all"
				style={{
					transform: `translateX(-${100 - ((value || 0) / max) * 100}%)`,
				}}
			/>
		</ProgressPrimitive.Root>
		{showLabel && <div className="text-gray-500 text-sm">{value}%</div>}
	</div>
));
Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };
