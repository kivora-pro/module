'use client';

import { useCallback, useState } from 'react';

export interface EyeDropperOpenOptions {
	signal?: AbortSignal;
}

export interface EyeDropperOpenReturnType {
	sRGBHex: string;
}

export interface UseEyeDropperReturnValue {
	open: (
		options?: EyeDropperOpenOptions,
	) => Promise<EyeDropperOpenReturnType | undefined>;
	close: () => void;
	isSupported: boolean;
}

export function useEyeDropper(): UseEyeDropperReturnValue {
	const isSupported = typeof window !== 'undefined' && 'EyeDropper' in window;
	const [eyeDropperRef] = useState<{ abort?: AbortController }>({});

	const close = useCallback(() => {
		eyeDropperRef.abort?.abort();
	}, [eyeDropperRef]);

	const open = useCallback(
		async (
			options?: EyeDropperOpenOptions,
		): Promise<EyeDropperOpenReturnType | undefined> => {
			if (!isSupported) return undefined;

			const controller = new AbortController();
			eyeDropperRef.abort = controller;

			const EyeDropperAPI = (
				window as unknown as {
					EyeDropper: new () => {
						open: (
							options?: EyeDropperOpenOptions,
						) => Promise<EyeDropperOpenReturnType>;
					};
				}
			).EyeDropper;

			try {
				const dropper = new EyeDropperAPI();
				return await dropper.open({
					...options,
					signal: options?.signal ?? controller.signal,
				});
			} catch {
				return undefined;
			}
		},
		[isSupported, eyeDropperRef],
	);

	return { open, close, isSupported };
}
