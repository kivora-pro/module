'use client';

import React from 'react';

export interface ScrollAreaProps extends React.HTMLAttributes<HTMLDivElement> {
	type?: 'auto' | 'always' | 'scroll' | 'hover' | 'never';
	scrollbarSize?: number;
	offsetScrollbars?: boolean;
	viewportRef?: React.Ref<HTMLDivElement>;
	onScrollPositionChange?: (pos: { x: number; y: number }) => void;
	scrollHideDelay?: number;
	h?: number | string;
	w?: number | string;
	mah?: number | string;
	maw?: number | string;
	children?: React.ReactNode;
}

const overflowMap: Record<string, string> = {
	auto: 'overflow-auto',
	always: 'overflow-scroll',
	scroll: 'overflow-scroll',
	hover: 'overflow-hidden hover:overflow-auto',
	never: 'overflow-hidden',
};

export const ScrollArea = React.forwardRef<HTMLDivElement, ScrollAreaProps>(
	(
		{
			type = 'auto',
			h,
			w,
			mah,
			maw,
			children,
			className = '',
			style,
			onScrollPositionChange,
			viewportRef,
			...props
		},
		ref,
	) => {
		const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
			onScrollPositionChange?.({
				x: e.currentTarget.scrollLeft,
				y: e.currentTarget.scrollTop,
			});
		};
		return (
			<div
				ref={ref}
				className={[overflowMap[type] ?? 'overflow-auto', className]
					.filter(Boolean)
					.join(' ')}
				style={{
					height: h,
					width: w,
					maxHeight: mah,
					maxWidth: maw,
					...style,
				}}
				onScroll={onScrollPositionChange ? handleScroll : undefined}
				{...props}>
				{children}
			</div>
		);
	},
);
ScrollArea.displayName = 'ScrollArea';

function ScrollAreaAutosize(props: ScrollAreaProps) {
	return (
		<ScrollArea
			{...props}
			type='auto'
		/>
	);
}
ScrollAreaAutosize.displayName = 'ScrollArea.Autosize';
(
	ScrollArea as typeof ScrollArea & { Autosize: typeof ScrollAreaAutosize }
).Autosize = ScrollAreaAutosize;
