'use client';

import { useEffect, useState } from 'react';
import { useThrottledCallback } from './use-throttled-callback';

export function useThrottledValue<T>(value: T, limit: number): T {
	const [throttledValue, setThrottledValue] = useState<T>(value);

	const update = useThrottledCallback(setThrottledValue, limit);

	useEffect(() => {
		update(value);
	}, [value]);

	return throttledValue;
}
