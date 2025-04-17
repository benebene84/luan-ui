import clsx from "clsx";
import {
	type PropsWithChildren,
	createContext,
	forwardRef,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useRef,
	useState,
} from "react";
import { getTruncatedElements } from "../../utilities/pagination/get-truncated-elements";
import { handleKeyboardNavigation } from "../../utilities/pagination/keyboard-navigation";
import { Slot } from "../../utilities/slot/slot";

type PaginationContextValue = {
	page: number;
	totalPages: number;
	hasNextPage: boolean;
	hasPreviousPage: boolean;
	setPage: (page: number) => void;
	registerRef: (index: number, element: HTMLButtonElement | null) => void;
};

const PaginationContext = createContext<PaginationContextValue | undefined>(
	undefined,
);

const usePaginationContext = () => {
	const context = useContext(PaginationContext);
	if (!context) {
		throw new Error("Pagination components must be used within a Pagination");
	}
	return context;
};

export type PaginationProps = {
	children?: React.ReactNode;
	page: number;
	totalPages: number;
	onPageChange: (page: number) => void;
	asChild?: boolean;
} & React.HTMLAttributes<HTMLElement>;

const Pagination = forwardRef<HTMLElement, PaginationProps>(
	(
		{
			children,
			page: initialPage,
			totalPages: initialTotalPages,
			onPageChange,
			className,
			asChild,
			...props
		},
		ref,
	) => {
		const [page, setPage] = useState(initialPage);
		const [totalPages, setTotalPages] = useState(initialTotalPages);
		const [hasNextPage, setHasNextPage] = useState(page < totalPages);
		const [hasPreviousPage, setHasPreviousPage] = useState(page > 1);

		const refs = useRef(new Map<number, HTMLButtonElement>());

		const handleKeyDown = useCallback(
			(e: KeyboardEvent) =>
				handleKeyboardNavigation(e, { current: refs.current }, totalPages),
			[totalPages],
		);

		const registerRefWrapper = useCallback(
			(index: number, element: HTMLButtonElement | null) => {
				if (element) {
					refs.current.set(index, element);
				} else {
					refs.current.delete(index);
				}
			},
			[],
		);

		useEffect(() => {
			document.addEventListener("keydown", handleKeyDown);
			return () => {
				document.removeEventListener("keydown", handleKeyDown);
			};
		}, [handleKeyDown]);

		useEffect(() => {
			setHasNextPage(page < totalPages);
			setHasPreviousPage(page > 1);
		}, [page, totalPages]);

		useEffect(() => {
			setPage(initialPage);
			setTotalPages(initialTotalPages);
		}, [initialPage, initialTotalPages]);

		useEffect(() => {
			if (onPageChange) {
				onPageChange(page);
			}
		}, [page, onPageChange]);

		const memoContextValue = useMemo(
			() => ({
				page,
				setPage,
				totalPages,
				hasNextPage,
				hasPreviousPage,
				registerRef: registerRefWrapper,
			}),
			[page, totalPages, hasNextPage, hasPreviousPage, registerRefWrapper],
		);

		const Component = asChild ? Slot : "nav";

		return (
			<Component
				aria-label="Pagination"
				className={clsx("flex items-center gap-1", className)}
				{...props}
				ref={ref}
			>
				<PaginationContext.Provider value={memoContextValue}>
					{getTruncatedElements({ page, children })}
				</PaginationContext.Provider>
			</Component>
		);
	},
);

export type PaginationItemProps = {
	children?: React.ReactNode;
	index?: number;
} & React.HTMLAttributes<HTMLButtonElement>;

const PaginationItem = forwardRef<HTMLButtonElement, PaginationItemProps>(
	({ index, children, ...props }, ref) => {
		const { registerRef, page, setPage } = usePaginationContext();

		const isActive = page === index;
		const handleClick = () => {
			if (index !== undefined) {
				setPage(index);
			}
		};

		return (
			<button
				type="button"
				onClick={handleClick}
				ref={(el) => {
					if (typeof ref === "function") ref(el);
					else if (ref) ref.current = el;
					registerRef(index ?? 0, el);
				}}
				className={clsx(
					"flex h-10 w-10 items-center justify-center rounded-full hover:bg-gray-200",
					{
						"bg-gray-700 text-white hover:bg-gray-800": isActive,
					},
				)}
				aria-current={isActive ? "page" : undefined}
				{...props}
			>
				{children ?? index}
			</button>
		);
	},
);

const PaginationPrev = forwardRef<
	HTMLButtonElement,
	PropsWithChildren<React.HTMLAttributes<HTMLButtonElement>>
>(({ children, ...props }, ref) => {
	const { registerRef, page, setPage, hasPreviousPage } =
		usePaginationContext();

	return (
		<button
			type="button"
			onClick={() => setPage(page - 1)}
			ref={(el) => {
				if (typeof ref === "function") ref(el);
				else if (ref) ref.current = el;
				registerRef(0, el);
			}}
			disabled={!hasPreviousPage}
			className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-gray-200 disabled:opacity-50"
			{...props}
		>
			{children}
		</button>
	);
});

const PaginationNext = forwardRef<
	HTMLButtonElement,
	PropsWithChildren<React.HTMLAttributes<HTMLButtonElement>>
>(({ children, ...props }, ref) => {
	const { page, setPage, hasNextPage, registerRef, totalPages } =
		usePaginationContext();
	return (
		<button
			type="button"
			className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-gray-200 disabled:opacity-50"
			onClick={() => setPage(page + 1)}
			disabled={!hasNextPage}
			ref={(el) => registerRef(totalPages + 1, el)}
			{...props}
		>
			{children}
		</button>
	);
});

export { Pagination, PaginationItem, PaginationPrev, PaginationNext };
