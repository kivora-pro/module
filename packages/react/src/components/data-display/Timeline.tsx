'use client';

import React from 'react';

export interface TimelineItemData {
	title?: React.ReactNode;
	children?: React.ReactNode;
	bullet?: React.ReactNode;
	color?: string;
	lineVariant?: 'solid' | 'dashed' | 'dotted';
}

export interface TimelineProps {
	active?: number;
	bulletSize?: number;
	lineWidth?: number;
	color?: string;
	align?: 'left' | 'right';
	reverseActive?: boolean;
	children: React.ReactNode;
}

export interface TimelineItemProps extends TimelineItemData {
	className?: string;
}

const TimelineCtx = React.createContext<{
	active: number;
	bulletSize: number;
	lineWidth: number;
	color: string;
}>({
	active: -1,
	bulletSize: 20,
	lineWidth: 2,
	color: 'rgb(99 102 241)',
});

export function Timeline({
	active = -1,
	bulletSize = 20,
	lineWidth = 2,
	color = 'rgb(99 102 241)',
	children,
}: TimelineProps) {
	const items = React.Children.toArray(children);
	return (
		<TimelineCtx.Provider value={{ active, bulletSize, lineWidth, color }}>
			<div className='relative'>
				{items.map((item, i) => {
					if (!React.isValidElement(item)) return null;
					const el = item as React.ReactElement<TimelineItemProps>;
					const completed = i <= active;
					return (
						<div
							key={i}
							className='flex gap-4 relative'>
							<div
								className='flex flex-col items-center'
								style={{ width: bulletSize }}>
								<div
									className='rounded-full flex items-center justify-center flex-shrink-0 border-2 border-white shadow'
									style={{
										width: bulletSize,
										height: bulletSize,
										background: completed
											? color
											: '#e5e7eb',
									}}>
									{el.props.bullet ?? (
										<span className='text-white text-xs font-bold'>
											{completed ? '✓' : i + 1}
										</span>
									)}
								</div>
								{i < items.length - 1 && (
									<div
										className='flex-1 mt-1'
										style={{
											width: lineWidth,
											minHeight: '1.5rem',
											background:
												i < active ? color : '#e5e7eb',
										}}
									/>
								)}
							</div>
							<div className='flex-1 pb-6'>
								{el.props.title && (
									<p className='font-semibold text-sm text-on-surface'>
										{el.props.title}
									</p>
								)}
								{el.props.children && (
									<div className='text-sm text-muted mt-1'>
										{el.props.children}
									</div>
								)}
							</div>
						</div>
					);
				})}
			</div>
		</TimelineCtx.Provider>
	);
}

function TimelineItem(_props: TimelineItemProps) {
	return null;
}
TimelineItem.displayName = 'Timeline.Item';
(Timeline as typeof Timeline & { Item: typeof TimelineItem }).Item =
	TimelineItem;
export { TimelineItem };
