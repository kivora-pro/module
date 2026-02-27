'use client';

import React from 'react';
import {
	Input,
	InputWrapper,
	type InputProps,
	type InputSize,
	type InputWrapperProps,
} from './Input';

export interface FileInputProps
	extends
		Omit<InputProps, 'size' | 'type' | 'value' | 'onChange'>,
		Pick<
			InputWrapperProps,
			'label' | 'description' | 'error' | 'required' | 'withAsterisk'
		> {
	size?: InputSize;
	value?: File | File[] | null;
	onChange?: (file: File | File[] | null) => void;
	multiple?: boolean;
	accept?: string;
	clearable?: boolean;
	placeholder?: string;
	valueComponent?: React.ComponentType<{ value: File | File[] | null }>;
	id?: string;
}

export const FileInput = React.forwardRef<HTMLButtonElement, FileInputProps>(
	(
		{
			label,
			description,
			error,
			required,
			withAsterisk,
			id,
			value,
			onChange,
			multiple = false,
			accept,
			clearable = false,
			placeholder = 'Pick file',
			size = 'md',
			...props
		},
		ref,
	) => {
		const inputRef = React.useRef<HTMLInputElement>(null);
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const PolyInput = Input as any;
		const displayName = !value
			? null
			: Array.isArray(value)
				? value.map((f) => f.name).join(', ')
				: value.name;

		return (
			<InputWrapper
				label={label}
				description={description}
				error={error}
				required={required}
				withAsterisk={withAsterisk}
				id={id}>
				<div className='relative'>
					<input
						ref={inputRef}
						type='file'
						accept={accept}
						multiple={multiple}
						className='sr-only'
						id={id}
						onChange={(e) => {
							const files = e.target.files;
							if (!files) return onChange?.(null);
							onChange?.(
								multiple
									? Array.from(files)
									: (files[0] ?? null),
							);
						}}
					/>
					<PolyInput
						component='button'
						type='button'
						onClick={() => inputRef.current?.click()}
						error={error}
						size={size}
						className='text-left'
						rightSection={
							clearable && value ? (
								<button
									type='button'
									onClick={(e) => {
										e.stopPropagation();
										onChange?.(null);
										if (inputRef.current)
											inputRef.current.value = '';
									}}
									className='text-muted hover:text-on-surface p-1'>
									<svg
										className='w-3.5 h-3.5'
										viewBox='0 0 20 20'
										fill='currentColor'>
										<path
											fillRule='evenodd'
											d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
											clipRule='evenodd'
										/>
									</svg>
								</button>
							) : undefined
						}
						{...(props as React.HTMLAttributes<HTMLButtonElement>)}>
						<span
							className={
								displayName ? 'text-on-surface' : 'text-muted'
							}>
							{displayName ?? placeholder}
						</span>
					</PolyInput>
				</div>
			</InputWrapper>
		);
	},
);
FileInput.displayName = 'FileInput';
