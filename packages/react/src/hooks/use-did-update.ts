'use client';

import { DependencyList, useEffect, useRef } from 'react';

export function useDidUpdate(
	fn: () => void | (() => void),
	dependencies?: DependencyList,
): void {
	const mounted = useRef(false);

	useEffect(() => {
		if (mounted.current) {
			return fn();
		}
		mounted.current = true;
	}, dependencies);
}
