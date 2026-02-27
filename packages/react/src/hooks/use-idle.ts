'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

export interface UseIdleOptions {
	events?: string[];
	initialState?: boolean;
}

export function useIdle(timeout: number, options?: UseIdleOptions): boolean {
	const {
		events = ['keypress', 'mousemove', 'touchmove', 'click', 'scroll'],
		initialState = true,
	} = options ?? {};

	const [idle, setIdle] = useState(initialState);
	const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(
		undefined,
	);

	const handleEvent = useCallback(() => {
		setIdle(false);
		if (timeoutRef.current !== undefined) {
			clearTimeout(timeoutRef.current);
		}
		timeoutRef.current = setTimeout(() => setIdle(true), timeout);
	}, [timeout]);

	useEffect(() => {
		events.forEach((event) =>
			document.addEventListener(event, handleEvent, { passive: true }),
		);
		timeoutRef.current = setTimeout(() => setIdle(true), timeout);

		return () => {
			events.forEach((event) =>
				document.removeEventListener(event, handleEvent),
			);
			if (timeoutRef.current !== undefined) {
				clearTimeout(timeoutRef.current);
			}
		};
	}, [events, handleEvent, timeout]);

	return idle;
}
