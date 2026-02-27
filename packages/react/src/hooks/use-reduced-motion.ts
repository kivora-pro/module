'use client';

import { useEffect, useState } from 'react';

export function useReducedMotion(initialValue?: boolean): boolean {
	const [reduceMotion, setReduceMotion] = useState<boolean>(() => {
		if (typeof window === 'undefined') return initialValue ?? false;
		return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
	});

	useEffect(() => {
		if (typeof window === 'undefined') return;

		const mediaQuery = window.matchMedia(
			'(prefers-reduced-motion: reduce)',
		);
		const handler = (event: MediaQueryListEvent) =>
			setReduceMotion(event.matches);

		mediaQuery.addEventListener('change', handler);
		return () => mediaQuery.removeEventListener('change', handler);
	}, []);

	return reduceMotion;
}
