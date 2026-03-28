import { Progress as ProgressPrimitive } from "@base-ui/react/progress";
import { cn } from "@utilities/cn/cn";
import type { ComponentProps } from "react";

export type ProgressProps = ComponentProps<typeof ProgressPrimitive.Root> & {
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

function Progress({
	className,
	value,
	showLabel = true,
	max = 100,
	ref,
	...props
}: ProgressProps) {
	return (
		<ProgressPrimitive.Root
			className="flex items-center gap-4"
			value={value}
			max={max}
			ref={ref}
			{...props}
		>
			<ProgressPrimitive.Track
				className={cn(
					"relative h-2 w-full overflow-hidden rounded-full bg-skeleton/80",
					className,
				)}
			>
				<ProgressPrimitive.Indicator className="h-full bg-primary/80 transition-all" />
			</ProgressPrimitive.Track>
			{showLabel && (
				<ProgressPrimitive.Value className="text-sm text-text-muted">
					{(_formattedValue: string | null, rawValue: number | null) =>
						`${rawValue}%`
					}
				</ProgressPrimitive.Value>
			)}
		</ProgressPrimitive.Root>
	);
}

export { Progress };
