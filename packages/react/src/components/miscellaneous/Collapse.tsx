'use client';

import React, { useEffect, useRef } from 'react';

export interface CollapseProps {
	in: boolean;
	animateOpacity?: boolean;
	transitionDuration?: number;
	transitionTimingFunction?: string;
	onTransitionEnd?: () => void;
	children: React.ReactNode;
}

export function Collapse({
	in: opened,
	animateOpacity = true,
	transitionDuration = 200,
	transitionTimingFunction = 'ease',
	onTransitionEnd,
	children,
}: CollapseProps) {
	const ref = useRef<HTMLDivElement>(null);
	const [height, setHeight] = React.useState<number | undefined>(
		opened ? undefined : 0,
	);
	const [opacity, setOpacity] = React.useState(opened ? 1 : 0);

	useEffect(() => {
		if (!ref.current) return;
		if (opened) {
			const scrollHeight = ref.current.scrollHeight;
			setHeight(scrollHeight);
			if (animateOpacity) setOpacity(1);
			const timer = setTimeout(() => {
				setHeight(undefined);
				onTransitionEnd?.();
			}, transitionDuration);
			return () => clearTimeout(timer);
		} else {
			setHeight(ref.current.scrollHeight);
			requestAnimationFrame(() => {
				setHeight(0);
				if (animateOpacity) setOpacity(0);
			});
			const timer = setTimeout(
				() => onTransitionEnd?.(),
				transitionDuration,
			);
			return () => clearTimeout(timer);
		}
	}, [opened]);

	return (
		<div
			ref={ref}
			style={{
				height,
				overflow: 'hidden',
				opacity: animateOpacity ? opacity : undefined,
				transition: `height ${transitionDuration}ms ${transitionTimingFunction}${animateOpacity ? `, opacity ${transitionDuration}ms ${transitionTimingFunction}` : ''}`,
			}}>
			{children}
		</div>
	);
}
