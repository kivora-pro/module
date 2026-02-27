'use client';

import { useCallback, useState } from 'react';

export interface UseListStateHandlers<T> {
	setState: React.Dispatch<React.SetStateAction<T[]>>;
	append: (...items: T[]) => void;
	prepend: (...items: T[]) => void;
	insert: (index: number, ...items: T[]) => void;
	pop: () => void;
	shift: () => void;
	apply: (fn: (item: T, index?: number) => T) => void;
	applyWhere: (
		condition: (item: T, index: number) => boolean,
		fn: (item: T, index?: number) => T,
	) => void;
	remove: (...indices: number[]) => void;
	reorder: (opts: { from: number; to: number }) => void;
	swap: (opts: { from: number; to: number }) => void;
	setItem: (index: number, item: T) => void;
	setItemProp: <K extends keyof T>(
		index: number,
		prop: K,
		value: T[K],
	) => void;
	filter: (fn: (item: T, index: number) => boolean) => void;
}

export type UseListStateReturnValue<T> = [T[], UseListStateHandlers<T>];

export function useListState<T>(
	initialValue: T[] | (() => T[]) = [],
): UseListStateReturnValue<T> {
	const [state, setState] = useState<T[]>(initialValue);

	const append = useCallback(
		(...items: T[]) => setState((c) => [...c, ...items]),
		[],
	);
	const prepend = useCallback(
		(...items: T[]) => setState((c) => [...items, ...c]),
		[],
	);

	const insert = useCallback(
		(index: number, ...items: T[]) =>
			setState((c) => [
				...c.slice(0, index),
				...items,
				...c.slice(index),
			]),
		[],
	);

	const apply = useCallback(
		(fn: (item: T, index?: number) => T) =>
			setState((c) => c.map((item, i) => fn(item, i))),
		[],
	);

	const applyWhere = useCallback(
		(
			condition: (item: T, index: number) => boolean,
			fn: (item: T, index?: number) => T,
		) =>
			setState((c) =>
				c.map((item, i) => (condition(item, i) ? fn(item, i) : item)),
			),
		[],
	);

	const remove = useCallback(
		(...indices: number[]) =>
			setState((c) => c.filter((_, i) => !indices.includes(i))),
		[],
	);

	const pop = useCallback(() => setState((c) => c.slice(0, -1)), []);
	const shift = useCallback(() => setState((c) => c.slice(1)), []);

	const reorder = useCallback(
		({ from, to }: { from: number; to: number }) =>
			setState((c) => {
				const cloned = [...c];
				const item = cloned[from] as T;
				cloned.splice(from, 1);
				cloned.splice(to, 0, item);
				return cloned;
			}),
		[],
	);

	const swap = useCallback(
		({ from, to }: { from: number; to: number }) =>
			setState((c) => {
				const cloned = [...c];
				const fromItem = cloned[from] as T;
				const toItem = cloned[to] as T;
				cloned[from] = toItem;
				cloned[to] = fromItem;
				return cloned;
			}),
		[],
	);

	const setItem = useCallback(
		(index: number, item: T) =>
			setState((c) => c.map((v, i) => (i === index ? item : v))),
		[],
	);

	const setItemProp = useCallback(
		<K extends keyof T>(index: number, prop: K, value: T[K]) =>
			setState((c) =>
				c.map((item, i) =>
					i === index
						? ({ ...(item as object), [prop]: value } as T)
						: item,
				),
			),
		[],
	);

	const filter = useCallback(
		(fn: (item: T, index: number) => boolean) =>
			setState((c) => c.filter(fn)),
		[],
	);

	return [
		state,
		{
			setState,
			append,
			prepend,
			insert,
			pop,
			shift,
			apply,
			applyWhere,
			remove,
			reorder,
			swap,
			setItem,
			setItemProp,
			filter,
		},
	];
}
