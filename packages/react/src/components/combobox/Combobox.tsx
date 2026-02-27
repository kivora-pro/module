'use client';

import React, { createContext, useContext, useRef, useState } from 'react';

// ── Context ───────────────────────────────────────────────────────────────────

interface ComboboxCtx {
	store: ComboboxStore;
	size: ComboboxSize;
	readOnly: boolean;
	resetSelectionOnOptionHover: boolean;
	onOptionSubmit?: (
		value: string,
		opts: { optionProps: ComboboxOptionProps },
	) => void;
}

const ComboboxContext = createContext<ComboboxCtx | null>(null);
const useCombobox = () => {
	const ctx = useContext(ComboboxContext);
	if (!ctx) throw new Error('ComboboxContext not found');
	return ctx;
};

// ── Store ────────────────────────────────────────────────────────────────────

export interface ComboboxStore {
	dropdownOpened: boolean;
	toggleDropdown: () => void;
	openDropdown: () => void;
	closeDropdown: () => void;
	selectedOptionIndex: number;
	setSelectedOptionIndex: (i: number) => void;
	focusTarget: () => void;
	clickSelectedOption: () => void;
}

export function useComboboxStore(
	target?: React.RefObject<HTMLElement>,
): ComboboxStore {
	const [dropdownOpened, setDropdown] = useState(false);
	const [selectedOptionIndex, setSelectedOptionIndex] = useState(-1);
	const optionsRef = useRef<HTMLElement[]>([]);
	return {
		dropdownOpened,
		toggleDropdown: () => setDropdown((v) => !v),
		openDropdown: () => setDropdown(true),
		closeDropdown: () => setDropdown(false),
		selectedOptionIndex,
		setSelectedOptionIndex,
		focusTarget: () => target?.current?.focus(),
		clickSelectedOption: () =>
			optionsRef.current[selectedOptionIndex]?.click(),
	};
}

// ── Types ─────────────────────────────────────────────────────────────────────

export type ComboboxSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface ComboboxProps {
	store: ComboboxStore;
	children: React.ReactNode;
	size?: ComboboxSize;
	readOnly?: boolean;
	resetSelectionOnOptionHover?: boolean;
	onOptionSubmit?: (
		value: string,
		opts: { optionProps: ComboboxOptionProps },
	) => void;
	withinPortal?: boolean;
	keepMounted?: boolean;
}

// ── Root ──────────────────────────────────────────────────────────────────────

export function Combobox({
	store,
	children,
	size = 'sm',
	readOnly = false,
	resetSelectionOnOptionHover = false,
	onOptionSubmit,
}: ComboboxProps) {
	return (
		<ComboboxContext.Provider
			value={{
				store,
				size,
				readOnly,
				resetSelectionOnOptionHover,
				onOptionSubmit,
			}}>
			<div className='relative'>{children}</div>
		</ComboboxContext.Provider>
	);
}

// ── Target ────────────────────────────────────────────────────────────────────

export interface ComboboxTargetProps {
	children: React.ReactElement;
	refProp?: string;
}

export function ComboboxTarget({
	children,
	refProp = 'ref',
}: ComboboxTargetProps) {
	const { store } = useCombobox();
	return React.cloneElement(children, {
		[refProp]: undefined,
		onClick: (e: React.MouseEvent) => {
			store.toggleDropdown();
			children.props.onClick?.(e);
		},
		onKeyDown: (e: React.KeyboardEvent) => {
			if (e.key === 'Escape') store.closeDropdown();
			if (e.key === 'ArrowDown') {
				e.preventDefault();
				store.openDropdown();
			}
			children.props.onKeyDown?.(e);
		},
		'aria-expanded': store.dropdownOpened,
		'aria-haspopup': 'listbox',
	});
}

// ── EventsTarget ──────────────────────────────────────────────────────────────

export type ComboboxEventsTargetProps = ComboboxTargetProps;
export const ComboboxEventsTarget = ComboboxTarget;

// ── Dropdown ─────────────────────────────────────────────────────────────────

export interface ComboboxDropdownProps {
	children: React.ReactNode;
	hidden?: boolean;
	className?: string;
}

export function ComboboxDropdown({
	children,
	hidden,
	className = '',
}: ComboboxDropdownProps) {
	const { store } = useCombobox();
	if (!store.dropdownOpened && !hidden) return null;
	return (
		<div
			role='listbox'
			className={[
				'absolute z-50 left-0 right-0 mt-1 rounded-md border border-border bg-surface shadow-lg overflow-hidden',
				hidden ? 'hidden' : '',
				className,
			]
				.filter(Boolean)
				.join(' ')}>
			{children}
		</div>
	);
}

// ── DropdownTarget ────────────────────────────────────────────────────────────

export interface ComboboxDropdownTargetProps {
	children: React.ReactElement;
}
export function ComboboxDropdownTarget({
	children,
}: ComboboxDropdownTargetProps) {
	return children;
}

// ── Options ───────────────────────────────────────────────────────────────────

export interface ComboboxOptionsProps {
	children: React.ReactNode;
	mah?: number | string;
	labelledBy?: string;
}

export function ComboboxOptions({ children, mah }: ComboboxOptionsProps) {
	return (
		<div
			style={{ maxHeight: mah }}
			className={mah ? 'overflow-y-auto' : ''}>
			{children}
		</div>
	);
}

// ── Option ────────────────────────────────────────────────────────────────────

export interface ComboboxOptionProps extends React.HTMLAttributes<HTMLDivElement> {
	value: string;
	active?: boolean;
	disabled?: boolean;
	selected?: boolean;
	children: React.ReactNode;
}

export function ComboboxOption({
	value,
	active = false,
	disabled = false,
	selected = false,
	children,
	className = '',
	onClick,
	...props
}: ComboboxOptionProps) {
	const { store, onOptionSubmit } = useCombobox();
	return (
		<div
			role='option'
			aria-selected={selected || active}
			aria-disabled={disabled}
			onClick={(e) => {
				if (disabled) return;
				onOptionSubmit?.(value, {
					optionProps: {
						value,
						active,
						disabled,
						selected,
						children,
					},
				});
				store.closeDropdown();
				onClick?.(e);
			}}
			className={[
				'flex items-center px-3 py-2 text-sm cursor-pointer transition-colors select-none',
				active || selected
					? 'bg-brand/10 text-brand'
					: 'text-on-surface hover:bg-muted/20',
				disabled ? 'pointer-events-none opacity-40' : '',
				className,
			]
				.filter(Boolean)
				.join(' ')}
			{...props}>
			{children}
		</div>
	);
}

// ── Group ─────────────────────────────────────────────────────────────────────

export interface ComboboxGroupProps {
	label?: React.ReactNode;
	children: React.ReactNode;
}
export function ComboboxGroup({ label, children }: ComboboxGroupProps) {
	return (
		<div>
			{label && (
				<div className='px-3 py-1.5 text-xs font-semibold text-muted uppercase tracking-wider'>
					{label}
				</div>
			)}
			{children}
		</div>
	);
}

// ── Empty ─────────────────────────────────────────────────────────────────────

export interface ComboboxEmptyProps {
	children: React.ReactNode;
}
export function ComboboxEmpty({ children }: ComboboxEmptyProps) {
	return (
		<div className='px-3 py-4 text-sm text-muted text-center'>
			{children}
		</div>
	);
}

// ── Chevron ───────────────────────────────────────────────────────────────────

export function ComboboxChevron({
	size = 16,
	error,
}: {
	size?: number;
	error?: boolean;
}) {
	return (
		<svg
			width={size}
			height={size}
			viewBox='0 0 20 20'
			fill='none'
			stroke={error ? '#ef4444' : 'currentColor'}
			strokeWidth={1.5}>
			<path
				strokeLinecap='round'
				strokeLinejoin='round'
				d='M6 8l4 4 4-4'
			/>
		</svg>
	);
}

// ── Footer / Header ────────────────────────────────────────────────────────────

export function ComboboxFooter({
	children,
	className = '',
}: {
	children: React.ReactNode;
	className?: string;
}) {
	return (
		<div
			className={['px-3 py-2 border-t border-border', className].join(
				' ',
			)}>
			{children}
		</div>
	);
}
export function ComboboxHeader({
	children,
	className = '',
}: {
	children: React.ReactNode;
	className?: string;
}) {
	return (
		<div
			className={['px-3 py-2 border-b border-border', className].join(
				' ',
			)}>
			{children}
		</div>
	);
}

// ── Search ────────────────────────────────────────────────────────────────────

export interface ComboboxSearchProps extends React.InputHTMLAttributes<HTMLInputElement> {}
export const ComboboxSearch = React.forwardRef<
	HTMLInputElement,
	ComboboxSearchProps
>(({ className = '', ...props }, ref) => (
	<input
		ref={ref}
		className={[
			'w-full px-3 py-2 text-sm bg-transparent border-b border-border outline-none text-on-surface placeholder:text-muted',
			className,
		].join(' ')}
		{...props}
	/>
));
ComboboxSearch.displayName = 'ComboboxSearch';

// ── Compound attachment ───────────────────────────────────────────────────────

const ComboboxExt = Combobox as typeof Combobox & {
	Target: typeof ComboboxTarget;
	EventsTarget: typeof ComboboxEventsTarget;
	Dropdown: typeof ComboboxDropdown;
	DropdownTarget: typeof ComboboxDropdownTarget;
	Options: typeof ComboboxOptions;
	Option: typeof ComboboxOption;
	Group: typeof ComboboxGroup;
	Empty: typeof ComboboxEmpty;
	Chevron: typeof ComboboxChevron;
	Footer: typeof ComboboxFooter;
	Header: typeof ComboboxHeader;
	Search: typeof ComboboxSearch;
};
ComboboxExt.Target = ComboboxTarget;
ComboboxExt.EventsTarget = ComboboxEventsTarget;
ComboboxExt.Dropdown = ComboboxDropdown;
ComboboxExt.DropdownTarget = ComboboxDropdownTarget;
ComboboxExt.Options = ComboboxOptions;
ComboboxExt.Option = ComboboxOption;
ComboboxExt.Group = ComboboxGroup;
ComboboxExt.Empty = ComboboxEmpty;
ComboboxExt.Chevron = ComboboxChevron;
ComboboxExt.Footer = ComboboxFooter;
ComboboxExt.Header = ComboboxHeader;
ComboboxExt.Search = ComboboxSearch;

export { ComboboxExt as ComboboxCompound };
export default ComboboxExt;
