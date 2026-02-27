'use client';

import { useId as useReactId } from 'react';

export function useId(staticId?: string): string {
	const internalId = useReactId();
	return staticId ?? internalId;
}
