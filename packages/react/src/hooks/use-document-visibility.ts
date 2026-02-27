'use client';

import { useEffect, useState } from 'react';

export type DocumentVisibilityState = 'visible' | 'hidden';

export function useDocumentVisibility(): DocumentVisibilityState {
	const [visibility, setVisibility] = useState<DocumentVisibilityState>(
		() =>
			(typeof document !== 'undefined'
				? document.visibilityState
				: 'visible') as DocumentVisibilityState,
	);

	useEffect(() => {
		const handleVisibilityChange = () => {
			setVisibility(document.visibilityState as DocumentVisibilityState);
		};

		document.addEventListener('visibilitychange', handleVisibilityChange);
		return () =>
			document.removeEventListener(
				'visibilitychange',
				handleVisibilityChange,
			);
	}, []);

	return visibility;
}
