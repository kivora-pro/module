'use client';

import { useCallback, useRef, useState } from 'react';

export interface UseClipboardOptions {
	timeout?: number;
}

export interface UseClipboardReturnValue {
	copy: (text: string) => void;
	copied: boolean;
	reset: () => void;
	error: Error | null;
}

export function useClipboard({
	timeout = 2000,
}: UseClipboardOptions = {}): UseClipboardReturnValue {
	const [copied, setCopied] = useState(false);
	const [error, setError] = useState<Error | null>(null);
	const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(
		undefined,
	);

	const reset = useCallback(() => {
		setCopied(false);
		setError(null);
		if (timeoutRef.current !== undefined) {
			clearTimeout(timeoutRef.current);
		}
	}, []);

	const copy = useCallback(
		(text: string) => {
			if (navigator?.clipboard) {
				navigator.clipboard
					.writeText(text)
					.then(() => {
						setCopied(true);
						setError(null);
						if (timeoutRef.current !== undefined)
							clearTimeout(timeoutRef.current);
						timeoutRef.current = setTimeout(reset, timeout);
					})
					.catch((err) => {
						setError(
							err instanceof Error
								? err
								: new Error('Failed to copy'),
						);
					});
			} else {
				setError(new Error('Clipboard API not available'));
			}
		},
		[timeout, reset],
	);

	return { copy, copied, reset, error };
}
