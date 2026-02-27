import Link from 'next/link';
import React from 'react';

/* ── Section header ─────────────────────────────────────── */
export function PageHeader({
	title,
	description,
	pkg,
}: {
	title: string;
	description: string;
	pkg?: string;
}) {
	return (
		<div className='mb-8 pb-6 border-b border-border'>
			{pkg && (
				<code className='text-xs px-2 py-0.5 rounded bg-brand/10 text-brand font-mono mb-3 inline-block'>
					{pkg}
				</code>
			)}
			<h1 className='text-2xl sm:text-3xl font-extrabold text-on-surface tracking-tight mb-2'>
				{title}
			</h1>
			<p className='text-base text-muted max-w-2xl'>{description}</p>
		</div>
	);
}

/* ── Sub-section ─────────────────────────────────────────── */
export function Section({
	title,
	description,
	children,
}: {
	title: string;
	description?: string;
	children: React.ReactNode;
}) {
	return (
		<section className='mb-10'>
			<h2 className='text-base font-bold text-on-surface mb-0.5'>
				{title}
			</h2>
			{description && (
				<p className='text-sm text-muted mb-3'>{description}</p>
			)}
			{!description && <div className='mb-3' />}
			{children}
		</section>
	);
}

/* ── Demo preview box ────────────────────────────────────── */
export function Demo({
	children,
	className = '',
}: {
	children: React.ReactNode;
	className?: string;
}) {
	return (
		<div
			className={[
				'rounded-xl border border-border bg-surface p-4 sm:p-6 shadow-sm',
				className,
			].join(' ')}>
			{children}
		</div>
	);
}

/* ── Prop row inside a prop table ────────────────────────── */
export function PropTable({
	rows,
}: {
	rows: {
		prop: string;
		type: string;
		default?: string;
		description: string;
	}[];
}) {
	return (
		<div className='rounded-xl border border-border overflow-hidden mt-4'>
			<table className='w-full text-sm'>
				<thead>
					<tr className='bg-surface border-b border-border'>
						<th className='text-left px-4 py-2 text-xs font-bold uppercase tracking-wider text-muted/80 w-[160px]'>
							Prop
						</th>
						<th className='text-left px-4 py-2 text-xs font-bold uppercase tracking-wider text-muted/80 w-[200px]'>
							Tipo
						</th>
						<th className='text-left px-4 py-2 text-xs font-bold uppercase tracking-wider text-muted/80 hidden sm:table-cell'>
							Default
						</th>
						<th className='text-left px-4 py-2 text-xs font-bold uppercase tracking-wider text-muted/80 hidden md:table-cell'>
							Descripción
						</th>
					</tr>
				</thead>
				<tbody>
					{rows.map((r, i) => (
						<tr
							key={r.prop}
							className={
								i % 2 === 0 ? 'bg-transparent' : 'bg-border/10'
							}>
							<td className='px-4 py-2 font-mono text-xs text-brand'>
								{r.prop}
							</td>
							<td className='px-4 py-2 font-mono text-xs text-muted'>
								{r.type}
							</td>
							<td className='px-4 py-2 text-xs text-muted hidden sm:table-cell'>
								{r.default ?? '—'}
							</td>
							<td className='px-4 py-2 text-xs text-on-surface/80 hidden md:table-cell'>
								{r.description}
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

/* ── Inline label above demos ────────────────────────────── */
export function Label({ children }: { children: React.ReactNode }) {
	return (
		<p className='text-[10px] font-bold uppercase tracking-widest text-muted/70 mb-2 mt-5 first:mt-0'>
			{children}
		</p>
	);
}

/* ── Breadcrumb trail ─────────────────────────────────────── */
export function PageBreadcrumb({
	items,
}: {
	items: { label: string; href?: string }[];
}) {
	return (
		<nav className='flex items-center gap-1.5 text-xs text-muted mb-6 flex-wrap'>
			{items.map((item, i) => (
				<React.Fragment key={i}>
					{i > 0 && <span className='text-muted/40'>›</span>}
					{item.href ? (
						<Link
							href={item.href}
							className='hover:text-brand transition-colors'>
							{item.label}
						</Link>
					) : (
						<span className='text-on-surface font-medium'>
							{item.label}
						</span>
					)}
				</React.Fragment>
			))}
		</nav>
	);
}

/* ── Hook card (demo + code) ─────────────────────────────── */
export function HookCard({
	title,
	description,
	demo,
	code,
}: {
	title: string;
	description?: string;
	demo: React.ReactNode;
	code: string;
}) {
	return (
		<div className='mb-6 rounded-xl border border-border bg-surface shadow-sm overflow-hidden'>
			{/* Header */}
			<div className='px-5 py-4 border-b border-border bg-muted/[0.035]'>
				<h2 className='text-base font-bold text-on-surface'>{title}</h2>
				{description && (
					<p className='text-sm text-muted mt-0.5'>{description}</p>
				)}
			</div>

			{/* Interactive demo */}
			<div className='p-5 sm:p-6'>{demo}</div>

			{/* Code block */}
			<div className='border-t border-border'>
				<div className='flex items-center gap-2 px-4 py-2.5 bg-muted/[0.035] border-b border-border/60'>
					<svg
						className='w-3.5 h-3.5 text-muted'
						fill='none'
						viewBox='0 0 24 24'
						stroke='currentColor'
						strokeWidth={2}>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							d='M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5'
						/>
					</svg>
					<span className='text-[10px] font-bold uppercase tracking-widest text-muted/70 font-mono'>
						uso
					</span>
				</div>
				<pre className='p-4 text-xs font-mono text-on-surface/80 overflow-x-auto leading-relaxed bg-muted/[0.02]'>
					{code}
				</pre>
			</div>
		</div>
	);
}

/* ── Standalone code block ───────────────────────────────── */
export function CodeBlock({ children }: { children: string }) {
	return (
		<div className='rounded-xl border border-border overflow-hidden mt-4'>
			<div className='flex items-center gap-2 px-4 py-2.5 border-b border-border bg-muted/[0.035]'>
				<svg
					className='w-3.5 h-3.5 text-muted'
					fill='none'
					viewBox='0 0 24 24'
					stroke='currentColor'
					strokeWidth={2}>
					<path
						strokeLinecap='round'
						strokeLinejoin='round'
						d='M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5'
					/>
				</svg>
				<span className='text-[10px] font-bold uppercase tracking-widest text-muted/70 font-mono'>
					uso
				</span>
			</div>
			<pre className='p-4 text-xs font-mono text-on-surface/80 overflow-x-auto leading-relaxed bg-muted/[0.02]'>
				{children}
			</pre>
		</div>
	);
}
