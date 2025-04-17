export const handleKeyboardNavigation = (
	e: KeyboardEvent,
	refs: React.RefObject<Map<number, HTMLButtonElement>>,
	totalPages: number,
) => {
	if (!refs.current.size) return;

	const currentFocusedIndex = Array.from(refs.current.entries()).find(
		([_, el]) => el === document.activeElement,
	)?.[0];

	if (currentFocusedIndex === undefined) return;

	let nextIndex: number | undefined;

	switch (e.key) {
		case "ArrowLeft":
		case "ArrowUp": {
			if (currentFocusedIndex === 0) {
				nextIndex = totalPages;
			} else if (currentFocusedIndex === totalPages + 1) {
				nextIndex = totalPages;
			} else if (currentFocusedIndex === 1) {
				nextIndex = 0;
			} else {
				// Find the next available index to the left
				for (let i = currentFocusedIndex - 1; i >= 0; i--) {
					if (refs.current.has(i)) {
						nextIndex = i;
						break;
					}
				}
				// If no index found to the left, try wrapping to the end
				if (nextIndex === undefined) {
					nextIndex = 0;
				}
			}
			break;
		}
		case "ArrowRight":
		case "ArrowDown": {
			if (currentFocusedIndex === 0) {
				nextIndex = 1;
			} else if (currentFocusedIndex === totalPages) {
				nextIndex = totalPages + 1;
			} else {
				// Find the next available index to the right
				for (let i = currentFocusedIndex + 1; i <= totalPages + 1; i++) {
					if (refs.current.has(i)) {
						nextIndex = i;
						break;
					}
				}
				// If no index found to the right, try wrapping to the start
				if (nextIndex === undefined) {
					nextIndex = totalPages + 1;
				}
			}
			break;
		}
		case "Home":
			nextIndex = 1;
			break;
		case "End":
			nextIndex = totalPages;
			break;
	}

	if (nextIndex !== undefined && nextIndex !== currentFocusedIndex) {
		e.preventDefault();
		refs.current.get(nextIndex)?.focus();
	}
};
