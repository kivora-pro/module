'use client';

import { useCallback, useRef, useState } from 'react';

export interface UseFocusWithinOptions {
	onFocus?: (event: FocusEvent) => void;
	onBlur?: (event: FocusEvent) => void;
}

export interface UseFocusWithinReturnValue {
	ref: (element: HTMLElement | null) => void;
	focused: boolean;
}

export function useFocusWithin({
	onFocus,
	onBlur,
}: UseFocusWithinOptions = {}): UseFocusWithinReturnValue {
	const [focused, setFocused] = useState(false);
	const onFocusRef = useRef(onFocus);
	const onBlurRef = useRef(onBlur);

	onFocusRef.current = onFocus;
	onBlurRef.current = onBlur;

	const ref = useCallback((element: HTMLElement | null) => {
		if (!element) return;

		const handleFocusIn = (event: FocusEvent) => {
			setFocused(true);
			onFocusRef.current?.(event);
		};

		const handleFocusOut = (event: FocusEvent) => {
			if (!element.contains(event.relatedTarget as Node)) {
				setFocused(false);
				onBlurRef.current?.(event);
			}
		};

		element.addEventListener('focusin', handleFocusIn as EventListener);
		element.addEventListener('focusout', handleFocusOut as EventListener);

		return () => {
			element.removeEventListener(
				'focusin',
				handleFocusIn as EventListener,
			);
			element.removeEventListener(
				'focusout',
				handleFocusOut as EventListener,
			);
		};
	}, []);

	return { ref, focused };
}
