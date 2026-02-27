'use client';

import { useCallback, useRef, useState } from 'react';

export interface UseStateHistoryHandlers<T> {
	set: (value: T) => void;
	back: (steps?: number) => void;
	forward: (steps?: number) => void;
	reset: () => void;
}

export interface UseStateHistoryReturnValue<T> {
	state: T;
	history: T[];
	pointer: number;
	back: (steps?: number) => void;
	forward: (steps?: number) => void;
	set: (value: T) => void;
	reset: () => void;
}

export function useStateHistory<T>(
	initialValue: T,
): UseStateHistoryReturnValue<T> {
	const [pointer, setPointer] = useState(0);
	const history = useRef<T[]>([initialValue]);
	const [, rerender] = useState(0);

	const set = useCallback(
		(value: T) => {
			history.current = [...history.current.slice(0, pointer + 1), value];
			setPointer(history.current.length - 1);
		},
		[pointer],
	);

	const back = useCallback(
		(steps = 1) => {
			const newPointer = Math.max(0, pointer - steps);
			setPointer(newPointer);
			rerender((c) => c + 1);
		},
		[pointer],
	);

	const forward = useCallback(
		(steps = 1) => {
			const newPointer = Math.min(
				history.current.length - 1,
				pointer + steps,
			);
			setPointer(newPointer);
			rerender((c) => c + 1);
		},
		[pointer],
	);

	const reset = useCallback(() => {
		history.current = [initialValue];
		setPointer(0);
	}, [initialValue]);

	return {
		state: history.current[pointer] as T,
		history: history.current,
		pointer,
		back,
		forward,
		set,
		reset,
	};
}
