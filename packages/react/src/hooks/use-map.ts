'use client';

import { useCallback, useState } from 'react';

export interface UseMapReturnValue<K, V> extends Omit<
	Map<K, V>,
	'set' | 'delete' | 'clear'
> {
	set: (key: K, value: V) => void;
	delete: (key: K) => void;
	clear: () => void;
}

export function useMap<K, V>(initialValue?: [K, V][]): UseMapReturnValue<K, V> {
	const [map, setMap] = useState<Map<K, V>>(
		() => new Map<K, V>(initialValue),
	);

	const set = useCallback(
		(key: K, value: V) => setMap((m) => new Map(m).set(key, value)),
		[],
	);

	const del = useCallback(
		(key: K) =>
			setMap((m) => {
				const next = new Map(m);
				next.delete(key);
				return next;
			}),
		[],
	);

	const clear = useCallback(() => setMap(new Map()), []);

	return {
		...map,
		get: (key: K) => map.get(key),
		has: (key: K) => map.has(key),
		set,
		delete: del,
		clear,
		entries: () => map.entries(),
		keys: () => map.keys(),
		values: () => map.values(),
		forEach: (fn: (value: V, key: K, map: Map<K, V>) => void) =>
			map.forEach(fn),
		get size() {
			return map.size;
		},
		[Symbol.iterator]: () => map[Symbol.iterator](),
		[Symbol.toStringTag]: map[Symbol.toStringTag],
	};
}
