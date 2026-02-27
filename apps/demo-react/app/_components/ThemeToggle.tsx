'use client';

import { useEffect, useState } from 'react';

type Theme = 'light' | 'dark' | 'system';

const STORAGE_KEY = 'kivora-theme';

function applyTheme(theme: Theme) {
	const root = document.documentElement;
	if (theme === 'dark') {
		root.classList.add('dark');
		root.classList.remove('light');
	} else if (theme === 'light') {
		root.classList.add('light');
		root.classList.remove('dark');
	} else {
		root.classList.remove('dark', 'light');
	}
}

export function ThemeToggle() {
	const [theme, setTheme] = useState<Theme>('system');

	useEffect(() => {
		const stored = (localStorage.getItem(STORAGE_KEY) as Theme) ?? 'system';
		setTheme(stored);
	}, []);

	function cycle() {
		const next: Theme =
			theme === 'system' ? 'dark' : theme === 'dark' ? 'light' : 'system';
		setTheme(next);
		localStorage.setItem(STORAGE_KEY, next);
		applyTheme(next);
	}

	return (
		<button
			onClick={cycle}
			title={`Tema: ${theme}`}
			aria-label='Cambiar tema'
			className='w-8 h-8 flex items-center justify-center rounded-md text-muted hover:text-on-surface hover:bg-border/40 transition-colors'>
			{theme === 'dark' ? (
				/* Moon icon */
				<svg
					className='w-4 h-4'
					fill='none'
					stroke='currentColor'
					strokeWidth={2}
					viewBox='0 0 24 24'>
					<path
						strokeLinecap='round'
						strokeLinejoin='round'
						d='M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z'
					/>
				</svg>
			) : theme === 'light' ? (
				/* Sun icon */
				<svg
					className='w-4 h-4'
					fill='none'
					stroke='currentColor'
					strokeWidth={2}
					viewBox='0 0 24 24'>
					<circle
						cx={12}
						cy={12}
						r={5}
					/>
					<path
						strokeLinecap='round'
						d='M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42'
					/>
				</svg>
			) : (
				/* System / auto icon */
				<svg
					className='w-4 h-4'
					fill='none'
					stroke='currentColor'
					strokeWidth={2}
					viewBox='0 0 24 24'>
					<rect
						x={2}
						y={3}
						width={20}
						height={14}
						rx={2}
					/>
					<path
						strokeLinecap='round'
						d='M8 21h8M12 17v4'
					/>
				</svg>
			)}
		</button>
	);
}
