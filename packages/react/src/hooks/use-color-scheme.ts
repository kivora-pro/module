'use client';

import { useEffect, useState } from 'react';

export type ColorScheme = 'light' | 'dark';

export function useColorScheme(initialValue?: ColorScheme): ColorScheme {
	const [colorScheme, setColorScheme] = useState<ColorScheme>(() => {
		if (typeof window === 'undefined') return initialValue ?? 'light';
		return window.matchMedia('(prefers-color-scheme: dark)').matches
			? 'dark'
			: 'light';
	});

	useEffect(() => {
		if (typeof window === 'undefined') return;

		const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

		const handler = (event: MediaQueryListEvent) => {
			setColorScheme(event.matches ? 'dark' : 'light');
		};

		mediaQuery.addEventListener('change', handler);
		return () => mediaQuery.removeEventListener('change', handler);
	}, []);

	return colorScheme;
}
