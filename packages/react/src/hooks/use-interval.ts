'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

export interface UseIntervalOptions {
	autoInvoke?: boolean;
}

export interface UseIntervalReturnValue {
	start: () => void;
	stop: () => void;
	toggle: () => void;
	active: boolean;
}

export function useInterval(
	fn: () => void,
	interval: number,
	options?: UseIntervalOptions,
): UseIntervalReturnValue {
	const fnRef = useRef(fn);
	const intervalRef = useRef<ReturnType<typeof setInterval> | undefined>(
		undefined,
	);
	const [active, setActive] = useState(false);

	useEffect(() => {
		fnRef.current = fn;
	}, [fn]);

	const stop = useCallback(() => {
		setActive(false);
		if (intervalRef.current !== undefined) {
			clearInterval(intervalRef.current);
			intervalRef.current = undefined;
		}
	}, []);

	const start = useCallback(() => {
		setActive((current) => {
			if (!current) {
				intervalRef.current = setInterval(
					() => fnRef.current(),
					interval,
				);
				return true;
			}
			return current;
		});
	}, [interval]);

	const toggle = useCallback(() => {
		setActive((current) => {
			if (current) {
				if (intervalRef.current !== undefined) {
					clearInterval(intervalRef.current);
					intervalRef.current = undefined;
				}
				return false;
			}
			intervalRef.current = setInterval(() => fnRef.current(), interval);
			return true;
		});
	}, [interval]);

	useEffect(() => {
		if (options?.autoInvoke) {
			start();
		}
		return stop;
	}, []);

	return { start, stop, toggle, active };
}
