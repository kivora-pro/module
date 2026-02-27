'use client';

import { useEffect, useRef, useState } from 'react';

export interface UseHeadroomOptions {
	fixedAt?: number;
}

export function useHeadroom({ fixedAt = 0 }: UseHeadroomOptions = {}): boolean {
	const [pinned, setPinned] = useState(true);
	const lastScrollRef = useRef(0);
	const frameRef = useRef<number | null>(null);

	useEffect(() => {
		const handleScroll = () => {
			if (frameRef.current !== null) {
				cancelAnimationFrame(frameRef.current);
			}

			frameRef.current = requestAnimationFrame(() => {
				const currentScroll = window.scrollY;

				if (currentScroll <= fixedAt) {
					setPinned(true);
				} else if (currentScroll < lastScrollRef.current) {
					setPinned(true);
				} else if (currentScroll > lastScrollRef.current) {
					setPinned(false);
				}

				lastScrollRef.current = currentScroll;
			});
		};

		window.addEventListener('scroll', handleScroll, { passive: true });
		return () => {
			window.removeEventListener('scroll', handleScroll);
			if (frameRef.current !== null) {
				cancelAnimationFrame(frameRef.current);
			}
		};
	}, [fixedAt]);

	return pinned;
}
