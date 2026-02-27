'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

export interface UseIntersectionOptions extends IntersectionObserverInit {}

export interface UseIntersectionReturnValue<
	T extends HTMLElement = HTMLElement,
> {
	ref: (element: T | null) => void;
	entry: IntersectionObserverEntry | null;
}

export function useIntersection<T extends HTMLElement = HTMLElement>(
	options?: UseIntersectionOptions,
): UseIntersectionReturnValue<T> {
	const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null);
	const observer = useRef<IntersectionObserver | null>(null);

	const ref = useCallback(
		(element: T | null) => {
			if (observer.current) {
				observer.current.disconnect();
				observer.current = null;
			}

			if (element === null) return;

			observer.current = new IntersectionObserver(([e]) => {
				if (e) setEntry(e);
			}, options);

			observer.current.observe(element);
		},
		[options?.root, options?.rootMargin, options?.threshold],
	);

	useEffect(() => () => observer.current?.disconnect(), []);

	return { ref, entry };
}
