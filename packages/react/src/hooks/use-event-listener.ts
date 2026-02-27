'use client';

import { useEffect, useRef } from 'react';

export function useEventListener<
	K extends keyof HTMLElementEventMap,
	T extends HTMLElement = HTMLElement,
>(
	type: K,
	listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => void,
	options?: boolean | AddEventListenerOptions,
): React.RefObject<T | null> {
	const ref = useRef<T | null>(null);
	const listenerRef = useRef(listener);

	useEffect(() => {
		listenerRef.current = listener;
	}, [listener]);

	useEffect(() => {
		const element = ref.current;
		if (!element) return;

		const handler = (event: HTMLElementEventMap[K]) =>
			listenerRef.current.call(element, event);
		element.addEventListener(type, handler as EventListener, options);

		return () => {
			element.removeEventListener(
				type,
				handler as EventListener,
				options,
			);
		};
	}, [type, options]);

	return ref;
}
