import { cn } from "@utilities/cn/cn";
import {
	createRcv,
	type BreakpointsMap as RcvBreakpointsMap,
	type ResponsiveValue as RcvResponsiveValue,
} from "responsive-class-variants";

export const breakpoints = ["sm", "md", "lg", "xl"] as const;

export const getVariants = createRcv(breakpoints, (classes) => cn(classes));

export type Breakpoints = (typeof breakpoints)[number];

export type ResponsiveValue<T> = RcvResponsiveValue<T, Breakpoints>;

export type BreakpointsMap<V> = RcvBreakpointsMap<V, Breakpoints>;

const isSingularValue = <A>(value: ResponsiveValue<A>): value is A =>
	!isBreakpointsMap(value);

const isBreakpointsMap = <A>(
	value: ResponsiveValue<A>,
): value is BreakpointsMap<A> =>
	typeof value === "object" && value != null && !Array.isArray(value);

/**
 * Maps a ResponsiveValue to a new ResponsiveValue using the provided mapper function. Singular values are passed through as is.
 *
 * @template V The type of the original value
 * @template T The type of the mapped value
 * @param {ResponsiveValue<V>} value - The original ResponsiveValue to be mapped
 * @param {function(V): T} mapper - A function that maps a ResponsiveValue to a new ResponsiveValue
 * @returns {ResponsiveValue<T>} A new ResponsiveValue with the mapped values
 *
 *
 * @example
 * const sizes = {
 *  initial: 'md',
 *  sm: 'lg',
 * }
 *
 * const output = mapResponsiveValue(sizes, size => {
 *	switch (size) {
 *		case 'initial':
 *		return 'sm';
 *		case 'sm':
 *			return 'md';
 *		}
 *	});
 *
 * // console.log(output)
 * {
 *	initial: 'sm',
 *	sm: 'md',
 * }
 */
export const mapResponsiveValue = <V, T>(
	value: ResponsiveValue<V>,
	mapper: (value: V) => T,
): ResponsiveValue<T> =>
	isSingularValue(value)
		? mapper(value)
		: (Object.fromEntries(
				Object.entries(value).map(([breakpoint, value]) => [
					breakpoint,
					mapper(value),
				]),
			) as BreakpointsMap<T>);
