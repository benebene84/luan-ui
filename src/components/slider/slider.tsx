import { Slider as SliderPrimitive } from "@base-ui/react/slider";
import { useFormContext } from "@components/form-field/form-field-context";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@components/tooltip/tooltip";
import { cn } from "@utilities/cn/cn";
import { type ComponentPropsWithoutRef, forwardRef, useState } from "react";

export type SliderProps = ComponentPropsWithoutRef<
	typeof SliderPrimitive.Root
> & {
	/**
	 * Whether to show the minimum and maximum values below the slider
	 * @default true
	 */
	showMinMax?: boolean;
};

/**
 * A customizable slider component built on top of Base UI's slider primitive.
 *
 * @example
 * ```tsx
 * <Slider
 *   min={0}
 *   max={100}
 *   defaultValue={50}
 *   showMinMax={true}
 * />
 * ```
 *
 * @param {Object} props - The props for the Slider component
 * @param {number | number[]} [props.defaultValue] - The initial value of the slider
 * @param {number} [props.min=0] - The minimum value of the slider
 * @param {number} [props.max=100] - The maximum value of the slider
 * @param {boolean} [props.showMinMax=true] - Whether to show min/max values below the slider
 * @param {string} [props.className] - Additional CSS classes to apply to the slider
 * @returns {JSX.Element} A slider component with optional tooltips and min/max display
 */
const Slider = forwardRef<HTMLDivElement, SliderProps>(
	(
		{
			className,
			defaultValue,
			min = 0,
			max = 100,
			showMinMax = true,
			disabled: initialDisabled,
			onValueChange,
			...props
		},
		ref,
	) => {
		const normalizedDefault = Array.isArray(defaultValue)
			? defaultValue
			: defaultValue !== undefined
				? [defaultValue]
				: [0];

		const [value, setValue] = useState<number[]>(normalizedDefault);
		const { disabled } = useFormContext({
			disabled: initialDisabled,
		});

		const handleValueChange = (
			newValue: number | readonly number[],
			event: SliderPrimitive.Root.ChangeEventDetails,
		) => {
			const normalizedValue = Array.isArray(newValue)
				? [...newValue]
				: [newValue];
			setValue(normalizedValue);
			onValueChange?.(newValue, event);
		};

		return (
			<>
				<SliderPrimitive.Root
					ref={ref}
					value={value}
					onValueChange={handleValueChange}
					className={cn(
						"relative flex w-full touch-none select-none flex-col items-center",
						className,
					)}
					disabled={disabled}
					min={min}
					max={max}
					{...props}
				>
					<SliderPrimitive.Control className="flex w-full items-center">
						<SliderPrimitive.Track className="relative h-1.5 w-full grow rounded-full bg-gray-700/20 data-disabled:opacity-50">
							<SliderPrimitive.Indicator className="absolute h-full bg-gray-700" />
							{value.map((thumbValue, index) => (
								// biome-ignore lint/suspicious/noArrayIndexKey: index is the only stable identifier for thumbs
								<Tooltip key={index} delayDuration={0}>
									<TooltipTrigger
										render={
											<SliderPrimitive.Thumb
												index={index}
												className="block h-4 w-4 rounded-full border border-gray-700 bg-white shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-700 data-disabled:pointer-events-none"
											/>
										}
									/>
									<TooltipContent>
										<p>{thumbValue}</p>
									</TooltipContent>
								</Tooltip>
							))}
						</SliderPrimitive.Track>
					</SliderPrimitive.Control>
				</SliderPrimitive.Root>
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
Slider.displayName = "Slider";

export { Slider };
