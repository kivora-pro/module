'use client';

import { useEffect, useRef } from 'react';

export function useWindowEvent<K extends keyof WindowEventMap>(
	type: K,
	listener: (this: Window, ev: WindowEventMap[K]) => void,
	options?: boolean | AddEventListenerOptions,
): void {
	const listenerRef = useRef(listener);

	useEffect(() => {
		listenerRef.current = listener;
	}, [listener]);

	useEffect(() => {
		const handler = (event: WindowEventMap[K]) =>
			listenerRef.current.call(window, event);
		window.addEventListener(type, handler as EventListener, options);
		return () =>
			window.removeEventListener(type, handler as EventListener, options);
	}, [type, options]);
}
