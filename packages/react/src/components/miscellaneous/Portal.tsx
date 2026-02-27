'use client';

import React from 'react';
import { createPortal } from 'react-dom';

export interface PortalProps {
	children: React.ReactNode;
	target?: Element | null;
	reuseTargetNode?: boolean;
}

export function Portal({ children, target }: PortalProps) {
	if (typeof document === 'undefined') return null;
	return createPortal(children, target ?? document.body);
}
