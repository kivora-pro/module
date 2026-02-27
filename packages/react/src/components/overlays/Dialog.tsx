'use client';

import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';

export interface DialogProps {
	opened: boolean;
	onClose: () => void;
	title?: React.ReactNode;
	children?: React.ReactNode;
	size?: 'xs' | 'sm' | 'md';
	withCloseButton?: boolean;
	withBorder?: boolean;
	p?: number | string;
	radius?: string;
	shadow?: string;
	position?: {
		top?: number | string;
		bottom?: number | string;
		left?: number | string;
		right?: number | string;
	};
}

export function Dialog({
	opened,
	onClose,
	title,
	children,
	size = 'sm',
	withCloseButton = true,
	position,
}: DialogProps) {
	const pos = position ?? { bottom: '1rem', right: '1rem' };

	// Determina si el panel crece hacia arriba o hacia abajo según la posición
	const slidesUp = pos.bottom !== undefined && pos.top === undefined;

	return (
		<AnimatePresence>
			{opened && (
				<motion.div
					className='fixed z-40'
					style={pos}
					initial={{
						opacity: 0,
						y: slidesUp ? 16 : -16,
						scale: 0.96,
					}}
					animate={{ opacity: 1, y: 0, scale: 1 }}
					exit={{ opacity: 0, y: slidesUp ? 16 : -16, scale: 0.96 }}
					transition={{
						type: 'spring',
						stiffness: 420,
						damping: 30,
					}}>
					<div className='bg-surface-elevated text-on-surface rounded-lg shadow-xl border border-border w-full max-w-xs'>
						{(title || withCloseButton) && (
							<div className='flex items-center justify-between px-4 py-3 border-b border-border'>
								{title && (
									<p className='font-semibold text-sm'>
										{title}
									</p>
								)}
								{withCloseButton && (
									<button
										type='button'
										onClick={onClose}
										aria-label='Close dialog'
										className='ml-auto p-1 rounded hover:bg-muted/40 transition-colors'>
										<svg
											className='w-4 h-4'
											viewBox='0 0 20 20'
											fill='currentColor'>
											<path
												fillRule='evenodd'
												d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
												clipRule='evenodd'
											/>
										</svg>
									</button>
								)}
							</div>
						)}
						<div className='px-4 py-3'>{children}</div>
					</div>
				</motion.div>
			)}
		</AnimatePresence>
	);
}
