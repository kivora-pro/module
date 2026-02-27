'use client';

import { useEffect, useState } from 'react';

export function useMediaQuery(
	query: string,
	initialValue?: boolean,
	options?: { getInitialValueInEffect?: boolean },
): boolean {
	const getInitialValueInEffect = options?.getInitialValueInEffect ?? true;

	const getValue = () => {
		if (typeof window === 'undefined') {
			return initialValue ?? false;
		}
		return window.matchMedia(query).matches;
	};

	const [matches, setMatches] = useState<boolean>(
		getInitialValueInEffect ? (initialValue ?? false) : getValue(),
	);

	useEffect(() => {
		if (typeof window === 'undefined') return;

		const mediaQuery = window.matchMedia(query);
		setMatches(mediaQuery.matches);

		const handler = (event: MediaQueryListEvent) =>
			setMatches(event.matches);
		mediaQuery.addEventListener('change', handler);

		return () => mediaQuery.removeEventListener('change', handler);
	}, [query]);

	return matches;
}
