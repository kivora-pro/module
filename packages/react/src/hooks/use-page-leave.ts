'use client';

import { useEffect } from 'react';

export function usePageLeave(onPageLeave: () => void): void {
	useEffect(() => {
		if (!onPageLeave) return;

		document.addEventListener('mouseleave', onPageLeave);
		return () => document.removeEventListener('mouseleave', onPageLeave);
	}, [onPageLeave]);
}
