'use client';

import { AnimatePresence, motion } from 'framer-motion';
import React, { useState } from 'react';

export interface AccordionProps {
	value?: string | string[] | null;
	defaultValue?: string | string[] | null;
	onChange?: (value: string | string[] | null) => void;
	multiple?: boolean;
	variant?: 'default' | 'contained' | 'filled' | 'separated';
	radius?: string;
	chevronPosition?: 'right' | 'left';
	chevron?: React.ReactNode;
	disableChevronRotation?: boolean;
	order?: 2 | 3 | 4 | 5 | 6;
	children: React.ReactNode;
}

export interface AccordionItemProps {
	value: string;
	disabled?: boolean;
	children: React.ReactNode;
}

export interface AccordionControlProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	chevron?: React.ReactNode;
	icon?: React.ReactNode;
	children?: React.ReactNode;
}

export interface AccordionPanelProps extends React.HTMLAttributes<HTMLDivElement> {
	children?: React.ReactNode;
}

const AccordionCtx = React.createContext<{
	isOpen: (v: string) => boolean;
	toggle: (v: string) => void;
	chevronPosition: 'right' | 'left';
	chevron: React.ReactNode;
	disableChevronRotation: boolean;
} | null>(null);

const AccordionItemCtx = React.createContext<{
	value: string;
	disabled: boolean;
} | null>(null);

function useAccordionCtx() {
	const ctx = React.useContext(AccordionCtx);
	if (!ctx)
		throw new Error(
			'Accordion compound components must be inside <Accordion>',
		);
	return ctx;
}
function useAccordionItemCtx() {
	const ctx = React.useContext(AccordionItemCtx);
	if (!ctx)
		throw new Error(
			'AccordionControl/Panel must be inside <Accordion.Item>',
		);
	return ctx;
}

const DefaultChevron = () => (
	<svg
		className='w-4 h-4'
		viewBox='0 0 20 20'
		fill='currentColor'>
		<path
			fillRule='evenodd'
			d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
			clipRule='evenodd'
		/>
	</svg>
);

export function Accordion({
	value: controlled,
	defaultValue = null,
	onChange,
	multiple = false,
	variant = 'default',
	chevronPosition = 'right',
	chevron = <DefaultChevron />,
	disableChevronRotation = false,
	children,
}: AccordionProps) {
	const [internal, setInternal] = useState<string | string[] | null>(
		defaultValue,
	);
	const value = controlled !== undefined ? controlled : internal;

	const isOpen = (v: string) =>
		Array.isArray(value) ? value.includes(v) : value === v;

	const toggle = (v: string) => {
		let next: string | string[] | null;
		if (multiple) {
			const arr = Array.isArray(value) ? value : value ? [value] : [];
			next = arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v];
		} else {
			next = value === v ? null : v;
		}
		if (controlled === undefined) setInternal(next);
		onChange?.(next);
	};

	const variantClass = {
		default: 'divide-y divide-border border border-border rounded-md',
		contained:
			'divide-y divide-border border border-border rounded-md bg-surface',
		filled: 'space-y-1',
		separated: 'space-y-2',
	}[variant];

	return (
		<AccordionCtx.Provider
			value={{
				isOpen,
				toggle,
				chevronPosition,
				chevron,
				disableChevronRotation,
			}}>
			<div className={variantClass}>{children}</div>
		</AccordionCtx.Provider>
	);
}

function AccordionItem({
	value,
	disabled = false,
	children,
}: AccordionItemProps) {
	return (
		<AccordionItemCtx.Provider value={{ value, disabled }}>
			<div>{children}</div>
		</AccordionItemCtx.Provider>
	);
}

function AccordionControl({
	chevron: itemChevron,
	icon,
	children,
	className = '',
	...props
}: AccordionControlProps) {
	const { isOpen, toggle, chevronPosition, chevron, disableChevronRotation } =
		useAccordionCtx();
	const { value, disabled } = useAccordionItemCtx();
	const opened = isOpen(value);
	const ch = itemChevron ?? chevron;
	return (
		<button
			type='button'
			onClick={() => !disabled && toggle(value)}
			disabled={disabled}
			aria-expanded={opened}
			className={[
				'flex items-center w-full text-left px-4 py-3 font-medium text-sm transition-colors',
				'hover:bg-muted/20 disabled:pointer-events-none disabled:opacity-50',
				'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-1',
				className,
			]
				.filter(Boolean)
				.join(' ')}
			{...props}>
			{chevronPosition === 'left' && (
				<span
					className={[
						'mr-2 flex-shrink-0 transition-transform',
						!disableChevronRotation && opened ? 'rotate-180' : '',
					].join(' ')}>
					{ch}
				</span>
			)}
			{icon && <span className='mr-2 flex-shrink-0'>{icon}</span>}
			<span className='flex-1'>{children}</span>
			{chevronPosition === 'right' && (
				<span
					className={[
						'ml-2 flex-shrink-0 transition-transform',
						!disableChevronRotation && opened ? 'rotate-180' : '',
					].join(' ')}>
					{ch}
				</span>
			)}
		</button>
	);
}

function AccordionPanel({
	children,
	className = '',
	...props
}: AccordionPanelProps) {
	const { isOpen } = useAccordionCtx();
	const { value } = useAccordionItemCtx();
	const opened = isOpen(value);
	return (
		<AnimatePresence initial={false}>
			{opened && (
				<motion.div
					key='panel'
					initial={{ height: 0, opacity: 0 }}
					animate={{ height: 'auto', opacity: 1 }}
					exit={{ height: 0, opacity: 0 }}
					transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
					style={{ overflow: 'hidden' }}>
					<div
						className={[
							'px-4 pb-4 text-sm text-on-surface',
							className,
						]
							.filter(Boolean)
							.join(' ')}
						{...props}>
						{children}
					</div>
				</motion.div>
			)}
		</AnimatePresence>
	);
}

AccordionItem.displayName = 'Accordion.Item';
AccordionControl.displayName = 'Accordion.Control';
AccordionPanel.displayName = 'Accordion.Panel';

const AccordionExt = Accordion as typeof Accordion & {
	Item: typeof AccordionItem;
	Control: typeof AccordionControl;
	Panel: typeof AccordionPanel;
};
AccordionExt.Item = AccordionItem;
AccordionExt.Control = AccordionControl;
AccordionExt.Panel = AccordionPanel;

export { AccordionControl, AccordionItem, AccordionPanel };
