'use client';

import { useCallback, useEffect, useRef } from 'react';

export interface UseMovePosition {
	x: number;
	y: number;
}

export interface UseMoveHandlers {
	onScrubStart?: () => void;
	onScrubEnd?: () => void;
}

export interface UseMoveReturnValue {
	ref: React.RefObject<HTMLElement | null>;
	active: boolean;
}

export function clampUseMovePosition(
	position: UseMovePosition,
): UseMovePosition {
	return {
		x: Math.min(Math.max(position.x, 0), 1),
		y: Math.min(Math.max(position.y, 0), 1),
	};
}

export function useMove(
	onChange: (value: UseMovePosition) => void,
	handlers?: UseMoveHandlers,
	dir?: 'ltr' | 'rtl',
): UseMoveReturnValue {
	const ref = useRef<HTMLElement | null>(null);
	const activeRef = useRef(false);
	const isSliding = useRef(false);

	const getPosition = useCallback(
		(event: MouseEvent | TouchEvent) => {
			if (!ref.current) return { x: 0, y: 0 };

			const rect = ref.current.getBoundingClientRect();
			const clientX =
				'touches' in event ? event.touches[0]!.clientX : event.clientX;
			const clientY =
				'touches' in event ? event.touches[0]!.clientY : event.clientY;

			const x = (clientX - rect.left) / rect.width;
			const y = (clientY - rect.top) / rect.height;

			return clampUseMovePosition({ x: dir === 'rtl' ? 1 - x : x, y });
		},
		[dir],
	);

	useEffect(() => {
		const onMouseMove = (event: MouseEvent) => {
			if (isSliding.current) {
				event.preventDefault();
				onChange(getPosition(event));
			}
		};

		const onTouchMove = (event: TouchEvent) => {
			if (isSliding.current) {
				onChange(getPosition(event));
			}
		};

		const onMouseUp = () => {
			if (isSliding.current) {
				isSliding.current = false;
				activeRef.current = false;
				handlers?.onScrubEnd?.();
			}
		};

		document.addEventListener('mousemove', onMouseMove);
		document.addEventListener('mouseup', onMouseUp);
		document.addEventListener('touchmove', onTouchMove);
		document.addEventListener('touchend', onMouseUp);

		return () => {
			document.removeEventListener('mousemove', onMouseMove);
			document.removeEventListener('mouseup', onMouseUp);
			document.removeEventListener('touchmove', onTouchMove);
			document.removeEventListener('touchend', onMouseUp);
		};
	}, [getPosition, handlers]);

	useEffect(() => {
		const element = ref.current;
		if (!element) return;

		const onMouseDown = (event: MouseEvent) => {
			event.preventDefault();
			isSliding.current = true;
			activeRef.current = true;
			handlers?.onScrubStart?.();
			onChange(getPosition(event));
		};

		const onTouchStart = (event: TouchEvent) => {
			isSliding.current = true;
			activeRef.current = true;
			handlers?.onScrubStart?.();
			onChange(getPosition(event));
		};

		element.addEventListener('mousedown', onMouseDown);
		element.addEventListener('touchstart', onTouchStart);

		return () => {
			element.removeEventListener('mousedown', onMouseDown);
			element.removeEventListener('touchstart', onTouchStart);
		};
	}, [getPosition, handlers]);

	return { ref, active: activeRef.current };
}
