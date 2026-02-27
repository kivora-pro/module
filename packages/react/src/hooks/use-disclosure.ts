'use client';

import { useCallback, useState } from 'react';

export interface UseDisclosureOptions {
	onOpen?: () => void;
	onClose?: () => void;
}

export interface UseDisclosureReturnValue {
	opened: boolean;
	open: () => void;
	close: () => void;
	toggle: () => void;
}

export function useDisclosure(
	initialState = false,
	options: UseDisclosureOptions = {},
): UseDisclosureReturnValue {
	const { onOpen, onClose } = options;
	const [opened, setOpened] = useState(initialState);

	const open = useCallback(() => {
		setOpened((isOpened) => {
			if (!isOpened) {
				onOpen?.();
				return true;
			}
			return isOpened;
		});
	}, [onOpen]);

	const close = useCallback(() => {
		setOpened((isOpened) => {
			if (isOpened) {
				onClose?.();
				return false;
			}
			return isOpened;
		});
	}, [onClose]);

	const toggle = useCallback(() => {
		setOpened((isOpened) => {
			if (isOpened) {
				onClose?.();
				return false;
			}
			onOpen?.();
			return true;
		});
	}, [onOpen, onClose]);

	return { opened, open, close, toggle };
}
