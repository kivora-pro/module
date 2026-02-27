'use client';

import React, { useRef } from 'react';

export interface FileButtonProps {
	onChange: (files: File | File[] | null) => void;
	accept?: string;
	multiple?: boolean;
	capture?: 'user' | 'environment';
	children: (props: { onClick: () => void }) => React.ReactNode;
	resetRef?: React.Ref<() => void>;
}

export function FileButton({
	onChange,
	accept,
	multiple = false,
	capture,
	children,
	resetRef,
}: FileButtonProps) {
	const inputRef = useRef<HTMLInputElement>(null);

	const onClick = () => inputRef.current?.click();

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { files } = event.currentTarget;
		if (!files) return onChange(null);
		onChange(multiple ? Array.from(files) : (files[0] ?? null));
		event.currentTarget.value = '';
	};

	React.useImperativeHandle(resetRef as React.Ref<() => void>, () => () => {
		if (inputRef.current) inputRef.current.value = '';
	});

	return (
		<>
			<input
				ref={inputRef}
				type='file'
				accept={accept}
				multiple={multiple}
				capture={capture}
				onChange={handleChange}
				className='hidden'
				aria-hidden='true'
				tabIndex={-1}
			/>
			{children({ onClick })}
		</>
	);
}
