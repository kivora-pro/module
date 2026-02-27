'use client';

import { useCallback, useRef, useState } from 'react';

export interface FileDialogOptions {
	accept?: string;
	multiple?: boolean;
}

export interface UseFileDialogReturnValue {
	open: (options?: FileDialogOptions) => void;
	reset: () => void;
	files: FileList | null;
}

export function useFileDialog(
	defaultOptions?: FileDialogOptions,
): UseFileDialogReturnValue {
	const [files, setFiles] = useState<FileList | null>(null);
	const inputRef = useRef<HTMLInputElement | null>(null);

	const getOrCreateInput = useCallback(() => {
		if (!inputRef.current) {
			const input = document.createElement('input');
			input.type = 'file';
			input.style.display = 'none';
			input.addEventListener('change', () => {
				setFiles(input.files);
			});
			inputRef.current = input;
		}
		return inputRef.current;
	}, []);

	const open = useCallback(
		(options?: FileDialogOptions) => {
			const input = getOrCreateInput();
			const merged = { ...defaultOptions, ...options };
			input.accept = merged.accept ?? '';
			input.multiple = merged.multiple ?? false;
			input.click();
		},
		[defaultOptions, getOrCreateInput],
	);

	const reset = useCallback(() => {
		setFiles(null);
		if (inputRef.current) {
			inputRef.current.value = '';
		}
	}, []);

	return { open, reset, files };
}
