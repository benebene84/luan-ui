import { Checkbox as CheckboxPrimitive } from "@base-ui/react/checkbox";
import { useFormContext } from "@components/form-field/form-field-context";
import { Icon } from "@components/icon/icon";
import { CheckIcon } from "@radix-ui/react-icons";
import {
	getVariants,
	mapResponsiveValue,
	type ResponsiveValue,
} from "@utilities/responsive/responsive";
import {
	type ComponentPropsWithoutRef,
	type ComponentRef,
	forwardRef,
} from "react";

export type CheckboxProps = Omit<
	ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>,
	"className"
> & {
	size?: ResponsiveValue<"small" | "medium" | "large">;
	className?: string;
};

export const SIZES = {
	sm: {
		small: "sm:h-4 sm:w-4",
		medium: "sm:h-5 sm:w-5",
		large: "sm:h-6 sm:w-6",
	},
	md: {
		small: "md:h-4 md:w-4",
		medium: "md:h-5 md:w-5",
		large: "md:h-6 md:w-6",
	},
	lg: {
		small: "lg:h-4 lg:w-4",
		medium: "lg:h-5 lg:w-5",
		large: "lg:h-6 lg:w-6",
	},
	xl: {
		small: "xl:h-4 xl:w-4",
		medium: "xl:h-5 xl:w-5",
		large: "xl:h-6 xl:w-6",
	},
};

const checkboxStyles = getVariants({
	base: "peer flex h-4 w-4 items-center justify-center rounded-sm border border-gray-700 shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-700 data-[checked]:bg-gray-700 data-[checked]:text-gray-100",
	variants: {
		disabled: {
			true: "cursor-not-allowed bg-gray-400 opacity-50",
		},
		size: {
			small: "h-4 w-4",
			medium: "h-5 w-5",
			large: "h-6 w-6",
		},
	},
});

const iconSizeMap = {
	small: "small",
	medium: "medium",
	large: "medium",
} as const;

/**
 * A checkbox component built on top of Base UI's checkbox primitive.
 *
 * @example
 * ```tsx
 * <Checkbox id="checkbox" onCheckedChange={(checked) => console.log(checked)} />
 * ```
 */
export const Checkbox = forwardRef<
	ComponentRef<typeof CheckboxPrimitive.Root>,
	CheckboxProps
>(
	(
		{
			className,
			disabled: initialDisabled,
			required: initialRequired,
			size = "medium",
			...props
		},
		ref,
	) => {
		const iconSize = mapResponsiveValue(size, (size) => iconSizeMap[size]);
		const { disabled, required } = useFormContext({
			disabled: initialDisabled,
			required: initialRequired,
		});
		return (
			<CheckboxPrimitive.Root
				className={checkboxStyles({ disabled, size, className })}
				ref={ref}
				disabled={disabled}
				required={required}
				{...props}
			>
				<CheckboxPrimitive.Indicator>
					<Icon render={<CheckIcon />} size={iconSize} />
				</CheckboxPrimitive.Indicator>
			</CheckboxPrimitive.Root>
		);
	},
);
Checkbox.displayName = "Checkbox";
