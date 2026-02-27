'use client';

import { motion } from 'framer-motion';
import React from 'react';

export interface NotificationProps extends Omit<
	React.HTMLAttributes<HTMLDivElement>,
	'title'
> {
	title?: React.ReactNode;
	icon?: React.ReactNode;
	color?: string;
	loading?: boolean;
	withCloseButton?: boolean;
	onClose?: () => void;
	closeButtonProps?: React.ButtonHTMLAttributes<HTMLButtonElement>;
	withBorder?: boolean;
	radius?: string;
	children?: React.ReactNode;
}

export const Notification = React.forwardRef<HTMLDivElement, NotificationProps>(
	(
		{
			title,
			icon,
			loading,
			withCloseButton = true,
			onClose,
			withBorder = true,
			children,
			className = '',
			...props
		},
		ref,
	) => {
		return (
			<motion.div
				initial={{ opacity: 0, x: 40 }}
				animate={{ opacity: 1, x: 0 }}
				exit={{ opacity: 0, x: 40 }}
				transition={{ duration: 0.25, ease: 'easeOut' }}>
				<div
					ref={ref}
					role='status'
					aria-live='polite'
					className={[
						'flex items-start gap-3 rounded-md p-4 bg-surface-elevated text-on-surface shadow-lg',
						withBorder ? 'border border-border' : '',
						className,
					]
						.filter(Boolean)
						.join(' ')}
					{...props}>
					{(icon || loading) && (
						<span className='flex-shrink-0 mt-0.5'>
							{loading ? (
								<svg
									className='w-5 h-5 animate-spin text-brand'
									viewBox='0 0 24 24'
									fill='none'>
									<circle
										cx='12'
										cy='12'
										r='10'
										stroke='currentColor'
										strokeWidth='3'
										strokeDasharray='31.4'
										strokeLinecap='round'
									/>
								</svg>
							) : (
								icon
							)}
						</span>
					)}
					<div className='flex-1 min-w-0'>
						{title && (
							<p className='font-semibold text-sm mb-0.5'>
								{title}
							</p>
						)}
						{children && (
							<div className='text-sm text-muted'>{children}</div>
						)}
					</div>
					{withCloseButton && (
						<button
							type='button'
							onClick={onClose}
							aria-label='Close notification'
							className='flex-shrink-0 p-1 rounded opacity-60 hover:opacity-100 transition-opacity'>
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
			</motion.div>
		);
	},
);
Notification.displayName = 'Notification';
