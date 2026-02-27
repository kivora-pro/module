'use client';

import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useId, useRef } from 'react';
import { Overlay } from './Overlay';

export interface ModalProps {
	opened: boolean;
	onClose: () => void;
	title?: React.ReactNode;
	children?: React.ReactNode;
	size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
	centered?: boolean;
	withCloseButton?: boolean;
	overlayProps?: { opacity?: number; blur?: number };
	closeOnClickOutside?: boolean;
	closeOnEscape?: boolean;
	trapFocus?: boolean;
	returnFocus?: boolean;
	lockScroll?: boolean;
	transitionProps?: { transition?: string; duration?: number };
	zIndex?: number;
	padding?: number | string;
	radius?: string;
	shadow?: string;
}

const sizeMap: Record<string, string> = {
	xs: 'max-w-xs',
	sm: 'max-w-sm',
	md: 'max-w-lg',
	lg: 'max-w-2xl',
	xl: 'max-w-4xl',
	full: 'max-w-full mx-4',
};

export function Modal({
	opened,
	onClose,
	title,
	children,
	size = 'md',
	centered = false,
	withCloseButton = true,
	overlayProps,
	closeOnClickOutside = true,
	closeOnEscape = true,
	zIndex = 300,
}: ModalProps) {
	const titleId = useId();
	const contentRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!opened || !closeOnEscape) return;
		const handler = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
		document.addEventListener('keydown', handler);
		return () => document.removeEventListener('keydown', handler);
	}, [opened, closeOnEscape, onClose]);

	if (!opened && typeof window === 'undefined') return null;

	return (
		<AnimatePresence>
			{opened && (
				<motion.div
					role='dialog'
					aria-modal='true'
					aria-labelledby={title ? titleId : undefined}
					className='fixed inset-0 flex overflow-auto'
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: 0.18 }}
					style={{
						zIndex,
						alignItems: centered ? 'center' : 'flex-start',
						justifyContent: 'center',
						padding: '2rem 1rem',
					}}>
					<Overlay
						opacity={overlayProps?.opacity ?? 0.55}
						blur={overlayProps?.blur}
						onClick={closeOnClickOutside ? onClose : undefined}
						zIndex={-1}
					/>
					<motion.div
						ref={contentRef}
						initial={{ opacity: 0, scale: 0.95, y: 10 }}
						animate={{ opacity: 1, scale: 1, y: 0 }}
						exit={{ opacity: 0, scale: 0.95, y: 10 }}
						transition={{ duration: 0.2, ease: 'easeOut' }}
						className={[
							'relative bg-surface-elevated text-on-surface rounded-lg shadow-xl w-full focus:outline-none',
							sizeMap[size],
						]
							.filter(Boolean)
							.join(' ')}
						tabIndex={-1}>
						{(title || withCloseButton) && (
							<div className='flex items-center justify-between px-6 py-4 border-b border-border'>
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
										aria-label='Close modal'
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
						<div className='px-6 py-4'>{children}</div>
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	);
}

// ── Modal.Root / Modal.Header / Modal.Body / Modal.Footer (compound) ─────────

function ModalRoot(props: ModalProps) {
	return <Modal {...props} />;
}
ModalRoot.displayName = 'Modal';

function ModalHeader({
	children,
	className = '',
	...props
}: React.HTMLAttributes<HTMLDivElement>) {
	return (
		<div
			className={[
				'flex items-center justify-between px-6 py-4 border-b border-border',
				className,
			]
				.filter(Boolean)
				.join(' ')}
			{...props}>
			{children}
		</div>
	);
}
ModalHeader.displayName = 'Modal.Header';

function ModalTitle({
	children,
	className = '',
	...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
	return (
		<h2
			className={['font-semibold text-lg', className]
				.filter(Boolean)
				.join(' ')}
			{...props}>
			{children}
		</h2>
	);
}
ModalTitle.displayName = 'Modal.Title';

function ModalBody({
	children,
	className = '',
	...props
}: React.HTMLAttributes<HTMLDivElement>) {
	return (
		<div
			className={['px-6 py-4', className].filter(Boolean).join(' ')}
			{...props}>
			{children}
		</div>
	);
}
ModalBody.displayName = 'Modal.Body';

function ModalFooter({
	children,
	className = '',
	...props
}: React.HTMLAttributes<HTMLDivElement>) {
	return (
		<div
			className={[
				'flex items-center justify-end gap-3 px-6 py-4 border-t border-border',
				className,
			]
				.filter(Boolean)
				.join(' ')}
			{...props}>
			{children}
		</div>
	);
}
ModalFooter.displayName = 'Modal.Footer';

(
	Modal as typeof Modal & {
		Header: typeof ModalHeader;
		Title: typeof ModalTitle;
		Body: typeof ModalBody;
		Footer: typeof ModalFooter;
	}
).Header = ModalHeader;
(Modal as typeof Modal & { Title: typeof ModalTitle }).Title = ModalTitle;
(Modal as typeof Modal & { Body: typeof ModalBody }).Body = ModalBody;
(Modal as typeof Modal & { Footer: typeof ModalFooter }).Footer = ModalFooter;

export { ModalBody, ModalFooter, ModalHeader, ModalTitle };
