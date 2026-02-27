'use client';

import {
	useCallback,
	type MutableRefObject,
	type Ref,
	type RefCallback,
} from 'react';

type PossibleRef<T> = Ref<T> | undefined | null;

export function assignRef<T>(ref: PossibleRef<T>, value: T): void {
	if (!ref) return;
	if (typeof ref === 'function') {
		ref(value);
	} else {
		(ref as MutableRefObject<T>).current = value;
	}
}

export function mergeRefs<T>(...refs: PossibleRef<T>[]): RefCallback<T> {
	return (value: T) => {
		refs.forEach((ref) => assignRef(ref, value));
	};
}

export function useMergedRef<T>(...refs: PossibleRef<T>[]): RefCallback<T> {
	// eslint-disable-next-line react-hooks/exhaustive-deps
	return useCallback(mergeRefs(...refs), refs);
}
