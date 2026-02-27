'use client';

import React from 'react';
import { createPortal } from 'react-dom';

export interface AffixProps {
	children: React.ReactNode;
	position?: {
		top?: number | string;
		bottom?: number | string;
		left?: number | string;
		right?: number | string;
	};
	zIndex?: number;
	withinPortal?: boolean;
}

export function Affix({
	children,
	position = { bottom: '1rem', right: '1rem' },
	zIndex = 200,
	withinPortal = true,
}: AffixProps) {
	const el = (
		<div
			className='fixed'
			style={{ ...position, zIndex }}>
			{children}
		</div>
	);
	if (withinPortal && typeof document !== 'undefined') {
		return createPortal(el, document.body);
	}
	return el;
}
