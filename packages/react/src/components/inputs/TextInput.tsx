'use client';

import React from 'react';
import {
	Input,
	InputWrapper,
	type InputProps,
	type InputSize,
	type InputVariant,
	type InputWrapperProps,
} from './Input';

export interface TextInputProps
	extends
		Omit<InputProps, 'size'>,
		Pick<
			InputWrapperProps,
			'label' | 'description' | 'error' | 'required' | 'withAsterisk'
		> {
	size?: InputSize;
	variant?: InputVariant;
	id?: string;
}

export const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
	(
		{
			label,
			description,
			error,
			required,
			withAsterisk,
			id,
			className,
			...props
		},
		ref,
	) => (
		<InputWrapper
			label={label}
			description={description}
			error={error}
			required={required}
			withAsterisk={withAsterisk}
			id={id}
			className={className}>
			<Input
				ref={ref}
				id={id}
				type='text'
				error={error}
				{...props}
			/>
		</InputWrapper>
	),
);
TextInput.displayName = 'TextInput';
