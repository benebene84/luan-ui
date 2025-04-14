import clsx from "clsx";
import { twMerge } from "tailwind-merge";

const defaultBreakpoints = ["sm", "md", "lg", "xl"];
type DefaultBreakpoints = (typeof defaultBreakpoints)[number];
type BreakpointsMap<B extends string, T> = Record<B, T> & { initial: T };

export type ResponsiveValue<B extends string = DefaultBreakpoints, T = string> =
	| T
	| (Partial<BreakpointsMap<B, T>> & { initial: T });

type VariantValue = Record<string, string>;
type VariantConfig = Record<string, VariantValue>;

type StringBoolean = "true" | "false";
type BooleanVariant = Partial<Record<StringBoolean, string>>;

type VariantPropValue<B extends string, T> = T extends BooleanVariant
	? ResponsiveValue<B, boolean> | undefined
	: T extends Record<string, unknown>
		? ResponsiveValue<B, keyof T>
		: never;

type VariantProps<B extends string, T extends VariantConfig> = {
	[K in keyof T]: VariantPropValue<B, T[K]>;
} & {
	className?: string;
};

type ResponsiveClassesConfig<
	B extends string = DefaultBreakpoints,
	T extends VariantConfig = VariantConfig,
> = {
	base: string;
	variants?: T;
	compoundVariants?: Partial<VariantProps<B, T>>[];
	breakpoints?: B[];
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
 * @param config.breakpoints - Optional array of breakpoint names to use for responsive values.
 *                           Defaults to ["sm", "md", "lg", "xl"].
 *                           The "initial" breakpoint is always required and automatically added.
 *
 * @returns A function that accepts variant props and returns classes with twMerge
 *
 * @example
 * // Using default breakpoints
 * const getButtonVariants = getVariants({
 *   base: "px-4 py-2 rounded",
 *   variants: {
 *     intent: {
 *       primary: "bg-blue-500 text-white",
 *       secondary: "bg-gray-200 text-gray-800"
 *     }
 *   }
 * });
 *
 * // Using custom breakpoints
 * const getCustomButtonVariants = getVariants({
 *   base: "px-4 py-2 rounded",
 *   variants: {
 *     intent: {
 *       primary: "bg-blue-500 text-white",
 *       secondary: "bg-gray-200 text-gray-800"
 *     }
 *   },
 *   breakpoints: ["mobile", "tablet", "desktop"]
 * });
 *
 * // Usage:
 * getButtonVariants({ intent: "primary" })
 * // Or with responsive values:
 * getButtonVariants({ intent: { initial: "primary", md: "secondary" } })
 * // Or with custom breakpoints:
 * getCustomButtonVariants({ intent: { initial: "primary", tablet: "secondary" } })
 */
export const getVariants = <T extends VariantConfig>({
	base,
	variants,
	compoundVariants,
	breakpoints = defaultBreakpoints,
}: ResponsiveClassesConfig<string, T>) => {
	type Breakpoint = (typeof breakpoints)[number];
	return ({ className, ...props }: VariantProps<Breakpoint, T>) => {
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
				return Object.entries(value as Partial<BreakpointsMap<Breakpoint, T>>)
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
};
