'use client';

import { useEffect, useRef } from 'react';

export interface UseMutationObserverOptions extends MutationObserverInit {}

export function useMutationObserver<T extends HTMLElement = HTMLElement>(
	callback: MutationCallback,
	options: UseMutationObserverOptions,
	target?: (() => Node) | null,
): React.RefObject<T | null> {
	const ref = useRef<T | null>(null);
	const callbackRef = useRef(callback);

	useEffect(() => {
		callbackRef.current = callback;
	}, [callback]);

	useEffect(() => {
		const targetNode = target ? target() : ref.current;
		if (!targetNode) return;

		const observer = new MutationObserver((mutations, obs) => {
			callbackRef.current(mutations, obs);
		});

		observer.observe(targetNode, options);

		return () => observer.disconnect();
	}, [options, target]);

	return ref;
}
