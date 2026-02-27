'use client';

import React from 'react';

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
	height?: number | string;
	width?: number | string;
	circle?: boolean;
	radius?: number | string;
	animate?: boolean;
	visible?: boolean;
	children?: React.ReactNode;
}

export const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
	(
		{
			height,
			width,
			circle = false,
			radius,
			animate = true,
			visible = true,
			children,
			className = '',
			style,
			...props
		},
		ref,
	) => {
		if (!visible && children) {
			return <>{children}</>;
		}
		return (
			<div
				ref={ref}
				className={[
					'relative overflow-hidden bg-muted/40',
					animate ? 'animate-pulse' : '',
					circle ? 'rounded-full' : '',
					className,
				]
					.filter(Boolean)
					.join(' ')}
				style={{
					height: circle ? (width ?? height ?? 40) : height,
					width: circle ? (width ?? height ?? 40) : width,
					borderRadius: radius ?? (circle ? '50%' : undefined),
					...style,
				}}
				aria-hidden='true'
				{...props}>
				{!visible && children}
			</div>
		);
	},
);
Skeleton.displayName = 'Skeleton';
