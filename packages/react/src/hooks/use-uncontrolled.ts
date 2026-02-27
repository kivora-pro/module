'use client';

import { useCallback, useState } from 'react';

export interface UseUncontrolledOptions<T> {
	value?: T;
	defaultValue?: T;
	finalValue?: T;
	onChange?: (value: T, ...payload: unknown[]) => void;
}

export type UseUncontrolledReturnValue<T> = [
	T,
	(value: T, ...payload: unknown[]) => void,
	boolean,
];

export function useUncontrolled<T>({
	value,
	defaultValue,
	finalValue,
	onChange,
}: UseUncontrolledOptions<T>): UseUncontrolledReturnValue<T> {
	const [uncontrolled, setUncontrolled] = useState(
		defaultValue !== undefined ? defaultValue : (finalValue as T),
	);

	const isControlled = value !== undefined;
	const current = isControlled ? (value as T) : uncontrolled;

	const handleChange = useCallback(
		(val: T, ...payload: unknown[]) => {
			if (!isControlled) {
				setUncontrolled(val);
			}
			onChange?.(val, ...payload);
		},
		[isControlled, onChange],
	);

	return [current, handleChange, isControlled];
}
