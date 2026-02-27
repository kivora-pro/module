// Inlined from @kivora/core — kept local so @kivora/svelte has no runtime dep on core.

export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type Variant = 'solid' | 'outline' | 'ghost' | 'link';
export type ColorScheme =
	| 'primary'
	| 'neutral'
	| 'success'
	| 'warning'
	| 'danger';

export function getButtonClasses(options: {
	variant: Variant;
	size: Size;
	colorScheme: ColorScheme;
	disabled?: boolean;
}): string {
	const { variant, size, colorScheme, disabled } = options;
	return [
		'kv-btn',
		`kv-btn--${variant}`,
		`kv-btn--${size}`,
		`kv-btn--${colorScheme}`,
		disabled ? 'kv-btn--disabled' : '',
	]
		.filter(Boolean)
		.join(' ');
}

export function cx(...classes: (string | undefined | null | false)[]): string {
	return classes.filter(Boolean).join(' ');
}
