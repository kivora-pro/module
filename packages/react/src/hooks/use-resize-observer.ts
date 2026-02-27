'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

export interface ResizeObserverEntry {
	contentRect: DOMRectReadOnly;
	target: Element;
}

export function useResizeObserver<T extends HTMLElement = HTMLElement>(): [
	React.RefObject<T | null>,
	DOMRectReadOnly,
] {
	const ref = useRef<T | null>(null);
	const [rect, setRect] = useState<DOMRectReadOnly>({} as DOMRectReadOnly);

	const observer = useRef<ResizeObserver | null>(null);

	const disconnect = useCallback(() => observer.current?.disconnect(), []);

	const connect = useCallback(() => {
		if (ref.current) {
			observer.current = new ResizeObserver(([entry]) => {
				if (entry) {
					setRect(entry.contentRect);
				}
			});
			observer.current.observe(ref.current);
		}
	}, []);

	useEffect(() => {
		connect();
		return disconnect;
	}, []);

	return [ref, rect];
}

export function useElementSize<T extends HTMLElement = HTMLElement>(): [
	React.RefObject<T | null>,
	{ width: number; height: number },
] {
	const [ref, rect] = useResizeObserver<T>();
	return [ref, { width: rect.width ?? 0, height: rect.height ?? 0 }];
}
