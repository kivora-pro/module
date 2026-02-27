'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

export interface UseFullscreenReturnValue {
	ref: React.RefObject<HTMLElement | null>;
	toggle: () => Promise<void>;
	fullscreen: boolean;
}

export function useFullscreen(): UseFullscreenReturnValue {
	const ref = useRef<HTMLElement | null>(null);
	const [fullscreen, setFullscreen] = useState(false);

	useEffect(() => {
		const handleChange = () => {
			setFullscreen(document.fullscreenElement !== null);
		};

		document.addEventListener('fullscreenchange', handleChange);
		return () =>
			document.removeEventListener('fullscreenchange', handleChange);
	}, []);

	const toggle = useCallback(async () => {
		if (!document.fullscreenElement) {
			const element = ref.current ?? document.documentElement;
			await element.requestFullscreen();
		} else {
			await document.exitFullscreen();
		}
	}, []);

	return { ref, toggle, fullscreen };
}
