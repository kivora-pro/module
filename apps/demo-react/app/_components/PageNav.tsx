'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { navSections } from './Sidebar';

const allPages = navSections.flatMap((s) =>
	s.items.map((item) => ({ ...item, group: s.group })),
);

export function PageNav() {
	const pathname = usePathname();

	const idx = allPages.findIndex((p) =>
		p.href === '/'
			? pathname === '/'
			: pathname === p.href || pathname.startsWith(p.href + '/'),
	);

	if (idx === -1) return null;

	const prev = idx > 0 ? allPages[idx - 1] : null;
	const next = idx < allPages.length - 1 ? allPages[idx + 1] : null;

	return (
		<nav className='mt-12 pt-6 border-t border-border flex items-stretch justify-between gap-4'>
			{prev ? (
				<Link
					href={prev.href}
					className='group flex flex-col gap-0.5 px-4 py-3 rounded-xl border border-border bg-surface hover:border-brand/40 hover:bg-brand/[0.03] transition-all min-w-0 max-w-[48%]'>
					<span className='text-[10px] font-bold uppercase tracking-widest text-muted/60 flex items-center gap-1'>
						<svg
							className='w-3 h-3 shrink-0'
							fill='none'
							viewBox='0 0 24 24'
							stroke='currentColor'
							strokeWidth={2.5}>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								d='M15 19l-7-7 7-7'
							/>
						</svg>
						Anterior
					</span>
					<span className='text-sm font-semibold text-on-surface group-hover:text-brand transition-colors truncate'>
						{prev.label}
					</span>
					<span className='text-[11px] text-muted/60'>
						{prev.group}
					</span>
				</Link>
			) : (
				<div />
			)}

			{next ? (
				<Link
					href={next.href}
					className='group flex flex-col gap-0.5 px-4 py-3 rounded-xl border border-border bg-surface hover:border-brand/40 hover:bg-brand/[0.03] transition-all text-right min-w-0 max-w-[48%] ml-auto'>
					<span className='text-[10px] font-bold uppercase tracking-widest text-muted/60 flex items-center justify-end gap-1'>
						Siguiente
						<svg
							className='w-3 h-3 shrink-0'
							fill='none'
							viewBox='0 0 24 24'
							stroke='currentColor'
							strokeWidth={2.5}>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								d='M9 5l7 7-7 7'
							/>
						</svg>
					</span>
					<span className='text-sm font-semibold text-on-surface group-hover:text-brand transition-colors truncate'>
						{next.label}
					</span>
					<span className='text-[11px] text-muted/60'>
						{next.group}
					</span>
				</Link>
			) : (
				<div />
			)}
		</nav>
	);
}
