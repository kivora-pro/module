'use client';

import { useEffect, useRef } from 'react';

export function useLogger(
	componentName: string,
	props: Record<string, unknown>,
): void {
	const prevPropsRef = useRef<Record<string, unknown>>(props);

	useEffect(() => {
		console.log(`[${componentName}] mounted`, props);
		return () => {
			console.log(`[${componentName}] unmounted`);
		};
	}, []);

	useEffect(() => {
		const prevProps = prevPropsRef.current;
		const isFirstRender = prevProps === props;

		if (!isFirstRender) {
			const changedProps: Record<
				string,
				{ prev: unknown; next: unknown }
			> = {};
			Object.keys(props).forEach((key) => {
				if (prevProps[key] !== props[key]) {
					changedProps[key] = {
						prev: prevProps[key],
						next: props[key],
					};
				}
			});

			if (Object.keys(changedProps).length > 0) {
				console.log(`[${componentName}] updated`, changedProps);
			}
		}

		prevPropsRef.current = props;
	});
}
