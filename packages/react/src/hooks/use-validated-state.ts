'use client';

import { useCallback, useState } from 'react';

export interface UseValidatedStateReturnValue<T> {
	value: T;
	lastValidValue: T;
	valid: boolean;
	setValue: (value: T) => void;
}

export function useValidatedState<T>(
	initialValue: T,
	validation: (value: T) => boolean,
): UseValidatedStateReturnValue<T> {
	const [{ value, lastValidValue, valid }, setState] = useState({
		value: initialValue,
		lastValidValue: initialValue,
		valid: validation(initialValue),
	});

	const setValue = useCallback(
		(val: T) => {
			const isValid = validation(val);
			setState((current) => ({
				value: val,
				lastValidValue: isValid ? val : current.lastValidValue,
				valid: isValid,
			}));
		},
		[validation],
	);

	return { value, lastValidValue, valid, setValue };
}
