'use client';

import { useEffect, useRef, useState } from 'react';

export interface MousePosition {
	x: number;
	y: number;
}

export interface UseMouseOptions {
	resetOnExit?: boolean;
}

export function useMouse<T extends HTMLElement = HTMLElement>(
	options?: UseMouseOptions,
): { ref: React.RefObject<T | null>; x: number; y: number } {
	const ref = useRef<T | null>(null);
	const [position, setPosition] = useState<MousePosition>({ x: 0, y: 0 });

	useEffect(() => {
		const element = ref.current ?? document;

		const handleMouseMove = (event: MouseEvent | Event) => {
			const e = event as MouseEvent;
			if (ref.current) {
				const rect = ref.current.getBoundingClientRect();
				setPosition({
					x: Math.round(e.clientX - rect.left),
					y: Math.round(e.clientY - rect.top),
				});
			} else {
				setPosition({ x: e.clientX, y: e.clientY });
			}
		};

		const handleMouseLeave = () => {
			if (options?.resetOnExit) {
				setPosition({ x: 0, y: 0 });
			}
		};

		element.addEventListener('mousemove', handleMouseMove);

		if (ref.current) {
			ref.current.addEventListener('mouseleave', handleMouseLeave);
		}

		return () => {
			element.removeEventListener('mousemove', handleMouseMove);
			if (ref.current) {
				ref.current.removeEventListener('mouseleave', handleMouseLeave);
			}
		};
	}, [options?.resetOnExit]);

	return { ref, x: position.x, y: position.y };
}
