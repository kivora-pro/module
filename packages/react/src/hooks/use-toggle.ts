'use client';

import { useCallback, useState } from 'react';

export function useToggle<T = boolean>(
	options: T[] = [false, true] as unknown as T[],
): [T, (value?: T) => void] {
	const [state, setState] = useState<T>(options[0] as T);

	const toggle = useCallback(
		(value?: T) => {
			if (value !== undefined) {
				setState(value);
			} else {
				setState((current) => {
					const idx = options.indexOf(current);
					return options[(idx + 1) % options.length] as T;
				});
			}
		},
		[options],
	);

	return [state, toggle];
}
