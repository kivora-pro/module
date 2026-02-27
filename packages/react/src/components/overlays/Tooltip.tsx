'use client';

import { AnimatePresence, motion } from 'framer-motion';
import React, { useId, useState } from 'react';

export type TooltipPosition = 'top' | 'bottom' | 'left' | 'right';

export interface TooltipProps {
	label: React.ReactNode;
	children: React.ReactElement;
	position?: TooltipPosition;
	disabled?: boolean;
	withArrow?: boolean;
	arrowSize?: number;
	offset?: number;
	delay?: number;
	multiline?: boolean;
	width?: number | string;
}

const positionClasses: Record<TooltipPosition, string> = {
	top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
	bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
	left: 'right-full top-1/2 -translate-y-1/2 mr-2',
	right: 'left-full top-1/2 -translate-y-1/2 ml-2',
};

const arrowClasses: Record<TooltipPosition, string> = {
	top: 'absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-neutral-800',
	bottom: 'absolute bottom-full left-1/2 -translate-x-1/2 border-4 border-transparent border-b-neutral-800',
	left: 'absolute left-full top-1/2 -translate-y-1/2 border-4 border-transparent border-l-neutral-800',
	right: 'absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-neutral-800',
};

export function Tooltip({
	label,
	children,
	position = 'top',
	disabled = false,
	withArrow = false,
	multiline = false,
	width,
}: TooltipProps) {
	const [visible, setVisible] = useState(false);
	const id = useId();

	if (disabled) return children;

	return (
		<span className='relative inline-block'>
			{React.cloneElement(children, {
				'aria-describedby': id,
				onMouseEnter: () => setVisible(true),
				onMouseLeave: () => setVisible(false),
				onFocus: () => setVisible(true),
				onBlur: () => setVisible(false),
			})}
			<AnimatePresence>
				{visible && (
					<motion.span
						id={id}
						role='tooltip'
						initial={{ opacity: 0, scale: 0.88 }}
						animate={{ opacity: 1, scale: 1 }}
						exit={{ opacity: 0, scale: 0.88 }}
						transition={{ duration: 0.12, ease: 'easeOut' }}
						className={[
							'absolute z-50 px-2 py-1 text-xs rounded bg-neutral-800 text-white pointer-events-none',
							multiline
								? 'whitespace-normal break-words'
								: 'whitespace-nowrap',
							positionClasses[position],
						]
							.filter(Boolean)
							.join(' ')}
						style={{
							width,
							maxWidth: multiline && !width ? '14rem' : undefined,
						}}>
						{withArrow && (
							<span className={arrowClasses[position]} />
						)}
						{label}
					</motion.span>
				)}
			</AnimatePresence>
		</span>
	);
}
