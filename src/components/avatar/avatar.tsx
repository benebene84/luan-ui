import { cn } from "@utilities/cn/cn";
import { Avatar as AvatarPrimitive } from "radix-ui";
import { forwardRef } from "react";
import type { ComponentPropsWithoutRef } from "react";
import type { ComponentRef } from "react";

const Avatar = forwardRef<
	ComponentRef<typeof AvatarPrimitive.Root>,
	ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>
>(({ className, ...props }, ref) => (
	<AvatarPrimitive.Root
		ref={ref}
		className={cn(
			"relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full border-2 border-white",
			className,
		)}
		{...props}
	/>
));

Avatar.displayName = AvatarPrimitive.Root.displayName;

const AvatarImage = forwardRef<
	ComponentRef<typeof AvatarPrimitive.Image>,
	ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
	<AvatarPrimitive.Image
		ref={ref}
		className={cn("absolute h-full w-full object-cover", className)}
		{...props}
	/>
));

AvatarImage.displayName = AvatarPrimitive.Image.displayName;

const AvatarFallback = forwardRef<
	ComponentRef<typeof AvatarPrimitive.Fallback>,
	ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
	<AvatarPrimitive.Fallback
		ref={ref}
		className={cn(
			"flex h-full w-full items-center justify-center rounded-full border border-white bg-gray-700 text-white",
			className,
		)}
		{...props}
	/>
));

AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;

export { Avatar, AvatarFallback, AvatarImage };
