'use client';

import { useCallback, useState } from 'react';

export interface UsePaginationOptions {
	total: number;
	initialPage?: number;
	page?: number;
	onChange?: (page: number) => void;
	siblings?: number;
	boundaries?: number;
}

export interface UsePaginationReturnValue {
	range: (number | 'dots')[];
	active: number;
	setPage: (page: number) => void;
	next: () => void;
	previous: () => void;
	first: () => void;
	last: () => void;
}

function range(start: number, end: number): number[] {
	const length = end - start + 1;
	return Array.from({ length }, (_, i) => start + i);
}

export function usePagination({
	total,
	initialPage = 1,
	page,
	onChange,
	siblings = 1,
	boundaries = 1,
}: UsePaginationOptions): UsePaginationReturnValue {
	const [activePage, setActivePage] = useState(initialPage);

	const isControlled = page !== undefined;
	const active = isControlled ? page : activePage;

	const setPage = useCallback(
		(next: number) => {
			const clamped = Math.min(Math.max(next, 1), total);
			if (!isControlled) setActivePage(clamped);
			onChange?.(clamped);
		},
		[isControlled, onChange, total],
	);

	const buildRange = (): (number | 'dots')[] => {
		const totalPageNumbers = siblings * 2 + 3 + boundaries * 2;

		if (totalPageNumbers >= total) {
			return range(1, total);
		}

		const leftSiblingIndex = Math.max(active - siblings, boundaries);
		const rightSiblingIndex = Math.min(
			active + siblings,
			total - boundaries,
		);

		const shouldShowLeftDots = leftSiblingIndex > boundaries + 2;
		const shouldShowRightDots = rightSiblingIndex < total - boundaries - 1;

		const leftRange = range(1, boundaries);
		const rightRange = range(total - boundaries + 1, total);

		if (!shouldShowLeftDots && shouldShowRightDots) {
			const leftItemCount = siblings * 2 + boundaries + 2;
			return [...range(1, leftItemCount), 'dots', ...rightRange];
		}

		if (shouldShowLeftDots && !shouldShowRightDots) {
			const rightItemCount = siblings * 2 + boundaries + 2;
			return [
				...leftRange,
				'dots',
				...range(total - rightItemCount + 1, total),
			];
		}

		return [
			...leftRange,
			'dots',
			...range(leftSiblingIndex, rightSiblingIndex),
			'dots',
			...rightRange,
		];
	};

	return {
		range: buildRange(),
		active,
		setPage,
		next: () => setPage(active + 1),
		previous: () => setPage(active - 1),
		first: () => setPage(1),
		last: () => setPage(total),
	};
}
