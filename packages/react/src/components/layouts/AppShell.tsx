'use client';

import React from 'react';

// ── AppShell ─────────────────────────────────────────────────────────────────

export interface AppShellProps extends React.HTMLAttributes<HTMLDivElement> {
	header?: { height: number | string };
	navbar?: {
		width: number | string;
		breakpoint?: string;
		collapsed?: { mobile?: boolean };
	};
	aside?: {
		width: number | string;
		breakpoint?: string;
		collapsed?: { mobile?: boolean };
	};
	footer?: { height: number | string };
	padding?: number | string;
	children: React.ReactNode;
}

export function AppShell({
	header,
	navbar,
	aside,
	footer,
	padding = '1rem',
	children,
	className = '',
	style,
	...props
}: AppShellProps) {
	return (
		<div
			className={['min-h-screen flex flex-col', className]
				.filter(Boolean)
				.join(' ')}
			style={style}
			{...props}>
			{children}
		</div>
	);
}

// ── AppShell.Header ──────────────────────────────────────────────────────────
export interface AppShellSectionProps extends React.HTMLAttributes<HTMLElement> {
	children?: React.ReactNode;
	component?: React.ElementType;
}

function AppShellHeader({
	children,
	className = '',
	style,
	...props
}: AppShellSectionProps) {
	return (
		<header
			className={[
				'sticky top-0 z-40 bg-surface border-b border-border',
				className,
			]
				.filter(Boolean)
				.join(' ')}
			style={style}
			{...props}>
			{children}
		</header>
	);
}

function AppShellNavbar({
	children,
	className = '',
	...props
}: AppShellSectionProps) {
	return (
		<nav
			className={[
				'bg-surface border-r border-border flex-shrink-0',
				className,
			]
				.filter(Boolean)
				.join(' ')}
			{...props}>
			{children}
		</nav>
	);
}

function AppShellAside({
	children,
	className = '',
	...props
}: AppShellSectionProps) {
	return (
		<aside
			className={[
				'bg-surface border-l border-border flex-shrink-0',
				className,
			]
				.filter(Boolean)
				.join(' ')}
			{...props}>
			{children}
		</aside>
	);
}

function AppShellMain({
	children,
	className = '',
	...props
}: AppShellSectionProps) {
	return (
		<main
			className={['flex-1 p-4', className].filter(Boolean).join(' ')}
			{...props}>
			{children}
		</main>
	);
}

function AppShellFooter({
	children,
	className = '',
	...props
}: AppShellSectionProps) {
	return (
		<footer
			className={['bg-surface border-t border-border', className]
				.filter(Boolean)
				.join(' ')}
			{...props}>
			{children}
		</footer>
	);
}

function AppShellSection({
	children,
	className = '',
	component,
	...props
}: AppShellSectionProps) {
	const Comp = (component ?? 'div') as React.ElementType;
	return (
		<Comp
			className={['flex-1', className].filter(Boolean).join(' ')}
			{...props}>
			{children}
		</Comp>
	);
}

AppShell.Header = AppShellHeader;
AppShell.Navbar = AppShellNavbar;
AppShell.Aside = AppShellAside;
AppShell.Main = AppShellMain;
AppShell.Footer = AppShellFooter;
AppShell.Section = AppShellSection;
