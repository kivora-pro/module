'use client';

import { useCallback, useEffect, useRef } from 'react';

export function useThrottledCallback<
	T extends (...args: Parameters<T>) => ReturnType<T>,
>(fn: T, limit: number): T {
	const fnRef = useRef(fn);
	const lastRunRef = useRef(0);
	const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(
		undefined,
	);

	useEffect(() => {
		fnRef.current = fn;
	}, [fn]);

	const throttled = useCallback(
		(...args: Parameters<T>) => {
			const now = Date.now();
			const remaining = limit - (now - lastRunRef.current);

			if (remaining <= 0) {
				if (timeoutRef.current !== undefined) {
					clearTimeout(timeoutRef.current);
					timeoutRef.current = undefined;
				}
				lastRunRef.current = now;
				fnRef.current(...args);
			} else {
				if (timeoutRef.current !== undefined) {
					clearTimeout(timeoutRef.current);
				}
				timeoutRef.current = setTimeout(() => {
					lastRunRef.current = Date.now();
					fnRef.current(...args);
				}, remaining);
			}
		},
		[limit],
	) as T;

	useEffect(() => {
		return () => {
			if (timeoutRef.current !== undefined) {
				clearTimeout(timeoutRef.current);
			}
		};
	}, []);

	return throttled;
}
