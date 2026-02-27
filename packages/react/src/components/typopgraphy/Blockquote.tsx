'use client';

import React from 'react';

export interface BlockquoteProps extends React.BlockquoteHTMLAttributes<HTMLElement> {
	cite?: string;
	icon?: React.ReactNode;
	children: React.ReactNode;
}

export function Blockquote({
	cite,
	icon,
	children,
	className = '',
	...props
}: BlockquoteProps) {
	return (
		<blockquote
			className={[
				'border-l-4 border-brand pl-4 py-2 my-4',
				'text-on-surface',
				className,
			]
				.filter(Boolean)
				.join(' ')}
			{...props}>
			{icon && (
				<span className='text-brand mb-2 block text-2xl'>{icon}</span>
			)}
			<div className='text-base italic'>{children}</div>
			{cite && (
				<footer className='mt-2 text-sm text-on-muted'>
					<cite>{cite}</cite>
				</footer>
			)}
		</blockquote>
	);
}
