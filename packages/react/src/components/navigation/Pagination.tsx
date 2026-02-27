'use client';

import React from 'react';

export interface PaginationProps {
	total: number;
	value?: number;
	defaultValue?: number;
	onChange?: (page: number) => void;
	siblings?: number;
	boundaries?: number;
	disabled?: boolean;
	size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
	radius?: string;
	color?: string;
	withEdges?: boolean;
	withControls?: boolean;
	getItemProps?: (
		page: number,
	) => React.ButtonHTMLAttributes<HTMLButtonElement>;
}

const sizeMap = {
	xs: 'h-6 w-6 text-xs',
	sm: 'h-7 w-7 text-sm',
	md: 'h-9 w-9 text-sm',
	lg: 'h-11 w-11 text-base',
	xl: 'h-13 w-13 text-lg',
};

function getRange(
	total: number,
	current: number,
	siblings: number,
	boundaries: number,
): (number | 'dots')[] {
	const totalPageNumbers = siblings * 2 + 3 + boundaries * 2;
	if (total <= totalPageNumbers)
		return Array.from({ length: total }, (_, i) => i + 1);

	const leftSiblingIndex = Math.max(current - siblings, boundaries + 1);
	const rightSiblingIndex = Math.min(current + siblings, total - boundaries);
	const showLeftDots = leftSiblingIndex > boundaries + 2;
	const showRightDots = rightSiblingIndex < total - boundaries - 1;

	const result: (number | 'dots')[] = [];
	for (let i = 1; i <= boundaries; i++) result.push(i);
	if (showLeftDots) result.push('dots');
	for (let i = leftSiblingIndex; i <= rightSiblingIndex; i++) result.push(i);
	if (showRightDots) result.push('dots');
	for (let i = total - boundaries + 1; i <= total; i++) result.push(i);
	return result;
}

export function Pagination({
	total,
	value: controlled,
	defaultValue = 1,
	onChange,
	siblings = 1,
	boundaries = 1,
	disabled = false,
	size = 'md',
	withEdges = false,
	withControls = true,
}: PaginationProps) {
	const [internal, setInternal] = React.useState(defaultValue);
	const current = controlled !== undefined ? controlled : internal;

	const goTo = (page: number) => {
		if (page < 1 || page > total || disabled) return;
		if (controlled === undefined) setInternal(page);
		onChange?.(page);
	};

	const range = getRange(total, current, siblings, boundaries);

	const baseBtn = [
		'flex items-center justify-center rounded-md font-medium transition-colors select-none',
		'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-1',
		disabled ? 'pointer-events-none opacity-50' : '',
		sizeMap[size],
	]
		.filter(Boolean)
		.join(' ');

	let dotsKey = 0;
	return (
		<nav aria-label='Pagination'>
			<ul className='flex items-center gap-1 list-none m-0 p-0'>
				{withEdges && (
					<li>
						<button
							type='button'
							onClick={() => goTo(1)}
							disabled={current === 1 || disabled}
							aria-label='First page'
							className={[baseBtn, 'hover:bg-muted/40'].join(
								' ',
							)}>
							{'«'}
						</button>
					</li>
				)}
				{withControls && (
					<li>
						<button
							type='button'
							onClick={() => goTo(current - 1)}
							disabled={current === 1 || disabled}
							aria-label='Previous page'
							className={[baseBtn, 'hover:bg-muted/40'].join(
								' ',
							)}>
							{'‹'}
						</button>
					</li>
				)}
				{range.map((page) => {
					if (page === 'dots') {
						return (
							<li key={`dots-${dotsKey++}`}>
								<span
									className={[
										baseBtn,
										'pointer-events-none',
									].join(' ')}>
									…
								</span>
							</li>
						);
					}
					return (
						<li key={page}>
							<button
								type='button'
								onClick={() => goTo(page)}
								disabled={disabled}
								aria-current={
									page === current ? 'page' : undefined
								}
								className={[
									baseBtn,
									page === current
										? 'bg-brand text-white'
										: 'hover:bg-muted/40 text-on-surface',
								].join(' ')}>
								{page}
							</button>
						</li>
					);
				})}
				{withControls && (
					<li>
						<button
							type='button'
							onClick={() => goTo(current + 1)}
							disabled={current === total || disabled}
							aria-label='Next page'
							className={[baseBtn, 'hover:bg-muted/40'].join(
								' ',
							)}>
							{'›'}
						</button>
					</li>
				)}
				{withEdges && (
					<li>
						<button
							type='button'
							onClick={() => goTo(total)}
							disabled={current === total || disabled}
							aria-label='Last page'
							className={[baseBtn, 'hover:bg-muted/40'].join(
								' ',
							)}>
							{'»'}
						</button>
					</li>
				)}
			</ul>
		</nav>
	);
}
