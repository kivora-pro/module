'use client';

import { AnimatePresence, motion } from 'framer-motion';
import React, { useState } from 'react';

export interface MenuProps {
	opened?: boolean;
	defaultOpened?: boolean;
	onChange?: (opened: boolean) => void;
	closeOnItemClick?: boolean;
	closeOnEscape?: boolean;
	width?: number | string;
	position?:
		| 'bottom'
		| 'bottom-start'
		| 'bottom-end'
		| 'top'
		| 'top-start'
		| 'top-end';
	shadow?: string;
	radius?: string;
	offset?: number;
	withArrow?: boolean;
	arrowSize?: number;
	children: React.ReactNode;
}

const MenuContext = React.createContext<{
	opened: boolean;
	toggle: () => void;
	close: () => void;
} | null>(null);

function useMenuContext() {
	const ctx = React.useContext(MenuContext);
	if (!ctx)
		throw new Error('Menu compound components must be used within <Menu>');
	return ctx;
}

export function Menu({
	opened: controlled,
	defaultOpened = false,
	onChange,
	closeOnItemClick = true,
	children,
	width,
}: MenuProps) {
	const [internal, setInternal] = useState(defaultOpened);
	const opened = controlled !== undefined ? controlled : internal;
	const toggle = () => {
		const next = !opened;
		if (controlled === undefined) setInternal(next);
		onChange?.(next);
	};
	const close = () => {
		if (controlled === undefined) setInternal(false);
		onChange?.(false);
	};

	return (
		<MenuContext.Provider value={{ opened, toggle, close }}>
			<div className='relative inline-block'>{children}</div>
		</MenuContext.Provider>
	);
}

function MenuTarget({ children }: { children: React.ReactElement }) {
	const { toggle, opened } = useMenuContext();
	return React.cloneElement(children, {
		onClick: (e: React.MouseEvent) => {
			toggle();
			children.props.onClick?.(e);
		},
		'aria-haspopup': 'menu',
		'aria-expanded': opened,
	});
}

function MenuDropdown({
	children,
	className = '',
	...props
}: React.HTMLAttributes<HTMLDivElement>) {
	const { opened } = useMenuContext();
	return (
		<AnimatePresence>
			{opened && (
				<motion.div
					role='menu'
					initial={{ opacity: 0, scale: 0.95, y: -4 }}
					animate={{ opacity: 1, scale: 1, y: 0 }}
					exit={{ opacity: 0, scale: 0.95, y: -4 }}
					transition={{ duration: 0.15, ease: 'easeOut' }}
					className={[
						'absolute top-full left-0 mt-1 z-50 min-w-[10rem] rounded-md border border-border bg-surface-elevated shadow-lg text-on-surface py-1 focus:outline-none',
						className,
					]
						.filter(Boolean)
						.join(' ')}>
					{children}
				</motion.div>
			)}
		</AnimatePresence>
	);
}

function MenuItem({
	children,
	leftSection,
	rightSection,
	disabled = false,
	color,
	onClick,
	className = '',
	...props
}: {
	children?: React.ReactNode;
	leftSection?: React.ReactNode;
	rightSection?: React.ReactNode;
	disabled?: boolean;
	color?: string;
	onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
	className?: string;
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'color'>) {
	const { close } = useMenuContext();
	return (
		<button
			type='button'
			role='menuitem'
			disabled={disabled}
			onClick={(e) => {
				onClick?.(e);
				close();
			}}
			className={[
				'flex items-center gap-2 w-full text-left px-3 py-2 text-sm transition-colors',
				'hover:bg-muted/40 disabled:pointer-events-none disabled:opacity-50',
				color ? `text-[${color}]` : '',
				className,
			]
				.filter(Boolean)
				.join(' ')}
			{...props}>
			{leftSection && (
				<span className='flex-shrink-0'>{leftSection}</span>
			)}
			<span className='flex-1'>{children}</span>
			{rightSection && (
				<span className='flex-shrink-0 text-muted'>{rightSection}</span>
			)}
		</button>
	);
}

function MenuDivider({
	className = '',
	...props
}: React.HTMLAttributes<HTMLHRElement>) {
	return (
		<hr
			className={['border-border my-1', className]
				.filter(Boolean)
				.join(' ')}
			{...props}
		/>
	);
}

function MenuLabel({
	children,
	className = '',
	...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
	return (
		<p
			className={[
				'px-3 py-1 text-xs font-semibold text-muted uppercase tracking-wider',
				className,
			]
				.filter(Boolean)
				.join(' ')}
			{...props}>
			{children}
		</p>
	);
}

MenuTarget.displayName = 'Menu.Target';
MenuDropdown.displayName = 'Menu.Dropdown';
MenuItem.displayName = 'Menu.Item';
MenuDivider.displayName = 'Menu.Divider';
MenuLabel.displayName = 'Menu.Label';

// Attach compound components to Menu so `Menu.Target`, `Menu.Item`, etc. work
(Menu as unknown as { Target: typeof MenuTarget }).Target = MenuTarget;
(Menu as unknown as { Dropdown: typeof MenuDropdown }).Dropdown = MenuDropdown;
(Menu as unknown as { Item: typeof MenuItem }).Item = MenuItem;
(Menu as unknown as { Divider: typeof MenuDivider }).Divider = MenuDivider;
(Menu as unknown as { Label: typeof MenuLabel }).Label = MenuLabel;

export { MenuDivider, MenuDropdown, MenuItem, MenuLabel, MenuTarget };
