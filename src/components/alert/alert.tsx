import { Slot } from "@components/slot/slot";
import type { ResponsiveValue } from "@utilities/responsive/responsive";
import { getVariants } from "@utilities/responsive/responsive";
import {
	type ComponentPropsWithoutRef,
	createContext,
	forwardRef,
	useContext,
} from "react";

type AlertContextType = {
	variant: "primary" | "secondary" | "error";
	size: ResponsiveValue<"small" | "medium">;
};

const AlertContext = createContext<AlertContextType | undefined>(undefined);

const useAlertContext = () => {
	const context = useContext(AlertContext);
	if (!context) {
		throw new Error("useAlertContext must be used within an Alert component");
	}
	return context;
};

type AlertProps = ComponentPropsWithoutRef<"div"> & {
	variant?: "primary" | "secondary" | "error";
	asChild?: boolean;
	size?: ResponsiveValue<"small" | "medium">;
};

const alertStyles = getVariants({
	base: "grid w-fit grid-cols-[0_1fr] items-start gap-1 rounded-md border border-transparent has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] [&>svg]:translate-y-1",
	variants: {
		variant: {
			primary: "bg-gray-700 text-white",
			secondary: "border-gray-700 text-gray-700",
			error: "bg-red-500 text-white",
		},
		size: {
			small: "px-2 py-1 has-[>svg]:gap-x-2",
			medium: "px-3 py-2 has-[>svg]:gap-x-3",
		},
	},
});

export const SIZES = {
	sm: {
		small: "sm:px-2 sm:py-1 sm:has-[>svg]:gap-x-2",
		medium: "sm:px-3 sm:py-2 sm:has-[>svg]:gap-x-3",
	},
	md: {
		small: "md:px-2 md:py-1 md:has-[>svg]:gap-x-2",
		medium: "md:px-3 md:py-2 md:has-[>svg]:gap-x-3",
	},
	lg: {
		small: "lg:px-2 lg:py-1 lg:has-[>svg]:gap-x-2",
		medium: "lg:px-3 lg:py-2 lg:has-[>svg]:gap-x-3",
	},
	xl: {
		small: "xl:px-2 xl:py-1 xl:has-[>svg]:gap-x-2",
		medium: "xl:px-3 xl:py-2 xl:has-[>svg]:gap-x-3",
	},
};

const Alert = forwardRef<HTMLDivElement, AlertProps>(
	(
		{ variant = "primary", size = "medium", className, asChild, ...props },
		ref,
	) => {
		const Component = asChild ? Slot : "div";

		return (
			<AlertContext.Provider value={{ variant, size }}>
				<Component
					className={alertStyles({ variant, size, className })}
					{...props}
					ref={ref}
				/>
			</AlertContext.Provider>
		);
	},
);

Alert.displayName = "Alert";

type AlertTitleProps = ComponentPropsWithoutRef<"div"> & {
	asChild?: boolean;
};

const alertTitleStyles = getVariants({
	base: "col-start-2 font-bold",
	variants: {
		size: {
			small: "text-sm",
			medium: "text-base",
		},
	},
});

export const TITLE_SIZES = {
	sm: {
		small: "sm:text-sm",
		medium: "sm:text-base",
	},
	md: {
		small: "md:text-sm",
		medium: "md:text-base",
	},
	lg: {
		small: "lg:text-sm",
		medium: "lg:text-base",
	},
	xl: {
		small: "xl:text-sm",
		medium: "xl:text-base",
	},
};

const AlertTitle = forwardRef<HTMLDivElement, AlertTitleProps>(
	({ className, asChild, ...props }, ref) => {
		const { size } = useAlertContext();
		const Component = asChild ? Slot : "div";
		return (
			<Component
				ref={ref}
				{...props}
				className={alertTitleStyles({ size, className })}
			/>
		);
	},
);

AlertTitle.displayName = "AlertTitle";

type AlertDescriptionProps = ComponentPropsWithoutRef<"div"> & {
	asChild?: boolean;
};

const alertDescriptionStyles = getVariants({
	base: "col-start-2",
	variants: {
		size: {
			small: "text-xs",
			medium: "text-sm",
		},
	},
});

export const DESCRIPTION_SIZES = {
	sm: {
		small: "sm:text-xs",
		medium: "sm:text-sm",
	},
	md: {
		small: "md:text-xs",
		medium: "md:text-sm",
	},
	lg: {
		small: "lg:text-xs",
		medium: "lg:text-sm",
	},
	xl: {
		small: "xl:text-xs",
		medium: "xl:text-sm",
	},
};

const AlertDescription = forwardRef<HTMLDivElement, AlertDescriptionProps>(
	({ className, asChild, ...props }, ref) => {
		const { size } = useAlertContext();
		const Component = asChild ? Slot : "div";
		return (
			<Component
				ref={ref}
				{...props}
				className={alertDescriptionStyles({ size, className })}
			/>
		);
	},
);

AlertDescription.displayName = "AlertDescription";

export {
	Alert,
	AlertDescription,
	AlertTitle,
	type AlertDescriptionProps,
	type AlertProps,
	type AlertTitleProps,
};
