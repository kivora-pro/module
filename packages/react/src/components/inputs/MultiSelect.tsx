'use client';

import React, { useState } from 'react';
import { Pill } from '../data-display/Pill';
import { InputWrapper, type InputSize, type InputWrapperProps } from './Input';

export interface MultiSelectProps extends Pick<
	InputWrapperProps,
	'label' | 'description' | 'error' | 'required' | 'withAsterisk'
> {
	data: (
		| string
		| { value: string; label: string; disabled?: boolean; group?: string }
	)[];
	value?: string[];
	defaultValue?: string[];
	onChange?: (value: string[]) => void;
	placeholder?: string;
	size?: InputSize;
	maxValues?: number;
	searchable?: boolean;
	clearable?: boolean;
	nothingFoundMessage?: React.ReactNode;
	hidePickedOptions?: boolean;
	id?: string;
	disabled?: boolean;
}

export function MultiSelect({
	data,
	value: controlled,
	defaultValue = [],
	onChange,
	placeholder = 'Pick values',
	size = 'sm',
	maxValues,
	searchable = false,
	clearable = false,
	nothingFoundMessage = 'Nothing found',
	hidePickedOptions = false,
	label,
	description,
	error,
	required,
	withAsterisk,
	id,
	disabled = false,
}: MultiSelectProps) {
	const [internal, setInternal] = useState(defaultValue);
	const [search, setSearch] = useState('');
	const [opened, setOpened] = useState(false);
	const value = controlled ?? internal;

	const options = data
		.map((d) => (typeof d === 'string' ? { value: d, label: d } : d))
		.filter((o) => !hidePickedOptions || !value.includes(o.value))
		.filter(
			(o) =>
				!search || o.label.toLowerCase().includes(search.toLowerCase()),
		);

	const toggle = (v: string) => {
		let next: string[];
		if (value.includes(v)) next = value.filter((x) => x !== v);
		else if (maxValues && value.length >= maxValues) return;
		else next = [...value, v];
		if (!controlled) setInternal(next);
		onChange?.(next);
	};

	const remove = (v: string) => toggle(v);

	return (
		<InputWrapper
			label={label}
			description={description}
			error={error}
			required={required}
			withAsterisk={withAsterisk}
			id={id}>
			<div className='relative'>
				<div
					className={[
						'flex flex-wrap gap-1 items-center min-h-9 w-full rounded border bg-surface transition-colors p-1.5 cursor-pointer',
						'focus-within:ring-2 focus-within:ring-brand focus-within:ring-offset-1',
						error ? 'border-red-500' : 'border-border',
						disabled ? 'pointer-events-none opacity-50' : '',
					].join(' ')}
					onClick={() => !disabled && setOpened((v) => !v)}>
					{value.map((v) => {
						const opt = (
							data as { value: string; label: string }[]
						).find(
							(d) => (typeof d === 'string' ? d : d.value) === v,
						);
						const lbl =
							typeof opt === 'string' ? opt : (opt?.label ?? v);
						return (
							<Pill
								key={v}
								size='xs'
								withRemoveButton
								onRemove={() => {
									remove(v);
								}}>
								{lbl}
							</Pill>
						);
					})}
					{searchable ? (
						<input
							value={search}
							onChange={(e) => setSearch(e.target.value)}
							onFocus={() => setOpened(true)}
							placeholder={
								value.length === 0 ? placeholder : undefined
							}
							className='flex-1 min-w-[4rem] outline-none bg-transparent text-sm text-on-surface placeholder:text-muted'
							onClick={(e) => e.stopPropagation()}
						/>
					) : (
						value.length === 0 && (
							<span className='text-sm text-muted'>
								{placeholder}
							</span>
						)
					)}
				</div>
				{opened && (
					<div className='absolute z-50 left-0 right-0 mt-1 max-h-48 overflow-auto rounded-md border border-border bg-surface shadow-lg'>
						{options.length === 0 ? (
							<div className='px-3 py-2 text-sm text-muted'>
								{nothingFoundMessage}
							</div>
						) : (
							options.map((opt) => (
								<div
									key={opt.value}
									onClick={() => {
										toggle(opt.value);
										if (!searchable) setOpened(false);
									}}
									className={[
										'flex items-center gap-2 px-3 py-2 text-sm cursor-pointer hover:bg-muted/20 transition-colors',
										value.includes(opt.value)
											? 'text-brand font-medium'
											: 'text-on-surface',
									].join(' ')}>
									{value.includes(opt.value) && (
										<span className='text-brand'>✓</span>
									)}
									{opt.label}
								</div>
							))
						)}
					</div>
				)}
			</div>
		</InputWrapper>
	);
}
