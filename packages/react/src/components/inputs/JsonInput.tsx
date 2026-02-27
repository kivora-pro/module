'use client';

import React from 'react';
import { type InputWrapperProps } from './Input';
import { Textarea, type TextareaProps } from './Textarea';

export interface JsonInputProps
	extends
		Omit<TextareaProps, 'value' | 'onChange'>,
		Pick<
			InputWrapperProps,
			'label' | 'description' | 'error' | 'required' | 'withAsterisk'
		> {
	value?: string;
	defaultValue?: string;
	onChange?: (value: string) => void;
	formatOnBlur?: boolean;
	validationError?: React.ReactNode;
	deserializeError?: React.ReactNode;
	id?: string;
}

export const JsonInput = React.forwardRef<HTMLTextAreaElement, JsonInputProps>(
	(
		{
			label,
			description,
			error,
			required,
			withAsterisk,
			id,
			value,
			defaultValue,
			onChange,
			formatOnBlur = false,
			validationError = 'Invalid JSON',
			...props
		},
		ref,
	) => {
		const [internal, setInternal] = React.useState(defaultValue ?? '');
		const [jsonError, setJsonError] = React.useState<string | null>(null);
		const current = value !== undefined ? value : internal;

		const validate = (v: string) => {
			if (!v) {
				setJsonError(null);
				return;
			}
			try {
				JSON.parse(v);
				setJsonError(null);
			} catch {
				setJsonError(validationError as string);
			}
		};

		const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
			const v = e.target.value;
			if (value === undefined) setInternal(v);
			onChange?.(v);
			validate(v);
		};

		const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
			if (formatOnBlur) {
				try {
					const formatted = JSON.stringify(
						JSON.parse(current),
						null,
						2,
					);
					if (value === undefined) setInternal(formatted);
					onChange?.(formatted);
				} catch {}
			}
			props.onBlur?.(e);
		};

		return (
			<Textarea
				ref={ref}
				id={id}
				label={label}
				description={description}
				error={error ?? jsonError ?? undefined}
				required={required}
				withAsterisk={withAsterisk}
				value={current}
				onChange={handleChange}
				onBlur={handleBlur}
				{...props}
			/>
		);
	},
);
JsonInput.displayName = 'JsonInput';
