import clsx from "clsx";
import { twMerge } from "tailwind-merge";

type Breakpoints = "initial" | "sm" | "md" | "lg" | "xl";
type BreakpointsMap<T> = Record<Breakpoints, T>;

export type ResponsiveValue<T> = T | Partial<BreakpointsMap<T>>;

type VariantValue = Record<string, string>;
type VariantConfig = Record<string, VariantValue>;

type StringBoolean = "true" | "false";
type BooleanVariant = Partial<Record<StringBoolean, string>>;

type VariantPropValue<T> = T extends BooleanVariant
	? ResponsiveValue<boolean> | undefined
	: T extends Record<string, unknown>
		? ResponsiveValue<keyof T>
		: never;

type VariantProps<T extends VariantConfig> = {
	[K in keyof T]: VariantPropValue<T[K]>;
} & {
	className?: string;
};

type ResponsiveClassesConfig<T extends VariantConfig> = {
	base: string;
	variants?: T;
	compoundVariants?: Partial<VariantProps<T>>[];
};

/**
 * Creates a function that generates classes based on variant configurations and responsive props
 *
 * @template T - Type extending VariantConfig (Record of variant names to their possible values and corresponding classes)
 *
 * @param config - Configuration object for variants
 * @param config.base - Base classes that are always applied
 * @param config.variants - Object containing variant definitions where each key is a variant name
 *                         and value is either a string of class names, an object mapping variant values to class names,
 *                         or an object with true/false keys for boolean variants
 * @param config.compoundVariants - Optional array of compound variants that apply additional classes
 *                                 when multiple variants have specific values
 *
 * @returns A function that accepts variant props and returns classes with twMerge
 *
 * @example
 * const getButtonVariants = getVariants({
 *   base: "px-4 py-2 rounded",
 *   variants: {
 *     intent: {
 *       primary: "bg-blue-500 text-white",
 *       secondary: "bg-gray-200 text-gray-800"
 *     },
 *     size: {
 *       sm: "text-sm",
 *       lg: "text-lg"
 *     },
 *     disabled: {
 *       true: "opacity-50 cursor-not-allowed"
 *     }
 *   }
 * });
 *
 * // Usage:
 * getButtonVariants({ intent: "primary", size: "lg", disabled: true })
 * // Or with responsive values:
 * getButtonVariants({ intent: { initial: "primary", md: "secondary" } })
 */
export const getVariants =
	<T extends VariantConfig>({
		base,
		variants,
		compoundVariants,
	}: ResponsiveClassesConfig<T>) =>
	({ className, ...props }: VariantProps<T>) => {
		const responsiveClasses = Object.entries(props)
			.flatMap(([key, propValue]) => {
				const variant = variants?.[key];
				const value =
					typeof propValue === "boolean" ? String(propValue) : propValue;

				// Handle undefined values
				if (!value) return;

				const variantValue = variant?.[value as keyof typeof variant];

				// Handle string values
				if (typeof variantValue === "string") {
					return variantValue;
				}

				// Handle responsive values
				return Object.entries(value as Partial<BreakpointsMap<T>>)
					.map(([breakpoint, value]) => {
						// If the breakpoint is initial, return the variant value without breakpoint prefix
						if (breakpoint === "initial") {
							return variants?.[key]?.[value as keyof typeof variant];
						}
						// Otherwise, return the variant value with the breakpoint prefix
						return variants?.[key]?.[value as keyof typeof variant]
							?.split(" ")
							.map((className) => `${breakpoint}:${className}`)
							.join(" ");
					})
					.join(" ");
			})
			.join(" ");

		const compoundClasses = compoundVariants
			?.map(({ className, ...compound }) => {
				if (
					Object.entries(compound).every(
						([key, value]) =>
							props[key] === String(value) || props[key] === value,
					)
				) {
					return className;
				}
				return undefined;
			})
			.filter(Boolean);

		return twMerge(clsx(base, responsiveClasses, compoundClasses, className));
	};
