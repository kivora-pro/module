'use client';

import { useEffect, useLayoutEffect } from 'react';

/**
 * useLayoutEffect replacement that works in SSR environments.
 * Uses useLayoutEffect when running in the browser, falls back to useEffect on server.
 */
export const useIsomorphicEffect =
	typeof window !== 'undefined' ? useLayoutEffect : useEffect;
