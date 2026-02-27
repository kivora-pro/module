'use client';

/**
 * @ott-template/ui – Spotlight extension
 * Command palette / quick-search overlay.
 *
 * Usage:
 *   import { spotlight, SpotlightProvider } from '@ott-template/ui/extensions/spotlight';
 *   spotlight.open();
 */

import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

export interface SpotlightAction {
	id: string;
	label: string;
	description?: string;
	keywords?: string[];
	leftSection?: React.ReactNode;
	rightSection?: React.ReactNode;
	onClick?: () => void;
	group?: string;
}

type Listener = (opened: boolean) => void;
const _listeners: Set<Listener> = new Set();
let _opened = false;
function notify() { _listeners.forEach((l) => l(_opened)); }

export const spotlight = {
	open() { _opened = true; notify(); },
	close() { _opened = false; notify(); },
	toggle() { _opened = !_opened; notify(); },
	subscribe: (fn: Listener) => { _listeners.add(fn); return () => { _listeners.delete(fn); }; },
};

export interface SpotlightProviderProps {
	actions: SpotlightAction[];
	searchProps?: React.InputHTMLAttributes<HTMLInputElement>;
	limit?: number;
	nothingFound?: React.ReactNode;
	highlightQuery?: boolean;
	filter?: (query: string, action: SpotlightAction) => boolean;
	shortcut?: string;
	children?: React.ReactNode;
}

export function SpotlightProvider({ actions, searchProps, limit = 10, nothingFound = 'Nothing found', filter, children }: SpotlightProviderProps) {
	const [opened, setOpened] = useState(false);
	const [query, setQuery] = useState('');
	const inputRef = useRef<HTMLInputElement>(null);

	useEffect(() => spotlight.subscribe(setOpened), []);
	useEffect(() => { if (opened) { setTimeout(() => inputRef.current?.focus(), 50); setQuery(''); } }, [opened]);
	useEffect(() => {
		const handler = (e: KeyboardEvent) => { if (e.key === 'k' && (e.metaKey || e.ctrlKey)) { e.preventDefault(); spotlight.toggle(); } if (e.key === 'Escape') spotlight.close(); };
		document.addEventListener('keydown', handler);
		return () => document.removeEventListener('keydown', handler);
	}, []);

	const filtered = actions
		.filter((a) => filter ? filter(query, a) : !query || a.label.toLowerCase().includes(query.toLowerCase()) || a.keywords?.some((k) => k.toLowerCase().includes(query.toLowerCase())))
		.slice(0, limit);

	if (!opened || typeof document === 'undefined') return <>{children}</>;

	return (
		<>
			{children}
			{createPortal(
				<div className='fixed inset-0 z-[99999] flex items-start justify-center pt-[15vh]' onClick={() => spotlight.close()}>
					<div className='w-full max-w-lg bg-surface rounded-xl border border-border shadow-2xl overflow-hidden' onClick={(e) => e.stopPropagation()}>
						<div className='border-b border-border'>
							<input
								ref={inputRef}
								value={query}
								onChange={(e) => setQuery(e.target.value)}
								placeholder='Search...'
								className='w-full px-4 py-3 text-sm bg-transparent outline-none text-on-surface placeholder:text-muted'
								{...searchProps}
							/>
						</div>
						<div className='max-h-72 overflow-y-auto'>
							{filtered.length === 0
								? <div className='px-4 py-8 text-center text-sm text-muted'>{nothingFound}</div>
								: filtered.map((a) => (
									<div
										key={a.id}
										onClick={() => { a.onClick?.(); spotlight.close(); }}
										className='flex items-center gap-3 px-4 py-2.5 cursor-pointer hover:bg-muted/20 transition-colors'>
										{a.leftSection && <span className='flex-shrink-0 text-muted'>{a.leftSection}</span>}
										<div className='flex-1 min-w-0'>
											<div className='text-sm font-medium text-on-surface'>{a.label}</div>
											{a.description && <div className='text-xs text-muted truncate'>{a.description}</div>}
										</div>
										{a.rightSection && <span className='flex-shrink-0 text-muted'>{a.rightSection}</span>}
									</div>
								))}
						</div>
					</div>
				</div>,
				document.body,
			)}
		</>
	);
}
