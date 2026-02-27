'use client';

import { useEffect } from 'react';

export function useFavicon(url: string): void {
	useEffect(() => {
		if (typeof window === 'undefined') return;

		let link = document.querySelector<HTMLLinkElement>("link[rel*='icon']");

		if (!link) {
			link = document.createElement('link');
			link.rel = 'icon';
			document.head.appendChild(link);
		}

		link.href = url;
	}, [url]);
}
