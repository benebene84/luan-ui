import { useFormContext } from "@components/form-field/form-field-context";
import { cn } from "@utilities/cn/cn";
import type { ComponentProps } from "react";

export type LabelProps = ComponentProps<"label"> & {
	required?: boolean;
};

/**
 * A label component that can be used to label form fields.
 *
 * @example
 * ```tsx
 * <Label htmlFor="email">Email</Label>
 * <Input id="email" />
 * ```
 */
function Label({
	className,
	required: initialRequired,
	children,
	ref,
	...props
}: LabelProps) {
	const { required } = useFormContext({
		required: initialRequired,
	});
	return (
		// biome-ignore lint/a11y/noLabelWithoutControl: htmlFor is passed via props at runtime
		<label
			className={cn(
				"font-medium text-gray-900 text-md peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
				className,
			)}
			{...props}
			ref={ref}
		>
			{children}
			{required && <span>*</span>}
		</label>
	);
}

export { Label };
