'use client';

import { useEffect, useRef } from 'react';

export function useClickOutside<T extends HTMLElement = HTMLElement>(
	handler: () => void,
	events?: string[] | null,
	nodes?: HTMLElement[],
): React.RefObject<T | null> {
	const ref = useRef<T | null>(null);
	const handlerRef = useRef(handler);

	useEffect(() => {
		handlerRef.current = handler;
	}, [handler]);

	useEffect(() => {
		const domEvents = events ?? ['mousedown', 'touchstart'];

		const listener = (event: Event) => {
			const { target } = event;

			if (Array.isArray(nodes)) {
				const shouldIgnore = nodes.some(
					(node) =>
						node &&
						(node === target || node.contains(target as Node)),
				);
				if (shouldIgnore) return;
			} else if (ref.current) {
				if (ref.current.contains(target as Node)) return;
			}

			handlerRef.current();
		};

		domEvents.forEach((eventName) =>
			document.addEventListener(eventName, listener),
		);

		return () => {
			domEvents.forEach((eventName) =>
				document.removeEventListener(eventName, listener),
			);
		};
	}, [events, nodes]);

	return ref;
}
