import { cn } from "@utilities/cn/cn";
import { createRcv } from "responsive-class-variants";

export const getVariants = createRcv(["sm", "md", "lg", "xl"], (classes) =>
	cn(classes),
);
