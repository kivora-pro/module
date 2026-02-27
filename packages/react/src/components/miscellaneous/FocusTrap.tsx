'use client';

import React, { useEffect, useRef } from 'react';

export interface FocusTrapProps {
	active?: boolean;
	children: React.ReactNode;
}

const FOCUSABLE = [
	'a[href]',
	'button:not([disabled])',
	'input:not([disabled])',
	'select:not([disabled])',
	'textarea:not([disabled])',
	'[tabindex]:not([tabindex="-1"])',
].join(',');

export function FocusTrap({ active = true, children }: FocusTrapProps) {
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!active || !ref.current) return;
		const container = ref.current;
		const focusable = Array.from(
			container.querySelectorAll<HTMLElement>(FOCUSABLE),
		);
		if (focusable.length) focusable[0].focus();

		const handler = (e: KeyboardEvent) => {
			if (e.key !== 'Tab') return;
			const current = focusable.filter((el) => !el.closest('[disabled]'));
			const first = current[0];
			const last = current[current.length - 1];
			if (
				e.shiftKey
					? document.activeElement === first
					: document.activeElement === last
			) {
				e.preventDefault();
				(e.shiftKey ? last : first).focus();
			}
		};
		document.addEventListener('keydown', handler);
		return () => document.removeEventListener('keydown', handler);
	}, [active]);

	return <div ref={ref}>{children}</div>;
}
