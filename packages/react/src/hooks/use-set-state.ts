'use client';

import { useCallback, useState } from 'react';

export function useSetState<T extends Record<string, unknown>>(
	initialState: T,
): [T, (statePartial: Partial<T> | ((currentState: T) => Partial<T>)) => void] {
	const [state, _setState] = useState<T>(initialState);

	const setState = useCallback(
		(statePartial: Partial<T> | ((currentState: T) => Partial<T>)) => {
			_setState((current) => {
				const partial =
					typeof statePartial === 'function'
						? statePartial(current)
						: statePartial;
				return { ...current, ...partial };
			});
		},
		[],
	);

	return [state, setState];
}
