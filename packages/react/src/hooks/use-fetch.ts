'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

export interface UseFetchReturnValue<T> {
	data: T | null;
	loading: boolean;
	error: Error | null;
	refetch: () => void;
	abort: () => void;
}

export function useFetch<T>(
	url: string,
	options?: RequestInit,
): UseFetchReturnValue<T> {
	const [data, setData] = useState<T | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<Error | null>(null);
	const controllerRef = useRef<AbortController | null>(null);

	const fetchData = useCallback(async () => {
		controllerRef.current?.abort();
		controllerRef.current = new AbortController();
		setLoading(true);
		setError(null);

		try {
			const response = await fetch(url, {
				...options,
				signal: controllerRef.current.signal,
			});

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const result: T = await response.json();
			setData(result);
		} catch (err) {
			if (err instanceof Error && err.name !== 'AbortError') {
				setError(err);
			}
		} finally {
			setLoading(false);
		}
	}, [url]);

	const abort = useCallback(() => {
		controllerRef.current?.abort();
		setLoading(false);
	}, []);

	useEffect(() => {
		fetchData();
		return () => controllerRef.current?.abort();
	}, [fetchData]);

	return { data, loading, error, refetch: fetchData, abort };
}
