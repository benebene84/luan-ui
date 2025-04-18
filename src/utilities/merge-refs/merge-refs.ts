import type { RefObject } from "react";

export const mergeRefs = <T>(
	...refs: (RefObject<T> | ((node: T) => void) | null)[]
) => {
	return (node: T) => {
		for (const ref of refs) {
			if (!ref) continue;
			if (typeof ref === "function") ref(node);
			else if (ref) ref.current = node;
		}
	};
};
