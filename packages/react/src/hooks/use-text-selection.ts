'use client';

import { useEffect, useState } from 'react';

export interface UseTextSelectionReturnValue {
	text: string;
	ranges: Range[];
}

export function useTextSelection(): UseTextSelectionReturnValue {
	const [selection, setSelection] = useState<UseTextSelectionReturnValue>({
		text: '',
		ranges: [],
	});

	useEffect(() => {
		const handleSelectionChange = () => {
			const sel = window.getSelection();
			if (!sel || sel.isCollapsed) {
				setSelection({ text: '', ranges: [] });
				return;
			}
			const ranges: Range[] = [];
			for (let i = 0; i < sel.rangeCount; i++) {
				ranges.push(sel.getRangeAt(i));
			}
			setSelection({ text: sel.toString(), ranges });
		};

		document.addEventListener('selectionchange', handleSelectionChange);
		return () =>
			document.removeEventListener(
				'selectionchange',
				handleSelectionChange,
			);
	}, []);

	return selection;
}
