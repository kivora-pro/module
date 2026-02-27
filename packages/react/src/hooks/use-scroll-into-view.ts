'use client';

import { useCallback, useEffect, useRef } from 'react';

export interface ScrollIntoViewOptions {
	alignment?: 'start' | 'end' | 'center';
	axis?: 'x' | 'y';
	duration?: number;
	easing?: (t: number) => number;
	offset?: number;
	onScrollFinish?: () => void;
	cancelable?: boolean;
	isList?: boolean;
}

export interface UseScrollIntoViewReturnValue<
	Target extends HTMLElement,
	Parent extends HTMLElement | null = null,
> {
	scrollIntoView: (params?: {
		alignment?: 'start' | 'end' | 'center';
	}) => void;
	cancel: () => void;
	targetRef: React.RefObject<Target | null>;
	scrollableRef: React.RefObject<Parent | null>;
}

function easeInOutQuad(t: number): number {
	return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}

export function useScrollIntoView<
	Target extends HTMLElement,
	Parent extends HTMLElement | null = null,
>({
	duration = 1250,
	axis = 'y',
	offset = 0,
	easing = easeInOutQuad,
	alignment = 'start',
	onScrollFinish,
	cancelable = true,
	isList = false,
}: ScrollIntoViewOptions = {}): UseScrollIntoViewReturnValue<Target, Parent> {
	const targetRef = useRef<Target | null>(null);
	const scrollableRef = useRef<Parent | null>(null);
	const frameRef = useRef<number | null>(null);
	const startTimeRef = useRef<number>(0);
	const startScrollRef = useRef<number>(0);
	const cancelledRef = useRef(false);

	const cancel = useCallback(() => {
		if (frameRef.current !== null) {
			cancelAnimationFrame(frameRef.current);
			frameRef.current = null;
		}
		cancelledRef.current = true;
	}, []);

	const scrollIntoView = useCallback(
		(params?: { alignment?: 'start' | 'end' | 'center' }) => {
			const targetAlignment = params?.alignment ?? alignment;
			const scrollableEl =
				scrollableRef.current ?? document.documentElement;
			const targetEl = targetRef.current;

			if (!targetEl) return;

			cancelledRef.current = false;

			const scrollStart =
				axis === 'y' ? scrollableEl.scrollTop : scrollableEl.scrollLeft;
			const targetRect = targetEl.getBoundingClientRect();
			const scrollableRect = scrollableEl.getBoundingClientRect();

			let targetPos: number;
			if (axis === 'y') {
				const relativeTop =
					targetRect.top - scrollableRect.top + scrollStart;
				if (targetAlignment === 'start')
					targetPos = relativeTop - offset;
				else if (targetAlignment === 'end')
					targetPos =
						relativeTop -
						scrollableEl.clientHeight +
						targetEl.offsetHeight +
						offset;
				else
					targetPos =
						relativeTop -
						scrollableEl.clientHeight / 2 +
						targetEl.offsetHeight / 2;
			} else {
				const relativeLeft =
					targetRect.left - scrollableRect.left + scrollStart;
				if (targetAlignment === 'start')
					targetPos = relativeLeft - offset;
				else if (targetAlignment === 'end')
					targetPos =
						relativeLeft -
						scrollableEl.clientWidth +
						targetEl.offsetWidth +
						offset;
				else
					targetPos =
						relativeLeft -
						scrollableEl.clientWidth / 2 +
						targetEl.offsetWidth / 2;
			}

			startScrollRef.current = scrollStart;
			startTimeRef.current = performance.now();

			const maxScroll =
				axis === 'y'
					? scrollableEl.scrollHeight - scrollableEl.clientHeight
					: scrollableEl.scrollWidth - scrollableEl.clientWidth;

			const clampedTarget = Math.min(Math.max(targetPos, 0), maxScroll);

			const step = (currentTime: number) => {
				if (cancelledRef.current) return;

				const elapsed = currentTime - startTimeRef.current;
				const progress = Math.min(elapsed / duration, 1);
				const currentPos =
					startScrollRef.current +
					(clampedTarget - startScrollRef.current) * easing(progress);

				if (axis === 'y') {
					scrollableEl.scrollTop = currentPos;
				} else {
					scrollableEl.scrollLeft = currentPos;
				}

				if (progress < 1) {
					frameRef.current = requestAnimationFrame(step);
				} else {
					onScrollFinish?.();
					frameRef.current = null;
				}
			};

			frameRef.current = requestAnimationFrame(step);
		},
		[alignment, axis, duration, easing, offset, onScrollFinish],
	);

	useEffect(() => cancel, [cancel]);

	return { scrollIntoView, cancel, targetRef, scrollableRef };
}
