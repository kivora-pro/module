'use client';

import { useCallback, useState } from 'react';

export interface UseCounterOptions {
	min?: number;
	max?: number;
}

export interface UseCounterReturnValue {
	count: number;
	increment: () => void;
	decrement: () => void;
	reset: () => void;
	set: (value: number) => void;
}

export function useCounter(
	initialValue = 0,
	options: UseCounterOptions = {},
): UseCounterReturnValue {
	const { min = -Infinity, max = Infinity } = options;

	const clamp = (value: number) => Math.min(max, Math.max(min, value));

	const [count, setCount] = useState(() => clamp(initialValue));

	const increment = useCallback(
		() => setCount((c) => clamp(c + 1)),
		[min, max],
	);
	const decrement = useCallback(
		() => setCount((c) => clamp(c - 1)),
		[min, max],
	);
	const reset = useCallback(
		() => setCount(clamp(initialValue)),
		[initialValue, min, max],
	);
	const set = useCallback(
		(value: number) => setCount(clamp(value)),
		[min, max],
	);

	return { count, increment, decrement, reset, set };
}
