'use client';

import React, { useState } from 'react';
import { Pill } from '../data-display/Pill';
import { InputWrapper, type InputSize, type InputWrapperProps } from './Input';

export interface PillsInputProps extends Pick<
	InputWrapperProps,
	'label' | 'description' | 'error' | 'required' | 'withAsterisk'
> {
	value?: string[];
	defaultValue?: string[];
	onChange?: (value: string[]) => void;
	size?: InputSize;
	placeholder?: string;
	id?: string;
	children?: React.ReactNode;
}

export function PillsInput({
	label,
	description,
	error,
	required,
	withAsterisk,
	id,
	value: controlled,
	defaultValue = [],
	onChange,
	size = 'sm',
	placeholder,
	children,
}: PillsInputProps) {
	const [internal, setInternal] = useState(defaultValue);
	const [inputVal, setInputVal] = useState('');
	const pills = controlled ?? internal;

	const add = (v: string) => {
		const t = v.trim();
		if (!t || pills.includes(t)) return;
		const next = [...pills, t];
		if (!controlled) setInternal(next);
		onChange?.(next);
		setInputVal('');
	};
	const remove = (v: string) => {
		const next = pills.filter((p) => p !== v);
		if (!controlled) setInternal(next);
		onChange?.(next);
	};

	return (
		<InputWrapper
			label={label}
			description={description}
			error={error}
			required={required}
			withAsterisk={withAsterisk}
			id={id}>
			<div
				className={[
					'flex flex-wrap gap-1 items-center min-h-9 w-full rounded border bg-surface transition-colors p-1.5',
					'focus-within:ring-2 focus-within:ring-brand',
					error ? 'border-red-500' : 'border-border',
				].join(' ')}>
				{pills.map((p) => (
					<Pill
						key={p}
						size='xs'
						withRemoveButton
						onRemove={() => remove(p)}>
						{p}
					</Pill>
				))}
				{children ?? (
					<input
						id={id}
						value={inputVal}
						onChange={(e) => setInputVal(e.target.value)}
						onKeyDown={(e) => {
							if (e.key === 'Enter' || e.key === ',') {
								e.preventDefault();
								add(inputVal);
							}
							if (
								e.key === 'Backspace' &&
								!inputVal &&
								pills.length
							)
								remove(pills[pills.length - 1]);
						}}
						placeholder={
							pills.length === 0 ? placeholder : undefined
						}
						className='flex-1 min-w-[6rem] outline-none bg-transparent text-sm text-on-surface placeholder:text-muted'
					/>
				)}
			</div>
		</InputWrapper>
	);
}

function PillsInputField(props: React.InputHTMLAttributes<HTMLInputElement>) {
	return (
		<input
			className='flex-1 min-w-[6rem] outline-none bg-transparent text-sm text-on-surface placeholder:text-muted'
			{...props}
		/>
	);
}
PillsInputField.displayName = 'PillsInput.Field';
(PillsInput as typeof PillsInput & { Field: typeof PillsInputField }).Field =
	PillsInputField;
export { PillsInputField };
