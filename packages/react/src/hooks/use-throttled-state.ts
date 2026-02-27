'use client';

import { useState } from 'react';
import { useThrottledCallback } from './use-throttled-callback';

export function useThrottledState<T>(
	initialValue: T,
	limit: number,
): [T, React.Dispatch<React.SetStateAction<T>>] {
	const [value, _setValue] = useState<T>(initialValue);
	const setValue = useThrottledCallback(
		_setValue as (...args: unknown[]) => unknown,
		limit,
	) as React.Dispatch<React.SetStateAction<T>>;

	return [value, setValue];
}
