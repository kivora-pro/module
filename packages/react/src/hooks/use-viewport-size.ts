'use client';

import { useEffect, useState } from 'react';

export interface ViewportSize {
	width: number;
	height: number;
}

export function useViewportSize(): ViewportSize {
	const [size, setSize] = useState<ViewportSize>({ width: 0, height: 0 });

	useEffect(() => {
		const handleResize = () => {
			setSize({ width: window.innerWidth, height: window.innerHeight });
		};

		handleResize();
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	return size;
}
