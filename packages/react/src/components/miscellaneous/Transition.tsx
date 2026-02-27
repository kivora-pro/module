'use client';

import React, { useEffect, useRef, useState } from 'react';

export type TransitionName =
	| 'fade'
	| 'fade-up'
	| 'fade-down'
	| 'fade-left'
	| 'fade-right'
	| 'slide-up'
	| 'slide-down'
	| 'slide-left'
	| 'slide-right'
	| 'rotate-left'
	| 'rotate-right'
	| 'scale'
	| 'scale-y'
	| 'scale-x'
	| 'skew-up'
	| 'skew-down'
	| 'pop'
	| 'pop-top-left'
	| 'pop-top-right'
	| 'pop-bottom-left'
	| 'pop-bottom-right';

export interface TransitionProps {
	mounted: boolean;
	transition?:
		| TransitionName
		| {
				in: React.CSSProperties;
				out: React.CSSProperties;
				common?: React.CSSProperties;
				transitionProperty: string;
		  };
	duration?: number;
	exitDuration?: number;
	timingFunction?: string;
	keepMounted?: boolean;
	onEnter?: () => void;
	onExit?: () => void;
	onEntered?: () => void;
	onExited?: () => void;
	children: (styles: React.CSSProperties) => React.ReactElement;
}

type Phase = 'out' | 'entering' | 'in' | 'exiting';

const builtIn: Record<
	string,
	{
		in: React.CSSProperties;
		out: React.CSSProperties;
		transitionProperty: string;
	}
> = {
	fade: {
		in: { opacity: 1 },
		out: { opacity: 0 },
		transitionProperty: 'opacity',
	},
	'fade-up': {
		in: { opacity: 1, transform: 'translateY(0)' },
		out: { opacity: 0, transform: 'translateY(1rem)' },
		transitionProperty: 'opacity, transform',
	},
	'fade-down': {
		in: { opacity: 1, transform: 'translateY(0)' },
		out: { opacity: 0, transform: 'translateY(-1rem)' },
		transitionProperty: 'opacity, transform',
	},
	scale: {
		in: { opacity: 1, transform: 'scale(1)' },
		out: { opacity: 0, transform: 'scale(0.9)' },
		transitionProperty: 'opacity, transform',
	},
	'slide-up': {
		in: { opacity: 1, transform: 'translateY(0)' },
		out: { opacity: 0, transform: 'translateY(100%)' },
		transitionProperty: 'opacity, transform',
	},
	'slide-down': {
		in: { opacity: 1, transform: 'translateY(0)' },
		out: { opacity: 0, transform: 'translateY(-100%)' },
		transitionProperty: 'opacity, transform',
	},
};

export function Transition({
	mounted,
	transition = 'fade',
	duration = 250,
	exitDuration,
	timingFunction = 'ease',
	keepMounted = false,
	onEnter,
	onExit,
	onEntered,
	onExited,
	children,
}: TransitionProps) {
	const [phase, setPhase] = useState<Phase>(mounted ? 'in' : 'out');
	const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

	useEffect(() => {
		if (timer.current) clearTimeout(timer.current);
		if (mounted) {
			onEnter?.();
			setPhase('entering');
			timer.current = setTimeout(() => {
				setPhase('in');
				onEntered?.();
			}, duration);
		} else {
			onExit?.();
			setPhase('exiting');
			timer.current = setTimeout(() => {
				setPhase('out');
				onExited?.();
			}, exitDuration ?? duration);
		}
		return () => {
			if (timer.current) clearTimeout(timer.current);
		};
	}, [mounted]);

	if (phase === 'out' && !keepMounted) return null;

	const def =
		typeof transition === 'string'
			? (builtIn[transition] ?? builtIn.fade)
			: transition;
	const isIn = phase === 'in' || phase === 'entering';
	const styles: React.CSSProperties = {
		...(
			def as {
				in: React.CSSProperties;
				out: React.CSSProperties;
				transitionProperty: string;
			} & { common?: React.CSSProperties }
		).common,
		...(isIn ? def.in : def.out),
		transitionProperty: (def as { transitionProperty: string })
			.transitionProperty,
		transitionDuration: `${isIn ? duration : (exitDuration ?? duration)}ms`,
		transitionTimingFunction: timingFunction,
	};

	return children(styles);
}
