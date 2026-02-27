'use client';

/**
 * @ott-template/ui – Dropzone extension
 * File drop zone component.
 */

import React, { useCallback, useRef, useState } from 'react';

export type DropzoneStatus = 'idle' | 'accept' | 'reject';

export interface DropzoneProps extends Omit<
	React.HTMLAttributes<HTMLDivElement>,
	'onDrop' | 'children'
> {
	onDrop?: (files: File[]) => void;
	onDropAccepted?: (files: File[]) => void;
	onDropRejected?: (files: FileRejection[]) => void;
	accept?: Record<string, string[]> | string[];
	multiple?: boolean;
	maxSize?: number;
	maxFiles?: number;
	disabled?: boolean;
	loading?: boolean;
	openRef?: React.RefObject<() => void>;
	activateOnClick?: boolean;
	activateOnKeyboard?: boolean;
	idleColor?: string;
	acceptColor?: string;
	rejectColor?: string;
	className?: string;
	children?: React.ReactNode | ((status: DropzoneStatus) => React.ReactNode);
}

export interface FileRejection {
	file: File;
	errors: string[];
}

export function Dropzone({
	onDrop,
	onDropAccepted,
	onDropRejected,
	accept,
	multiple = true,
	maxSize = Infinity,
	maxFiles = Infinity,
	disabled = false,
	loading = false,
	openRef,
	activateOnClick = true,
	className = '',
	children,
	...props
}: DropzoneProps) {
	const [status, setStatus] = useState<DropzoneStatus>('idle');
	const inputRef = useRef<HTMLInputElement>(null);

	if (openRef)
		(openRef as React.MutableRefObject<() => void>).current = () =>
			inputRef.current?.click();

	const validate = useCallback(
		(file: File): string[] => {
			const errors: string[] = [];
			if (file.size > maxSize)
				errors.push(
					`File too large (max ${(maxSize / 1024 / 1024).toFixed(1)} MB)`,
				);
			return errors;
		},
		[maxSize],
	);

	const processFiles = useCallback(
		(files: File[]) => {
			const accepted: File[] = [];
			const rejected: FileRejection[] = [];
			files.forEach((f) => {
				const errs = validate(f);
				if (errs.length) rejected.push({ file: f, errors: errs });
				else accepted.push(f);
			});
			if (accepted.length) {
				onDrop?.(accepted);
				onDropAccepted?.(accepted);
			}
			if (rejected.length) onDropRejected?.(rejected);
		},
		[validate, onDrop, onDropAccepted, onDropRejected],
	);

	const statusClasses: Record<DropzoneStatus, string> = {
		idle: 'border-border',
		accept: 'border-brand bg-brand/5',
		reject: 'border-red-500 bg-red-50',
	};

	return (
		<div
			className={[
				'relative flex items-center justify-center border-2 border-dashed rounded-lg p-8 transition-all cursor-pointer',
				statusClasses[status],
				disabled || loading
					? 'opacity-50 pointer-events-none'
					: 'hover:border-brand hover:bg-brand/5',
				className,
			]
				.filter(Boolean)
				.join(' ')}
			onClick={() => activateOnClick && inputRef.current?.click()}
			onDragOver={(e) => {
				e.preventDefault();
				setStatus('accept');
			}}
			onDragLeave={() => setStatus('idle')}
			onDrop={(e) => {
				e.preventDefault();
				setStatus('idle');
				const files = Array.from(e.dataTransfer.files);
				processFiles(multiple ? files : [files[0]]);
			}}
			{...props}>
			<input
				ref={inputRef}
				type='file'
				multiple={multiple}
				accept={Array.isArray(accept) ? accept.join(',') : undefined}
				className='sr-only'
				onChange={(e) => {
					const files = Array.from(e.target.files ?? []);
					processFiles(files);
					e.target.value = '';
				}}
			/>
			{typeof children === 'function' ? children(status) : children}
		</div>
	);
}

export function DropzoneAccept({ children }: { children: React.ReactNode }) {
	return <>{children}</>;
}
export function DropzoneReject({ children }: { children: React.ReactNode }) {
	return <>{children}</>;
}
export function DropzoneIdle({ children }: { children: React.ReactNode }) {
	return <>{children}</>;
}
DropzoneAccept.displayName = 'Dropzone.Accept';
DropzoneReject.displayName = 'Dropzone.Reject';
DropzoneIdle.displayName = 'Dropzone.Idle';
(
	Dropzone as typeof Dropzone & {
		Accept: typeof DropzoneAccept;
		Reject: typeof DropzoneReject;
		Idle: typeof DropzoneIdle;
	}
).Accept = DropzoneAccept;
(
	Dropzone as typeof Dropzone & {
		Accept: typeof DropzoneAccept;
		Reject: typeof DropzoneReject;
		Idle: typeof DropzoneIdle;
	}
).Reject = DropzoneReject;
(
	Dropzone as typeof Dropzone & {
		Accept: typeof DropzoneAccept;
		Reject: typeof DropzoneReject;
		Idle: typeof DropzoneIdle;
	}
).Idle = DropzoneIdle;
