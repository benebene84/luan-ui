import clsx from "clsx";
import { twMerge } from "tailwind-merge";

type Breakpoints = "initial" | "sm" | "md" | "lg" | "xl";
type BreakpointsMap<T> = Record<Breakpoints, T>;

export type ResponsiveValue<T> = T | Partial<BreakpointsMap<T>>;

type VariantConfig = Record<string, Record<string, string>>;

type CompoundVariant<T> = {
	[K in keyof T]?: keyof T[K];
} & { className: string };

type ResponsiveClassesConfig<T> = {
	base: string;
	variants: T;
	compoundVariants?: CompoundVariant<T>[];
};

type VariantProps<T> = {
	[K in keyof T]: ResponsiveValue<keyof T[K]>;
} & {
	className?: string | string[];
};

/**
 * Creates a function that generates classes based on variant configurations and responsive props
 *
 * @template T - Type extending VariantConfig (Record of variant names to their possible values and corresponding classes)
 *
 * @param config - Configuration object for variants
 * @param config.base - Base classes that are always applied
 * @param config.variants - Object containing variant definitions where each key is a variant name
 *                         and value is either a string of class names or an object mapping variant values to class names
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
 *     }
 *   },
 *   compoundVariants: [
 *     {
 *       intent: "primary",
 *       size: "lg",
 *       className: "font-bold"
 *     }
 *   ]
 * });
 *
 * // Usage:
 * getButtonVariants({ intent: "primary", size: "lg" })
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
			.flatMap(([key, value]) => {
				const variant = variants[key];

				const variantValue = variant?.[value as keyof typeof variant];

				if (typeof variantValue === "string") {
					return variantValue;
				}

				return Object.entries(value as Partial<BreakpointsMap<T>>)
					.map(([breakpoint, value]) => {
						if (breakpoint === "initial") {
							return variants?.[key]?.[value as keyof typeof variant];
						}
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
					Object.entries(compound).every(([key, value]) => props[key] === value)
				) {
					return className;
				}
				return undefined;
			})
			.filter(Boolean);

		return twMerge(clsx(base, responsiveClasses, compoundClasses, className));
	};
