'use client';

import { useCallback, useState } from 'react';

export interface UseQueueOptions<T> {
	initialValues?: T[];
	limit: number;
}

export interface UseQueueReturnValue<T> {
	queue: T[];
	add: (...items: T[]) => void;
	update: (fn: (state: T[]) => T[]) => void;
	cleanQueue: () => void;
	state: T[];
}

export function useQueue<T>({
	initialValues = [],
	limit,
}: UseQueueOptions<T>): UseQueueReturnValue<T> {
	const [{ queue, state }, set] = useState<{ queue: T[]; state: T[] }>(() => {
		const initial = [...initialValues];
		return {
			state: initial.slice(0, limit),
			queue: initial.slice(limit),
		};
	});

	const add = useCallback(
		(...items: T[]) =>
			set((current) => {
				const results: T[] = [...current.state, ...items];
				return {
					state: results.slice(0, limit),
					queue: [...current.queue, ...results.slice(limit)],
				};
			}),
		[limit],
	);

	const update = useCallback(
		(fn: (state: T[]) => T[]) =>
			set((current) => {
				const results = fn([...current.state, ...current.queue]);
				return {
					state: results.slice(0, limit),
					queue: results.slice(limit),
				};
			}),
		[limit],
	);

	const cleanQueue = useCallback(
		() =>
			set((current) => ({
				state: current.state,
				queue: [],
			})),
		[],
	);

	return { queue, add, update, cleanQueue, state };
}
