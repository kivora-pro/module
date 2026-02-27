'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const navSections = [
	{
		group: 'Inicio',
		items: [{ href: '/', label: 'Overview' }],
	},
	{
		group: 'Componentes',
		items: [
			{ href: '/components/buttons', label: 'Buttons' },
			{ href: '/components/inputs', label: 'Inputs' },
			{ href: '/components/feedback', label: 'Feedback' },
			{ href: '/components/data-display', label: 'Data Display' },
			{ href: '/components/navigation', label: 'Navigation' },
			{ href: '/components/overlays', label: 'Overlays' },
			{ href: '/components/typography', label: 'Typography' },
			{ href: '/components/layout', label: 'Layout' },
			{ href: '/components/miscellaneous', label: 'Miscellaneous' },
			{ href: '/components/extensions', label: 'Extensions' },
		],
	},
	{
		group: 'Hooks',
		items: [
			{ href: '/hooks/state', label: 'State Hooks' },
			{ href: '/hooks/ui', label: 'UI & DOM' },
			{ href: '/hooks/async', label: 'Async & Timers' },
		],
	},
];

export function Sidebar() {
	const pathname = usePathname();

	return (
		<aside className='w-60 shrink-0 border-r border-border bg-surface h-screen sticky top-0 flex flex-col overflow-hidden'>
			{/* Logo */}
			<div className='px-5 py-4 border-b border-border shrink-0'>
				<Link
					href='/'
					className='flex items-center gap-3'>
					<span className='w-8 h-8 rounded-lg bg-brand flex items-center justify-center text-white font-bold text-sm shrink-0'>
						K
					</span>
					<div>
						<p className='font-bold text-on-surface text-sm leading-none'>
							Kivora UI
						</p>
						<p className='text-[11px] text-muted mt-0.5'>
							@kivora/react
						</p>
					</div>
				</Link>
			</div>

			{/* Nav */}
			<nav className='flex-1 overflow-y-auto py-4'>
				{navSections.map((section) => (
					<div
						key={section.group}
						className='mb-4 px-3'>
						<p className='text-[10px] font-bold uppercase tracking-widest text-muted/70 mb-1 px-2'>
							{section.group}
						</p>
						<ul className='space-y-0.5'>
							{section.items.map((item) => {
								const active =
									item.href === '/'
										? pathname === '/'
										: pathname === item.href ||
											pathname.startsWith(
												item.href + '/',
											);
								return (
									<li key={item.href}>
										<Link
											href={item.href}
											className={[
												'flex items-center gap-2 px-2 py-1.5 rounded-md text-sm transition-all duration-150',
												active
													? 'bg-brand/10 text-brand font-semibold'
													: 'text-on-surface/60 hover:text-on-surface hover:bg-black/5',
											].join(' ')}>
											{active && (
												<span className='w-1 h-3 rounded-full bg-brand shrink-0' />
											)}
											{!active && (
												<span className='w-1 shrink-0' />
											)}
											{item.label}
										</Link>
									</li>
								);
							})}
						</ul>
					</div>
				))}
			</nav>

			{/* Footer */}
			<div className='px-5 py-3 border-t border-border shrink-0'>
				<p className='text-[11px] text-muted/60 text-center'>
					v0.0.0-alpha · MIT License
				</p>
			</div>
		</aside>
	);
}
