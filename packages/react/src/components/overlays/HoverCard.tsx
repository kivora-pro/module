'use client';

import { AnimatePresence, motion } from 'framer-motion';
import React, { useRef, useState } from 'react';

export interface HoverCardProps {
	openDelay?: number;
	closeDelay?: number;
	position?: 'top' | 'bottom' | 'left' | 'right';
	shadow?: string;
	width?: number | string;
	withArrow?: boolean;
	children: React.ReactNode;
}

const HoverCardContext = React.createContext<{
	opened: boolean;
	handleMouseEnter: () => void;
	handleMouseLeave: () => void;
} | null>(null);

function useHoverCardContext() {
	const ctx = React.useContext(HoverCardContext);
	if (!ctx)
		throw new Error(
			'HoverCard compound components must be used within <HoverCard>',
		);
	return ctx;
}

export function HoverCard({
	openDelay = 0,
	closeDelay = 150,
	children,
}: HoverCardProps) {
	const [opened, setOpened] = useState(false);
	const openTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
	const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

	const handleMouseEnter = () => {
		if (closeTimer.current) clearTimeout(closeTimer.current);
		openTimer.current = setTimeout(() => setOpened(true), openDelay);
	};
	const handleMouseLeave = () => {
		if (openTimer.current) clearTimeout(openTimer.current);
		closeTimer.current = setTimeout(() => setOpened(false), closeDelay);
	};

	return (
		<HoverCardContext.Provider
			value={{ opened, handleMouseEnter, handleMouseLeave }}>
			<div className='relative inline-block'>{children}</div>
		</HoverCardContext.Provider>
	);
}

function HoverCardTarget({ children }: { children: React.ReactElement }) {
	const { handleMouseEnter, handleMouseLeave } = useHoverCardContext();
	return React.cloneElement(children, {
		onMouseEnter: handleMouseEnter,
		onMouseLeave: handleMouseLeave,
	});
}

function HoverCardDropdown({
	children,
	className = '',
	...props
}: React.HTMLAttributes<HTMLDivElement>) {
	const { opened, handleMouseEnter, handleMouseLeave } =
		useHoverCardContext();
	return (
		<AnimatePresence>
			{opened && (
				<motion.div
					onMouseEnter={handleMouseEnter}
					onMouseLeave={handleMouseLeave}
					initial={{ opacity: 0, scale: 0.95, y: -4 }}
					animate={{ opacity: 1, scale: 1, y: 0 }}
					exit={{ opacity: 0, scale: 0.95, y: -4 }}
					transition={{ duration: 0.15, ease: 'easeOut' }}
					className={[
						'absolute top-full left-0 mt-1 z-50 min-w-[12rem] rounded-md border border-border bg-surface-elevated shadow-lg text-on-surface p-3',
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

HoverCardTarget.displayName = 'HoverCard.Target';
HoverCardDropdown.displayName = 'HoverCard.Dropdown';

(
	HoverCard as typeof HoverCard & {
		Target: typeof HoverCardTarget;
		Dropdown: typeof HoverCardDropdown;
	}
).Target = HoverCardTarget;
(
	HoverCard as typeof HoverCard & { Dropdown: typeof HoverCardDropdown }
).Dropdown = HoverCardDropdown;

export { HoverCardDropdown, HoverCardTarget };
