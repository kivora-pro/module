import type { ColorScheme, Size, Variant } from '@kivora/core';
import { cx, getButtonClasses } from '@kivora/core';
import type { Component, JSX } from 'solid-js';
import { splitProps } from 'solid-js';

export interface ButtonProps extends JSX.ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: Variant;
	size?: Size;
	colorScheme?: ColorScheme;
	isLoading?: boolean;
	fullWidth?: boolean;
	leftIcon?: JSX.Element;
	rightIcon?: JSX.Element;
}

export const Button: Component<ButtonProps> = (rawProps) => {
	const [local, rest] = splitProps(rawProps, [
		'variant',
		'size',
		'colorScheme',
		'isLoading',
		'fullWidth',
		'leftIcon',
		'rightIcon',
		'class',
		'children',
	]);

	const classes = () =>
		cx(
			getButtonClasses({
				variant: local.variant ?? 'solid',
				size: local.size ?? 'md',
				colorScheme: local.colorScheme ?? 'primary',
				disabled: rest.disabled || local.isLoading,
			}),
			local.fullWidth ? 'kv-btn--full' : undefined,
			local.class,
		);

	return (
		<button
			class={classes()}
			disabled={rest.disabled || local.isLoading}
			{...rest}>
			{local.isLoading && (
				<span
					class='kv-spinner'
					aria-hidden='true'
				/>
			)}
			{!local.isLoading && local.leftIcon && (
				<span class='kv-btn__icon kv-btn__icon--left'>
					{local.leftIcon}
				</span>
			)}
			<span class='kv-btn__label'>{local.children}</span>
			{!local.isLoading && local.rightIcon && (
				<span class='kv-btn__icon kv-btn__icon--right'>
					{local.rightIcon}
				</span>
			)}
		</button>
	);
};
