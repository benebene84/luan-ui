import { useFormContext } from "@components/form-field/form-field-context";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@components/tooltip/tooltip";
import { cn } from "@utilities/cn/cn";
import { Slider as RadixSlider } from "radix-ui";
import {
	type ComponentPropsWithoutRef,
	type ComponentRef,
	forwardRef,
	useState,
} from "react";

export type SliderProps = ComponentPropsWithoutRef<typeof RadixSlider.Root> & {
	/**
	 * Whether to show the minimum and maximum values below the slider
	 * @default true
	 */
	showMinMax?: boolean;
};

/**
 * A customizable slider component built on top of Radix UI's slider primitive.
 *
 * @example
 * ```tsx
 * <Slider
 *   min={0}
 *   max={100}
 *   defaultValue={[50]}
 *   showMinMax={true}
 * />
 * ```
 *
 * @param {Object} props - The props for the Slider component
 * @param {number[]} [props.defaultValue] - The initial value of the slider
 * @param {number} [props.min=0] - The minimum value of the slider
 * @param {number} [props.max=100] - The maximum value of the slider
 * @param {boolean} [props.showMinMax=true] - Whether to show min/max values below the slider
 * @param {string} [props.className] - Additional CSS classes to apply to the slider
 * @param {React.Ref<ComponentRef<typeof RadixSlider.Root>>} ref - Forwarded ref for the slider root element
 * @returns {JSX.Element} A slider component with optional tooltips and min/max display
 */
const Slider = forwardRef<ComponentRef<typeof RadixSlider.Root>, SliderProps>(
	(
		{
			className,
			defaultValue,
			min,
			max,
			showMinMax = true,
			disabled: initialDisabled,
			...props
		},
		ref,
	) => {
		const [value, setValue] = useState<number[]>(defaultValue ?? []);
		const { disabled } = useFormContext({
			disabled: initialDisabled,
		});

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
					disabled={disabled}
					{...props}
				>
					<RadixSlider.Track className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-gray-700/20 data-[disabled]:opacity-50">
						<RadixSlider.Range className="absolute h-full bg-gray-700" />
					</RadixSlider.Track>
					{value.map((thumbValue, index) => (
						// biome-ignore lint/suspicious/noArrayIndexKey: <only index is available>
						<Tooltip key={index} delayDuration={0}>
							<TooltipTrigger asChild>
								<RadixSlider.Thumb className="block h-4 w-4 rounded-full border border-gray-700 bg-white shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-700 data-[disabled]:pointer-events-none" />
							</TooltipTrigger>
							<TooltipContent>
								<p>{thumbValue}</p>
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
