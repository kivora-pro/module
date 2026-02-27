'use client';

import { DependencyList, EffectCallback, useEffect, useRef } from 'react';

function shallowEqual(a: DependencyList, b: DependencyList): boolean {
	return a.length === b.length && a.every((dep, i) => Object.is(dep, b[i]));
}

export function useShallowEffect(
	fn: EffectCallback,
	dependencies?: DependencyList,
): void {
	const prevDependenciesRef = useRef<DependencyList | null>(null);

	useEffect(() => {
		const isFirstRun = prevDependenciesRef.current === null;
		const depsChanged = isFirstRun
			? true
			: !shallowEqual(prevDependenciesRef.current!, dependencies ?? []);

		if (depsChanged) {
			prevDependenciesRef.current = dependencies ?? [];
			return fn();
		}
	});
}
