'use client';

import { useCallback, useEffect, useRef } from 'react';

export interface UseTimeoutReturnValue {
	start: (...args: unknown[]) => void;
	clear: () => void;
}

export function useTimeout(
	fn: (...args: unknown[]) => void,
	delay: number,
): UseTimeoutReturnValue {
	const fnRef = useRef(fn);
	const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(
		undefined,
	);

	useEffect(() => {
		fnRef.current = fn;
	}, [fn]);

	const clear = useCallback(() => {
		if (timeoutRef.current !== undefined) {
			clearTimeout(timeoutRef.current);
			timeoutRef.current = undefined;
		}
	}, []);

	const start = useCallback(
		(...args: unknown[]) => {
			clear();
			timeoutRef.current = setTimeout(() => {
				fnRef.current(...args);
				timeoutRef.current = undefined;
			}, delay);
		},
		[delay, clear],
	);

	useEffect(() => clear, []);

	return { start, clear };
}
