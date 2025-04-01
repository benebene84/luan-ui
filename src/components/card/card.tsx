import { createContext, forwardRef, useContext } from "react";
import {
	type ResponsiveValue,
	getVariants,
} from "../../utilities/get-variants/get-variants";
import { Slot } from "../../utilities/slot/slot";

// Card context

type CardContextValue = Required<Pick<CardProps, "size">>;

const CardContext = createContext<CardContextValue | undefined>(undefined);

const useCardContext = () => {
	const context = useContext(CardContext);
	if (!context) {
		throw new Error("Card components must be used within a Card");
	}
	return context;
};

// Card component

export type CardProps = React.HTMLAttributes<HTMLDivElement> & {
	size?: ResponsiveValue<"small" | "medium" | "large">;
	asChild?: boolean;
};

export const CARD_SIZES = {
	sm: {
		small: "sm:gap-2 sm:py-2",
		medium: "sm:gap-4 sm:py-4",
		large: "sm:gap-6 sm:py-6",
	},
	md: {
		small: "md:gap-2 md:py-2",
		medium: "md:gap-4 md:py-4",
		large: "md:gap-6 md:py-6",
	},
	lg: {
		small: "lg:gap-2 lg:py-2",
		medium: "lg:gap-4 lg:py-4",
		large: "lg:gap-6 lg:py-6",
	},
	xl: {
		small: "xl:gap-2 xl:py-2",
		medium: "xl:gap-4 xl:py-4",
		large: "xl:gap-6 xl:py-6",
	},
};

const cardStyles = getVariants({
	base: "flex flex-col rounded-lg border border-gray-200 bg-white shadow-md",
	variants: {
		size: {
			small: "gap-2 py-2",
			medium: "gap-4 py-4",
			large: "gap-6 py-6",
		},
	},
});

export const Card = forwardRef<HTMLDivElement, CardProps>(
	({ className, size = "medium", asChild, ...props }, ref) => {
		const Component = asChild ? Slot : "div";
		return (
			<CardContext.Provider value={{ size }}>
				<Component
					ref={ref}
					className={cardStyles({ className, size })}
					{...props}
				/>
			</CardContext.Provider>
		);
	},
);

Card.displayName = "Card";

// Card header component

export type CardHeaderProps = React.HTMLAttributes<HTMLDivElement> & {
	size?: ResponsiveValue<"small" | "medium" | "large">;
	asChild?: boolean;
};

export const CARD_HEADER_SIZES = {
	sm: {
		small: "sm:px-2 sm:pb-2",
		medium: "sm:px-4 sm:pb-4",
		large: "sm:px-6 sm:pb-6",
	},
	md: {
		small: "md:px-2 md:pb-2",
		medium: "md:px-4 md:pb-4",
		large: "md:px-6 md:pb-6",
	},
	lg: {
		small: "lg:px-2 lg:pb-2",
		medium: "lg:px-4 lg:pb-4",
		large: "lg:px-6 lg:pb-6",
	},
	xl: {
		small: "xl:px-2 xl:pb-2",
		medium: "xl:px-4 xl:pb-4",
		large: "xl:px-6 xl:pb-6",
	},
};

const cardHeaderStyles = getVariants({
	base: "flex items-center justify-between border-gray-200 border-b",
	variants: {
		size: {
			small: "px-2 pb-2",
			medium: "px-4 pb-4",
			large: "px-6 pb-6",
		},
	},
});

export const CardHeader = forwardRef<
	HTMLDivElement,
	Omit<CardHeaderProps, "size">
>(({ className, asChild, ...props }, ref) => {
	const { size } = useCardContext();
	const Component = asChild ? Slot : "div";
	return (
		<Component
			ref={ref}
			className={cardHeaderStyles({ className, size })}
			{...props}
		/>
	);
});

CardHeader.displayName = "CardHeader";

// Card content component

export type CardContentProps = React.HTMLAttributes<HTMLDivElement> & {
	size?: ResponsiveValue<"small" | "medium" | "large">;
	asChild?: boolean;
};

export const CARD_CONTENT_SIZES = {
	sm: {
		small: "sm:gap-2 sm:px-2",
		medium: "sm:gap-4 sm:px-4",
		large: "sm:gap-6 sm:px-6",
	},
	md: {
		small: "md:gap-2 md:px-2",
		medium: "md:gap-4 md:px-4",
		large: "md:gap-6 md:px-6",
	},
	lg: {
		small: "lg:gap-2 lg:px-2",
		medium: "lg:gap-4 lg:px-4",
		large: "lg:gap-6 lg:px-6",
	},
	xl: {
		small: "xl:gap-2 xl:px-2",
		medium: "xl:gap-4 xl:px-4",
		large: "xl:gap-6 xl:px-6",
	},
};

const cardContentStyles = getVariants({
	base: "flex flex-col",
	variants: {
		size: {
			small: "gap-2 px-2",
			medium: "gap-4 px-4",
			large: "gap-6 px-6",
		},
	},
});

export const CardContent = forwardRef<
	HTMLDivElement,
	Omit<CardContentProps, "size">
>(({ className, asChild, ...props }, ref) => {
	const { size } = useCardContext();
	const Component = asChild ? Slot : "div";
	return (
		<Component
			ref={ref}
			className={cardContentStyles({ className, size })}
			{...props}
		/>
	);
});

CardContent.displayName = "CardContent";

// Card footer component

export type CardFooterProps = React.HTMLAttributes<HTMLDivElement> & {
	size?: ResponsiveValue<"small" | "medium" | "large">;
	asChild?: boolean;
};

export const CARD_FOOTER_SIZES = {
	sm: {
		small: "sm:px-2 sm:pt-2",
		medium: "sm:px-4 sm:pt-4",
		large: "sm:px-6 sm:pt-6",
	},
	md: {
		small: "md:px-2 md:pt-2",
		medium: "md:px-4 md:pt-4",
		large: "lg:px-6 lg:pt-6",
	},
	lg: {
		small: "lg:px-2 lg:pt-2",
		medium: "lg:px-4 lg:pt-4",
		large: "lg:px-6 lg:pt-6",
	},
	xl: {
		small: "xl:px-2 xl:pt-2",
		medium: "xl:px-4 xl:pt-4",
		large: "xl:px-6 xl:pt-6",
	},
};

const cardFooterStyles = getVariants({
	base: "flex items-center justify-between border-gray-200 border-t",
	variants: {
		size: {
			small: "px-2 pt-2",
			medium: "px-4 pt-4",
			large: "px-6 pt-6",
		},
	},
});

export const CardFooter = forwardRef<
	HTMLDivElement,
	Omit<CardFooterProps, "size">
>(({ className, asChild, ...props }, ref) => {
	const { size } = useCardContext();
	const Component = asChild ? Slot : "div";
	return (
		<Component
			ref={ref}
			className={cardFooterStyles({ className, size })}
			{...props}
		/>
	);
});

CardFooter.displayName = "CardFooter";
