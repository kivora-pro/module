'use client';

import { useCallback, useEffect, useState } from 'react';

export interface WindowScrollPosition {
	x: number;
	y: number;
}

export function useWindowScroll(): [
	WindowScrollPosition,
	(position: Partial<WindowScrollPosition>) => void,
] {
	const [position, setPosition] = useState<WindowScrollPosition>({
		x: 0,
		y: 0,
	});

	useEffect(() => {
		const handleScroll = () => {
			setPosition({ x: window.scrollX, y: window.scrollY });
		};

		handleScroll();
		window.addEventListener('scroll', handleScroll, { passive: true });
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	const scrollTo = useCallback((pos: Partial<WindowScrollPosition>) => {
		window.scrollTo({
			left: pos.x,
			top: pos.y,
			behavior: 'smooth',
		});
	}, []);

	return [position, scrollTo];
}
