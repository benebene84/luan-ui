import { Slider as RadixSlider } from "radix-ui";
import {
	type ComponentPropsWithoutRef,
	type ComponentRef,
	forwardRef,
	useState,
} from "react";

import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@components/tooltip/tooltip";
import { cn } from "@utilities/cn/cn";

export type SliderProps = ComponentPropsWithoutRef<typeof RadixSlider.Root> & {
	showMinMax?: boolean;
};

const Slider = forwardRef<ComponentRef<typeof RadixSlider.Root>, SliderProps>(
	({ className, defaultValue, min, max, showMinMax = true, ...props }, ref) => {
		const [value, setValue] = useState<number[]>(defaultValue ?? []);

		return (
			<>
				<RadixSlider.Root
					ref={ref}
					value={value}
					onValueChange={setValue}
					className={cn(
						"relative flex w-full touch-none select-none items-center",
						className,
					)}
					{...props}
				>
					<RadixSlider.Track className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-gray-700/20 data-[disabled]:opacity-50">
						<RadixSlider.Range className="absolute h-full bg-gray-700" />
					</RadixSlider.Track>
					{value.map((value, index) => (
						// biome-ignore lint/suspicious/noArrayIndexKey: <only index is available>
						<Tooltip key={index} delayDuration={0}>
							<TooltipTrigger asChild>
								<RadixSlider.Thumb className="block h-4 w-4 rounded-full border border-gray-700 bg-white shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-700 data-[disabled]:pointer-events-none" />
							</TooltipTrigger>
							<TooltipContent>
								<p>{value}</p>
							</TooltipContent>
						</Tooltip>
					))}
				</RadixSlider.Root>
				{showMinMax && (
					<div className="mt-2 flex w-full flex-row justify-between">
						<p>{min}</p>
						<p>{max}</p>
					</div>
				)}
			</>
		);
	},
);
Slider.displayName = RadixSlider.Root.displayName;

export { Slider };
