'use client';

import React, { useState } from 'react';
import {
	Input,
	InputWrapper,
	type InputProps,
	type InputSize,
	type InputWrapperProps,
} from './Input';

export interface PasswordInputProps
	extends
		Omit<InputProps, 'type' | 'size'>,
		Pick<
			InputWrapperProps,
			'label' | 'description' | 'error' | 'required' | 'withAsterisk'
		> {
	size?: InputSize;
	visibilityToggleLabel?: string;
	visible?: boolean;
	defaultVisible?: boolean;
	onVisibilityChange?: (visible: boolean) => void;
	id?: string;
}

const EyeIcon = ({ open }: { open: boolean }) =>
	open ? (
		<svg
			className='w-4 h-4'
			fill='none'
			viewBox='0 0 24 24'
			stroke='currentColor'>
			<path
				strokeLinecap='round'
				strokeLinejoin='round'
				strokeWidth={2}
				d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
			/>
			<path
				strokeLinecap='round'
				strokeLinejoin='round'
				strokeWidth={2}
				d='M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z'
			/>
		</svg>
	) : (
		<svg
			className='w-4 h-4'
			fill='none'
			viewBox='0 0 24 24'
			stroke='currentColor'>
			<path
				strokeLinecap='round'
				strokeLinejoin='round'
				strokeWidth={2}
				d='M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21'
			/>
		</svg>
	);

export const PasswordInput = React.forwardRef<
	HTMLInputElement,
	PasswordInputProps
>(
	(
		{
			label,
			description,
			error,
			required,
			withAsterisk,
			id,
			visible: controlled,
			defaultVisible = false,
			onVisibilityChange,
			...props
		},
		ref,
	) => {
		const [internal, setInternal] = useState(defaultVisible);
		const visible = controlled !== undefined ? controlled : internal;
		const toggle = () => {
			const next = !visible;
			if (controlled === undefined) setInternal(next);
			onVisibilityChange?.(next);
		};
		return (
			<InputWrapper
				label={label}
				description={description}
				error={error}
				required={required}
				withAsterisk={withAsterisk}
				id={id}>
				<Input
					ref={ref}
					id={id}
					type={visible ? 'text' : 'password'}
					error={error}
					rightSection={
						<button
							type='button'
							onClick={toggle}
							aria-label={
								visible ? 'Hide password' : 'Show password'
							}
							className='text-muted hover:text-on-surface transition-colors p-1'>
							<EyeIcon open={visible} />
						</button>
					}
					{...props}
				/>
			</InputWrapper>
		);
	},
);
PasswordInput.displayName = 'PasswordInput';
