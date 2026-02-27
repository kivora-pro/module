'use client';

import { ChangeEvent, useState } from 'react';

export type UseInputStateReturnValue<
	T extends HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement,
> = [string, (event: ChangeEvent<T> | string) => void];

export function useInputState<
	T extends HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement =
		HTMLInputElement,
>(initialState: string): UseInputStateReturnValue<T> {
	const [value, setValue] = useState(initialState);

	const onChange = (payload: ChangeEvent<T> | string) => {
		if (typeof payload === 'string') {
			setValue(payload);
		} else {
			setValue(payload.currentTarget.value);
		}
	};

	return [value, onChange];
}
