'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

export interface UseInViewportReturnValue<T extends HTMLElement = HTMLElement> {
	ref: (element: T | null) => void;
	inViewport: boolean;
}

export function useInViewport<
	T extends HTMLElement = HTMLElement,
>(): UseInViewportReturnValue<T> {
	const [inViewport, setInViewport] = useState(false);
	const observer = useRef<IntersectionObserver | null>(null);

	const ref = useCallback((element: T | null) => {
		if (observer.current) {
			observer.current.disconnect();
			observer.current = null;
		}

		if (element === null) return;

		observer.current = new IntersectionObserver(([entry]) => {
			setInViewport(entry?.isIntersecting ?? false);
		});

		observer.current.observe(element);
	}, []);

	useEffect(() => () => observer.current?.disconnect(), []);

	return { ref, inViewport };
}
