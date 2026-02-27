'use client';

import React, { useId, useRef, useState } from 'react';
import { InputWrapper, type InputSize, type InputWrapperProps } from './Input';

export interface PinInputProps extends Pick<
	InputWrapperProps,
	'label' | 'description' | 'error' | 'required' | 'withAsterisk'
> {
	length?: number;
	value?: string;
	defaultValue?: string;
	onChange?: (value: string) => void;
	onComplete?: (value: string) => void;
	size?: InputSize;
	type?: 'alphanumeric' | 'number' | RegExp;
	mask?: boolean;
	oneTimeCode?: boolean;
	manageFocus?: boolean;
	readOnly?: boolean;
	disabled?: boolean;
	placeholder?: string;
	id?: string;
}

const sizeMap: Record<InputSize, string> = {
	xs: 'w-7 h-7 text-sm',
	sm: 'w-8 h-8 text-base',
	md: 'w-10 h-10 text-base',
	lg: 'w-12 h-12 text-lg',
	xl: 'w-14 h-14 text-xl',
};

export function PinInput({
	length = 4,
	value: controlled,
	defaultValue = '',
	onChange,
	onComplete,
	size = 'md',
	mask = false,
	disabled = false,
	readOnly = false,
	placeholder = '○',
	type = 'alphanumeric',
	label,
	description,
	error,
	required,
	withAsterisk,
	id,
}: PinInputProps) {
	const [internal, setInternal] = useState(defaultValue);
	const value = controlled ?? internal;
	const refs = useRef<(HTMLInputElement | null)[]>([]);
	const baseId = useId();

	const chars = value.split('').slice(0, length);
	while (chars.length < length) chars.push('');

	const handleChange = (i: number, char: string) => {
		const next = [...chars];
		next[i] = char.slice(-1);
		const joined = next.join('');
		if (controlled === undefined) setInternal(joined);
		onChange?.(joined);
		if (char && i < length - 1) refs.current[i + 1]?.focus();
		if (next.every((c) => c !== '') && joined.length === length)
			onComplete?.(joined);
	};

	const handleKeyDown = (
		i: number,
		e: React.KeyboardEvent<HTMLInputElement>,
	) => {
		if (e.key === 'Backspace' && !chars[i] && i > 0)
			refs.current[i - 1]?.focus();
	};

	return (
		<InputWrapper
			label={label}
			description={description}
			error={error}
			required={required}
			withAsterisk={withAsterisk}
			id={`${baseId}-0`}>
			<div
				className='flex gap-2'
				role='group'>
				{chars.map((char, i) => (
					<input
						key={i}
						ref={(el) => {
							refs.current[i] = el;
						}}
						id={i === 0 ? (id ?? `${baseId}-0`) : `${baseId}-${i}`}
						type={
							mask
								? 'password'
								: type === 'number'
									? 'number'
									: 'text'
						}
						inputMode={type === 'number' ? 'numeric' : 'text'}
						maxLength={1}
						value={char}
						readOnly={readOnly}
						disabled={disabled}
						placeholder={placeholder}
						autoComplete={
							type === 'number' ? 'one-time-code' : 'off'
						}
						onChange={(e) => handleChange(i, e.target.value)}
						onKeyDown={(e) => handleKeyDown(i, e)}
						className={[
							'text-center rounded border border-border bg-surface text-on-surface outline-none transition-colors',
							'focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-1',
							'disabled:pointer-events-none disabled:opacity-50',
							sizeMap[size],
							error ? 'border-red-500' : '',
						]
							.filter(Boolean)
							.join(' ')}
					/>
				))}
			</div>
		</InputWrapper>
	);
}
