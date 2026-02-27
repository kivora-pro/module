'use client';

import { motion } from 'framer-motion';
import React, { useId, useState } from 'react';

export interface TabsProps {
	value?: string;
	defaultValue?: string;
	onChange?: (value: string) => void;
	orientation?: 'horizontal' | 'vertical';
	variant?: 'default' | 'outline' | 'pills';
	color?: string;
	radius?: string;
	inverted?: boolean;
	keepMounted?: boolean;
	allowTabDeactivation?: boolean;
	children: React.ReactNode;
}

export interface TabsListProps extends React.HTMLAttributes<HTMLDivElement> {
	grow?: boolean;
	justify?: React.CSSProperties['justifyContent'];
	children: React.ReactNode;
}

export interface TabsTabProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	value: string;
	leftSection?: React.ReactNode;
	rightSection?: React.ReactNode;
	children?: React.ReactNode;
}

export interface TabsPanelProps extends React.HTMLAttributes<HTMLDivElement> {
	value: string;
	children?: React.ReactNode;
}

const TabsContext = React.createContext<{
	value: string | null;
	onChange: (v: string) => void;
	variant: TabsProps['variant'];
	orientation: TabsProps['orientation'];
	keepMounted: boolean;
	uid: string;
} | null>(null);

function useTabsContext() {
	const ctx = React.useContext(TabsContext);
	if (!ctx)
		throw new Error('Tabs compound components must be used within <Tabs>');
	return ctx;
}

export function Tabs({
	value: controlled,
	defaultValue,
	onChange,
	orientation = 'horizontal',
	variant = 'default',
	keepMounted = true,
	children,
}: TabsProps) {
	const uid = useId();
	const [internal, setInternal] = useState<string | null>(
		defaultValue ?? null,
	);
	const value = controlled !== undefined ? controlled : internal;
	const handleChange = (v: string) => {
		if (controlled === undefined) setInternal(v);
		onChange?.(v);
	};
	return (
		<TabsContext.Provider
			value={{
				value,
				onChange: handleChange,
				variant,
				orientation,
				keepMounted,
				uid,
			}}>
			<div
				className={[
					'flex',
					orientation === 'vertical' ? 'flex-row' : 'flex-col',
				].join(' ')}>
				{children}
			</div>
		</TabsContext.Provider>
	);
}

function TabsList({
	grow = false,
	justify,
	children,
	className = '',
	style,
	...props
}: TabsListProps) {
	const { variant, orientation } = useTabsContext();
	return (
		<div
			role='tablist'
			className={[
				'flex',
				orientation === 'vertical' ? 'flex-col' : 'flex-row',
				variant === 'default' ? 'border-b border-border' : '',
				variant === 'pills' ? 'gap-1' : '',
				grow ? '[&>*]:flex-1' : '',
				className,
			]
				.filter(Boolean)
				.join(' ')}
			style={{ justifyContent: justify, ...style }}
			{...props}>
			{children}
		</div>
	);
}

function TabsTab({
	value,
	leftSection,
	rightSection,
	children,
	className = '',
	...props
}: TabsTabProps) {
	const { value: activeValue, onChange, variant, uid } = useTabsContext();
	const isActive = activeValue === value;

	const variantActive = {
		default: 'text-brand',
		outline: 'border border-brand rounded-t-md text-brand bg-surface',
		pills: 'bg-brand text-white rounded-md',
	}[variant!];
	const variantInactive = {
		default:
			'border-b-2 border-transparent text-muted hover:text-on-surface hover:border-border',
		outline: 'border border-transparent text-muted hover:text-on-surface',
		pills: 'text-muted hover:bg-muted/40 rounded-md',
	}[variant!];

	return (
		<button
			type='button'
			role='tab'
			aria-selected={isActive}
			tabIndex={isActive ? 0 : -1}
			onClick={() => onChange(value)}
			className={[
				'relative flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors',
				'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-1',
				isActive ? variantActive : variantInactive,
				className,
			]
				.filter(Boolean)
				.join(' ')}
			{...props}>
			{leftSection}
			{children}
			{rightSection}
			{isActive && variant === 'default' && (
				<motion.span
					layoutId={`tabs-indicator-${uid}`}
					className='absolute bottom-0 left-0 right-0 h-0.5 bg-brand rounded-full'
					transition={{ type: 'spring', stiffness: 500, damping: 35 }}
				/>
			)}
		</button>
	);
}

function TabsPanel({
	value,
	children,
	className = '',
	...props
}: TabsPanelProps) {
	const { value: activeValue, keepMounted } = useTabsContext();
	const isActive = activeValue === value;
	if (!isActive && !keepMounted) return null;
	return (
		<div
			role='tabpanel'
			hidden={!isActive}
			className={['pt-4', className].filter(Boolean).join(' ')}
			{...props}>
			{children}
		</div>
	);
}

TabsList.displayName = 'Tabs.List';
TabsTab.displayName = 'Tabs.Tab';
TabsPanel.displayName = 'Tabs.Panel';

const TabsExt = Tabs as typeof Tabs & {
	List: typeof TabsList;
	Tab: typeof TabsTab;
	Panel: typeof TabsPanel;
};
TabsExt.List = TabsList;
TabsExt.Tab = TabsTab;
TabsExt.Panel = TabsPanel;

export { TabsList, TabsPanel, TabsTab };
