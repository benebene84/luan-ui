import { useFormContext } from "@components/form-field/form-field-context";
import { cn } from "@utilities/cn/cn";
import { forwardRef } from "react";

export type LabelProps = React.LabelHTMLAttributes<HTMLLabelElement> & {
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
const Label = forwardRef<HTMLLabelElement, LabelProps>(
	({ className, required: initialRequired, children, ...props }, ref) => {
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
	},
);

Label.displayName = "Label";

export { Label };
