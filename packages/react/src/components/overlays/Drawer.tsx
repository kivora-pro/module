'use client';

import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useId } from 'react';
import { Overlay } from './Overlay';

export type DrawerPosition = 'left' | 'right' | 'top' | 'bottom';

export interface DrawerProps {
	opened: boolean;
	onClose: () => void;
	title?: React.ReactNode;
	children?: React.ReactNode;
	position?: DrawerPosition;
	size?: number | string;
	withCloseButton?: boolean;
	overlayProps?: { opacity?: number; blur?: number };
	closeOnClickOutside?: boolean;
	closeOnEscape?: boolean;
	zIndex?: number;
}

const positionClasses: Record<DrawerPosition, string> = {
	left: 'left-0 top-0 h-full',
	right: 'right-0 top-0 h-full',
	top: 'top-0 left-0 w-full',
	bottom: 'bottom-0 left-0 w-full',
};

const defaultSize: Record<DrawerPosition, string> = {
	left: '320px',
	right: '320px',
	top: '40vh',
	bottom: '40vh',
};

const slideVariants: Record<DrawerPosition, { x?: string; y?: string }> = {
	left: { x: '-100%' },
	right: { x: '100%' },
	top: { y: '-100%' },
	bottom: { y: '100%' },
};

export function Drawer({
	opened,
	onClose,
	title,
	children,
	position = 'right',
	size,
	withCloseButton = true,
	overlayProps,
	closeOnClickOutside = true,
	closeOnEscape = true,
	zIndex = 300,
}: DrawerProps) {
	const titleId = useId();

	useEffect(() => {
		if (!opened || !closeOnEscape) return;
		const handler = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
		document.addEventListener('keydown', handler);
		return () => document.removeEventListener('keydown', handler);
	}, [opened, closeOnEscape, onClose]);

	const isHorizontal = position === 'left' || position === 'right';
	const dimensionStyle = isHorizontal
		? { width: size ?? defaultSize[position] }
		: { height: size ?? defaultSize[position] };

	return (
		<AnimatePresence>
			{opened && (
				<motion.div
					className='fixed inset-0'
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: 0.18 }}
					style={{ zIndex }}>
					<Overlay
						opacity={overlayProps?.opacity ?? 0.55}
						blur={overlayProps?.blur}
						onClick={closeOnClickOutside ? onClose : undefined}
					/>
					<motion.div
						role='dialog'
						aria-modal='true'
						aria-labelledby={title ? titleId : undefined}
						className={[
							'absolute bg-surface-elevated text-on-surface shadow-xl flex flex-col',
							positionClasses[position],
						].join(' ')}
						initial={slideVariants[position]}
						animate={{ x: 0, y: 0 }}
						exit={slideVariants[position]}
						transition={{
							duration: 0.25,
							ease: [0.32, 0.72, 0, 1],
						}}
						style={dimensionStyle}>
						{(title || withCloseButton) && (
							<div className='flex items-center justify-between px-6 py-4 border-b border-border flex-shrink-0'>
								{title && (
									<h2
										id={titleId}
										className='font-semibold text-lg'>
										{title}
									</h2>
								)}
								{withCloseButton && (
									<button
										type='button'
										onClick={onClose}
										aria-label='Close drawer'
										className='ml-auto p-1.5 rounded hover:bg-muted/40 transition-colors'>
										<svg
											className='w-5 h-5'
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
						<div className='flex-1 overflow-auto px-6 py-4'>
							{children}
						</div>
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	);
}
