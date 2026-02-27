'use client';

import { useEffect, useRef, useState } from 'react';

export function useDebouncedValue<T>(
	value: T,
	wait: number,
	options?: { leading?: boolean },
): [T, () => void] {
	const [_value, setValue] = useState(value);
	const mountedRef = useRef(false);
	const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(
		undefined,
	);
	const cooldownRef = useRef(false);

	const cancel = () => {
		if (timeoutRef.current !== undefined) {
			clearTimeout(timeoutRef.current);
		}
	};

	useEffect(() => {
		if (mountedRef.current) {
			if (!cooldownRef.current && options?.leading) {
				cooldownRef.current = true;
				setValue(value);
			} else {
				cancel();
				timeoutRef.current = setTimeout(() => {
					cooldownRef.current = false;
					setValue(value);
				}, wait);
			}
		}
	}, [value, options?.leading, wait]);

	useEffect(() => {
		mountedRef.current = true;
		return cancel;
	}, []);

	return [_value, cancel];
}
