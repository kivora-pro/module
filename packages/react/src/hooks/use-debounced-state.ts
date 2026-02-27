'use client';

import { useEffect, useRef, useState } from 'react';

export function useDebouncedState<T>(
	defaultValue: T,
	wait: number,
	options?: { leading?: boolean },
): [T, React.Dispatch<React.SetStateAction<T>>] {
	const [value, setValue] = useState<T>(defaultValue);
	const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(
		undefined,
	);
	const leadingRef = useRef(true);

	const clearTimeout_ = () => {
		if (timeoutRef.current !== undefined) {
			clearTimeout(timeoutRef.current);
		}
	};

	useEffect(() => clearTimeout_, []);

	const debouncedSetValue = (newValue: React.SetStateAction<T>) => {
		clearTimeout_();
		if (leadingRef.current && options?.leading) {
			setValue(newValue);
			leadingRef.current = false;
		} else {
			timeoutRef.current = setTimeout(() => {
				leadingRef.current = true;
				setValue(newValue);
			}, wait);
		}
	};

	return [
		value,
		debouncedSetValue as React.Dispatch<React.SetStateAction<T>>,
	];
}
