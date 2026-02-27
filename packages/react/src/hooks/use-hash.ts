'use client';

import { useCallback, useEffect, useState } from 'react';

export interface UseHashOptions {
	getInitialValueInEffect?: boolean;
}

export interface UseHashReturnValue {
	hash: string;
	setHash: (hash: string) => void;
}

export function useHash({
	getInitialValueInEffect = true,
}: UseHashOptions = {}): UseHashReturnValue {
	const [hash, setHashState] = useState<string>(() => {
		if (getInitialValueInEffect) return '';
		return typeof window !== 'undefined' ? window.location.hash : '';
	});

	useEffect(() => {
		if (getInitialValueInEffect) {
			setHashState(window.location.hash);
		}

		const handleHashChange = () => setHashState(window.location.hash);
		window.addEventListener('hashchange', handleHashChange);
		return () => window.removeEventListener('hashchange', handleHashChange);
	}, [getInitialValueInEffect]);

	const setHash = useCallback((newHash: string) => {
		const formattedHash = newHash.startsWith('#') ? newHash : `#${newHash}`;
		window.history.pushState(null, '', formattedHash);
		setHashState(formattedHash);
	}, []);

	return { hash, setHash };
}
