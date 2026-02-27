'use client';

import { useCallback, useState } from 'react';

export function useForceUpdate(): () => void {
	const [, setState] = useState(0);
	return useCallback(() => setState((c) => c + 1), []);
}
