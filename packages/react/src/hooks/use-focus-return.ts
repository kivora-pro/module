'use client';

import { useEffect, useRef } from 'react';

export interface UseFocusReturnOptions {
	opened: boolean;
	shouldReturnFocus?: boolean;
}

export function useFocusReturn({
	opened,
	shouldReturnFocus = true,
}: UseFocusReturnOptions): void {
	const lastActiveElement = useRef<HTMLElement | null>(null);

	useEffect(() => {
		if (opened) {
			lastActiveElement.current = document.activeElement as HTMLElement;
		} else if (shouldReturnFocus && lastActiveElement.current) {
			lastActiveElement.current.focus();
			lastActiveElement.current = null;
		}
	}, [opened, shouldReturnFocus]);
}
