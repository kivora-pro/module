'use client';

import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';

export interface PopoverProps {
	opened?: boolean;
	defaultOpened?: boolean;
	onChange?: (opened: boolean) => void;
	position?:
		| 'top'
		| 'bottom'
		| 'left'
		| 'right'
		| 'bottom-start'
		| 'bottom-end';
	offset?: number;
	withArrow?: boolean;
	closeOnClickOutside?: boolean;
	closeOnEscape?: boolean;
	trapFocus?: boolean;
	width?: number | string | 'target';
	shadow?: string;
	radius?: string;
	children: React.ReactNode;
}

export interface PopoverTargetProps {
	children: React.ReactElement;
}

export interface PopoverDropdownProps extends React.HTMLAttributes<HTMLDivElement> {
	children?: React.ReactNode;
}

const PopoverContext = React.createContext<{
	opened: boolean;
	toggle: () => void;
	close: () => void;
	triggerRef: React.RefObject<HTMLElement | null>;
} | null>(null);

function usePopoverContext() {
	const ctx = React.useContext(PopoverContext);
	if (!ctx)
		throw new Error(
			'Popover compound components must be used within <Popover>',
		);
	return ctx;
}

export function Popover({
	opened: controlledOpened,
	defaultOpened = false,
	onChange,
	closeOnEscape = true,
	children,
}: PopoverProps) {
	const [internalOpened, setInternalOpened] = useState(defaultOpened);
	const isControlled = controlledOpened !== undefined;
	const opened = isControlled ? controlledOpened : internalOpened;
	const triggerRef = useRef<HTMLElement>(null);

	const toggle = () => {
		const next = !opened;
		if (!isControlled) setInternalOpened(next);
		onChange?.(next);
	};
	const close = () => {
		if (!isControlled) setInternalOpened(false);
		onChange?.(false);
	};

	useEffect(() => {
		if (!opened || !closeOnEscape) return;
		const handler = (e: KeyboardEvent) => e.key === 'Escape' && close();
		document.addEventListener('keydown', handler);
		return () => document.removeEventListener('keydown', handler);
	}, [opened, closeOnEscape]);

	return (
		<PopoverContext.Provider value={{ opened, toggle, close, triggerRef }}>
			<div className='relative inline-block'>{children}</div>
		</PopoverContext.Provider>
	);
}

function PopoverTarget({ children }: PopoverTargetProps) {
	const { toggle, triggerRef } = usePopoverContext();
	return React.cloneElement(children, {
		ref: triggerRef,
		onClick: (e: React.MouseEvent) => {
			toggle();
			children.props.onClick?.(e);
		},
		'aria-expanded': usePopoverContext().opened,
	});
}

function PopoverDropdown({ children, className = '' }: PopoverDropdownProps) {
	const { opened } = usePopoverContext();
	return (
		<AnimatePresence>
			{opened && (
				<motion.div
					role='dialog'
					initial={{ opacity: 0, scale: 0.95, y: -4 }}
					animate={{ opacity: 1, scale: 1, y: 0 }}
					exit={{ opacity: 0, scale: 0.95, y: -4 }}
					transition={{ duration: 0.15, ease: 'easeOut' }}
					className={[
						'absolute top-full left-0 mt-1 z-50 min-w-[10rem] rounded-md border border-border bg-surface-elevated shadow-lg text-on-surface p-2',
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

PopoverTarget.displayName = 'Popover.Target';
PopoverDropdown.displayName = 'Popover.Dropdown';

(
	Popover as typeof Popover & {
		Target: typeof PopoverTarget;
		Dropdown: typeof PopoverDropdown;
	}
).Target = PopoverTarget;
(Popover as typeof Popover & { Dropdown: typeof PopoverDropdown }).Dropdown =
	PopoverDropdown;

export { PopoverDropdown, PopoverTarget };
