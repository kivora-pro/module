'use client';

import React from 'react';
import {
	Input,
	InputWrapper,
	type InputProps,
	type InputSize,
	type InputWrapperProps,
} from './Input';

export interface AutocompleteProps
	extends
		Omit<InputProps, 'size'>,
		Pick<
			InputWrapperProps,
			'label' | 'description' | 'error' | 'required' | 'withAsterisk'
		> {
	data: string[] | { value: string; label?: string }[];
	size?: InputSize;
	limit?: number;
	filter?: (
		value: string,
		item: { value: string; label?: string },
	) => boolean;
	onOptionSubmit?: (value: string) => void;
	id?: string;
}

export const Autocomplete = React.forwardRef<
	HTMLInputElement,
	AutocompleteProps
>(
	(
		{
			label,
			description,
			error,
			required,
			withAsterisk,
			id,
			data,
			size,
			limit = 7,
			filter,
			onOptionSubmit,
			value: controlledValue,
			onChange,
			...props
		},
		ref,
	) => {
		const [inputValue, setInputValue] = React.useState(
			(controlledValue as string) ?? '',
		);
		const [opened, setOpened] = React.useState(false);

		const normalize = (d: string | { value: string; label?: string }) =>
			typeof d === 'string'
				? { value: d, label: d }
				: { ...d, label: d.label ?? d.value };
		const options = data
			.map(normalize)
			.filter((opt) =>
				filter
					? filter(inputValue, opt)
					: opt.label
							.toLowerCase()
							.includes(inputValue.toLowerCase()),
			)
			.slice(0, limit);

		return (
			<InputWrapper
				label={label}
				description={description}
				error={error}
				required={required}
				withAsterisk={withAsterisk}
				id={id}>
				<div className='relative'>
					<Input
						ref={ref}
						id={id}
						size={size}
						error={error}
						value={inputValue}
						onChange={(e) => {
							setInputValue(e.target.value);
							setOpened(true);
							(
								onChange as React.ChangeEventHandler<HTMLInputElement>
							)?.(e);
						}}
						onFocus={() => setOpened(true)}
						onBlur={() => setTimeout(() => setOpened(false), 150)}
						{...props}
					/>
					{opened && options.length > 0 && (
						<div className='absolute z-50 left-0 right-0 mt-1 rounded-md border border-border bg-surface shadow-lg overflow-hidden'>
							{options.map((opt) => (
								<div
									key={opt.value}
									onMouseDown={(e) => {
										e.preventDefault();
										setInputValue(opt.label);
										setOpened(false);
										onOptionSubmit?.(opt.value);
									}}
									className='px-3 py-2 text-sm cursor-pointer hover:bg-muted/20 transition-colors text-on-surface'>
									{opt.label}
								</div>
							))}
						</div>
					)}
				</div>
			</InputWrapper>
		);
	},
);
Autocomplete.displayName = 'Autocomplete';
