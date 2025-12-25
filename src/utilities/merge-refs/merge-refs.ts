import type { Ref, RefCallback, RefObject } from "react";

export const mergeRefs = <T>(
	...refs: (Ref<T> | undefined)[]
): RefCallback<T> => {
	return (node: T) => {
		for (const ref of refs) {
			if (!ref) continue;
			if (typeof ref === "function") ref(node);
			else if (ref && typeof ref === "object" && "current" in ref)
				(ref as RefObject<T | null>).current = node;
		}
	};
};
