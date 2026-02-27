'use client';

import { useCallback, useRef } from 'react';

const FOCUSABLE_ELEMENTS = [
	'a[href]',
	'area[href]',
	'input:not([disabled]):not([type="hidden"])',
	'select:not([disabled])',
	'textarea:not([disabled])',
	'button:not([disabled])',
	'iframe',
	'object',
	'embed',
	'[contenteditable]',
	'[tabindex]:not([tabindex="-1"])',
].join(', ');

function getFocusableElements(container: HTMLElement): HTMLElement[] {
	return Array.from(
		container.querySelectorAll<HTMLElement>(FOCUSABLE_ELEMENTS),
	).filter((el) => !el.closest('[inert]') && el.tabIndex !== -1);
}

export function useFocusTrap(
	active = true,
): (element: HTMLElement | null) => void {
	const ref = useRef<HTMLElement | null>(null);

	const setRef = useCallback(
		(element: HTMLElement | null) => {
			if (!active) {
				ref.current = element;
				return;
			}

			ref.current = element;

			if (!element) return;

			const focusable = getFocusableElements(element);
			const first = focusable[0];
			const last = focusable[focusable.length - 1];

			if (first && !element.contains(document.activeElement)) {
				first.focus();
			}

			const handleKeyDown = (event: KeyboardEvent) => {
				if (event.key !== 'Tab') return;

				const currentFocusable = getFocusableElements(element);
				const currentFirst = currentFocusable[0];
				const currentLast =
					currentFocusable[currentFocusable.length - 1];

				if (event.shiftKey) {
					if (document.activeElement === currentFirst) {
						event.preventDefault();
						currentLast?.focus();
					}
				} else {
					if (document.activeElement === currentLast) {
						event.preventDefault();
						currentFirst?.focus();
					}
				}
			};

			element.addEventListener('keydown', handleKeyDown);

			return () => {
				element.removeEventListener('keydown', handleKeyDown);
			};
		},
		[active],
	);

	return setRef;
}
