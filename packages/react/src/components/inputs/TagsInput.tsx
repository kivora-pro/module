'use client';

import React, { useState } from 'react';
import { Pill } from '../data-display/Pill';
import { InputWrapper, type InputSize, type InputWrapperProps } from './Input';

export interface TagsInputProps extends Pick<
	InputWrapperProps,
	'label' | 'description' | 'error' | 'required' | 'withAsterisk'
> {
	value?: string[];
	defaultValue?: string[];
	onChange?: (value: string[]) => void;
	data?: string[];
	placeholder?: string;
	size?: InputSize;
	maxTags?: number;
	allowDuplicates?: boolean;
	splitChars?: string[];
	clearable?: boolean;
	searchable?: boolean;
	id?: string;
}

export function TagsInput({
	value: controlled,
	defaultValue = [],
	onChange,
	data = [],
	placeholder = 'Add tag...',
	size = 'md',
	maxTags,
	allowDuplicates = false,
	splitChars = [','],
	label,
	description,
	error,
	required,
	withAsterisk,
	id,
}: TagsInputProps) {
	const [internal, setInternal] = useState(defaultValue);
	const [inputValue, setInputValue] = useState('');
	const tags = controlled ?? internal;

	const addTag = (tag: string) => {
		const trimmed = tag.trim();
		if (!trimmed || (!allowDuplicates && tags.includes(trimmed))) return;
		if (maxTags !== undefined && tags.length >= maxTags) return;
		const next = [...tags, trimmed];
		if (!controlled) setInternal(next);
		onChange?.(next);
	};

	const removeTag = (i: number) => {
		const next = tags.filter((_, idx) => idx !== i);
		if (!controlled) setInternal(next);
		onChange?.(next);
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter' || splitChars.includes(e.key)) {
			e.preventDefault();
			addTag(inputValue);
			setInputValue('');
		}
		if (e.key === 'Backspace' && !inputValue && tags.length) {
			removeTag(tags.length - 1);
		}
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
					'flex flex-wrap gap-1.5 items-center min-h-9 w-full rounded border bg-surface transition-colors p-1.5',
					'focus-within:ring-2 focus-within:ring-brand focus-within:ring-offset-1',
					error ? 'border-red-500' : 'border-border',
				].join(' ')}>
				{tags.map((tag, i) => (
					<Pill
						key={i}
						size='xs'
						withRemoveButton
						onRemove={() => removeTag(i)}>
						{tag}
					</Pill>
				))}
				<input
					id={id}
					value={inputValue}
					onChange={(e) => setInputValue(e.target.value)}
					onKeyDown={handleKeyDown}
					placeholder={tags.length === 0 ? placeholder : undefined}
					className='flex-1 min-w-[6rem] outline-none bg-transparent text-sm text-on-surface placeholder:text-muted'
				/>
			</div>
		</InputWrapper>
	);
}
