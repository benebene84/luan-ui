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

type InferVariantProps<T> = {
	[K in keyof T]: ResponsiveValue<keyof T[K]>;
} & {
	className?: string;
};

export const getVariants =
	<T extends VariantConfig>({
		base,
		variants,
		compoundVariants,
	}: ResponsiveClassesConfig<T>) =>
	({ className, ...props }: InferVariantProps<T>) => {
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
