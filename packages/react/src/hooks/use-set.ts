'use client';

import { useCallback, useState } from 'react';

export interface UseSetReturnValue<T> {
	has: (value: T) => boolean;
	add: (value: T) => void;
	delete: (value: T) => void;
	clear: () => void;
	replace: (values: T[]) => void;
	forEach: (fn: (value: T, set: Set<T>) => void) => void;
	entries: () => IterableIterator<[T, T]>;
	keys: () => IterableIterator<T>;
	values: () => IterableIterator<T>;
	size: number;
	[Symbol.iterator]: () => IterableIterator<T>;
}

export function useSet<T>(initialValues?: T[]): UseSetReturnValue<T> {
	const [set, setSet] = useState<Set<T>>(() => new Set<T>(initialValues));

	const add = useCallback(
		(value: T) => setSet((s) => new Set([...s, value])),
		[],
	);

	const del = useCallback(
		(value: T) =>
			setSet((s) => {
				const next = new Set(s);
				next.delete(value);
				return next;
			}),
		[],
	);

	const clear = useCallback(() => setSet(new Set()), []);

	const replace = useCallback((values: T[]) => setSet(new Set(values)), []);

	return {
		has: (value: T) => set.has(value),
		add,
		delete: del,
		clear,
		replace,
		forEach: (fn: (value: T, set: Set<T>) => void) =>
			set.forEach((v, _v2, s) => fn(v, s)),
		entries: () => set.entries(),
		keys: () => set.keys(),
		values: () => set.values(),
		get size() {
			return set.size;
		},
		[Symbol.iterator]: () => set[Symbol.iterator](),
	};
}
