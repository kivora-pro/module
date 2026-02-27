'use client';

import React, { useCallback, useState } from 'react';

export interface CopyButtonProps {
	value: string;
	timeout?: number;
	children: (props: { copied: boolean; copy: () => void }) => React.ReactNode;
}

export function CopyButton({
	value,
	timeout = 2000,
	children,
}: CopyButtonProps) {
	const [copied, setCopied] = useState(false);

	const copy = useCallback(() => {
		if (typeof navigator !== 'undefined' && navigator.clipboard) {
			navigator.clipboard.writeText(value).then(() => {
				setCopied(true);
				setTimeout(() => setCopied(false), timeout);
			});
		}
	}, [value, timeout]);

	return <>{children({ copied, copy })}</>;
}
