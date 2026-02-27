'use client';

/**
 * @ott-template/ui – Modals extension
 * Imperative modal manager.
 *
 * Usage:
 *   import { modals } from '@ott-template/ui/extensions/modals';
 *   const id = modals.open({ title: 'Confirm', children: <p>Are you sure?</p> });
 *   modals.close(id);
 */

import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import type { ModalProps } from '../../overlays/Modal';

export interface ModalEntry {
	id: string;
	props: Omit<ModalProps, 'opened' | 'onClose'> & { onClose?: () => void };
}

type Listener = (modals: ModalEntry[]) => void;

let _modals: ModalEntry[] = [];
const _listeners: Set<Listener> = new Set();
let _counter = 0;

function notify() {
	_listeners.forEach((l) => l([..._modals]));
}

export const modals = {
	open(
		props: Omit<ModalProps, 'opened' | 'onClose'> & {
			onClose?: () => void;
		},
	): string {
		const id = `modal-${++_counter}`;
		_modals = [..._modals, { id, props }];
		notify();
		return id;
	},
	close(id: string) {
		const found = _modals.find((m) => m.id === id);
		_modals = _modals.filter((m) => m.id !== id);
		notify();
		found?.props.onClose?.();
	},
	closeAll() {
		_modals.forEach((m) => m.props.onClose?.());
		_modals = [];
		notify();
	},
	openConfirmModal(props: {
		title?: React.ReactNode;
		children?: React.ReactNode;
		labels?: { confirm?: string; cancel?: string };
		onConfirm?: () => void;
		onCancel?: () => void;
	}): string {
		return modals.open({
			title: props.title,
			children: (
				<div>
					{props.children}
					<div className='flex gap-2 justify-end mt-4'>
						<button
							type='button'
							className='px-4 py-2 text-sm rounded border border-border text-on-surface hover:bg-muted/20 transition-colors'
							onClick={() => {
								modals.close('pending');
								props.onCancel?.();
							}}>
							{props.labels?.cancel ?? 'Cancel'}
						</button>
						<button
							type='button'
							className='px-4 py-2 text-sm rounded bg-brand text-white hover:bg-brand/90 transition-colors'
							onClick={() => {
								modals.close('pending');
								props.onConfirm?.();
							}}>
							{props.labels?.confirm ?? 'Confirm'}
						</button>
					</div>
				</div>
			),
		});
	},
	subscribe(fn: Listener) {
		_listeners.add(fn);
		return () => {
			_listeners.delete(fn);
		};
	},
};

// ── ModalsProvider ────────────────────────────────────────────────────────────

import { Modal } from '../../overlays/Modal';

export function ModalsProvider({ children }: { children?: React.ReactNode }) {
	const [items, setItems] = useState<ModalEntry[]>([]);
	useEffect(() => modals.subscribe(setItems), []);

	return (
		<>
			{children}
			{items.map(({ id, props }) =>
				typeof document !== 'undefined'
					? createPortal(
							<Modal
								key={id}
								opened
								onClose={() => modals.close(id)}
								{...props}
							/>,
							document.body,
						)
					: null,
			)}
		</>
	);
}
