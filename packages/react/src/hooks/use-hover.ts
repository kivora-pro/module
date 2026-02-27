'use client';

import { useCallback, useState } from 'react';

export interface UseHoverReturnValue<T extends HTMLElement = HTMLElement> {
	hovered: boolean;
	ref: (element: T | null) => void;
}

export function useHover<
	T extends HTMLElement = HTMLElement,
>(): UseHoverReturnValue<T> {
	const [hovered, setHovered] = useState(false);
	const elementRef = useCallback((element: T | null) => {
		if (element) {
			element.addEventListener('mouseenter', () => setHovered(true));
			element.addEventListener('mouseleave', () => setHovered(false));
		}
	}, []);

	return { hovered, ref: elementRef };
}
