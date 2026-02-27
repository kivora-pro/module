'use client';

import { useCallback, useEffect, useRef } from 'react';

export interface UseDebouncedCallbackOptions {
	flushOnUnmount?: boolean;
}

export function useDebouncedCallback<
	T extends (...args: Parameters<T>) => ReturnType<T>,
>(
	fn: T,
	delay: number,
	options?: UseDebouncedCallbackOptions,
): T & { flush: () => void; cancel: () => void } {
	const fnRef = useRef(fn);
	const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(
		undefined,
	);
	const lastArgsRef = useRef<Parameters<T> | undefined>(undefined);

	useEffect(() => {
		fnRef.current = fn;
	}, [fn]);

	const cancel = useCallback(() => {
		if (timeoutRef.current !== undefined) {
			clearTimeout(timeoutRef.current);
			timeoutRef.current = undefined;
		}
	}, []);

	const flush = useCallback(() => {
		if (timeoutRef.current !== undefined) {
			cancel();
			const args = lastArgsRef.current;
			if (args !== undefined) {
				// eslint-disable-next-line prefer-spread
				(fnRef.current as (...a: any[]) => ReturnType<T>).apply(
					undefined,
					args,
				);
			}
		}
	}, [cancel]);

	const debounced = useCallback(
		(...args: Parameters<T>) => {
			lastArgsRef.current = args;
			cancel();
			timeoutRef.current = setTimeout(() => {
				(fnRef.current as (...a: any[]) => ReturnType<T>).apply(
					undefined,
					args,
				);
				timeoutRef.current = undefined;
			}, delay);
		},
		[delay, cancel],
	) as T;

	useEffect(() => {
		return () => {
			if (options?.flushOnUnmount) {
				flush();
			} else {
				cancel();
			}
		};
	}, []);

	return Object.assign(debounced, { flush, cancel });
}
