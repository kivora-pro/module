'use client';

import React from 'react';
import {
	InputWrapper,
	type InputSize,
	type InputVariant,
	type InputWrapperProps,
} from './Input';

export interface TextareaProps
	extends
		Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'>,
		Pick<
			InputWrapperProps,
			'label' | 'description' | 'error' | 'required' | 'withAsterisk'
		> {
	size?: InputSize;
	variant?: InputVariant;
	autosize?: boolean;
	minRows?: number;
	maxRows?: number;
	resize?: React.CSSProperties['resize'];
	id?: string;
}

const sizeClasses: Record<InputSize, string> = {
	xs: 'text-xs px-2 py-1.5',
	sm: 'text-sm px-3 py-2',
	md: 'text-sm px-3 py-2',
	lg: 'text-base px-4 py-2.5',
	xl: 'text-lg px-4 py-3',
};

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
	(
		{
			label,
			description,
			error,
			required,
			withAsterisk,
			id,
			size = 'md',
			variant = 'default',
			autosize = false,
			minRows = 3,
			maxRows,
			resize = 'vertical',
			className = '',
			style,
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
			id={id}>
			<textarea
				ref={ref}
				id={id}
				rows={minRows}
				className={[
					'w-full rounded transition-colors outline-none',
					'focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-1',
					'disabled:pointer-events-none disabled:opacity-50',
					sizeClasses[size],
					variant === 'filled'
						? 'border border-transparent bg-muted/30 text-on-surface placeholder:text-muted'
						: variant === 'unstyled'
							? 'border-none bg-transparent'
							: 'border border-border bg-surface text-on-surface placeholder:text-muted',
					error ? 'border-red-500 focus-visible:ring-red-500' : '',
					className,
				]
					.filter(Boolean)
					.join(' ')}
				style={{ resize, ...style }}
				aria-invalid={!!error}
				{...props}
			/>
		</InputWrapper>
	),
);
Textarea.displayName = 'Textarea';
