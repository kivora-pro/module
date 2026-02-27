import { colors } from './tokens/tokens';
import type { ColorScheme, Size, Variant } from './types';

/**
 * Returns the base CSS class string for a button given its variant, size and color scheme.
 * Framework-agnostic — used by @kivora/react, @kivora/solid and @kivora/svelte.
 */
export function getButtonClasses(options: {
	variant: Variant;
	size: Size;
	colorScheme: ColorScheme;
	disabled?: boolean;
}): string {
	const { variant, size, colorScheme, disabled } = options;

	const base = 'kv-btn';
	const variantClass = `kv-btn--${variant}`;
	const sizeClass = `kv-btn--${size}`;
	const colorClass = `kv-btn--${colorScheme}`;
	const disabledClass = disabled ? 'kv-btn--disabled' : '';

	return [base, variantClass, sizeClass, colorClass, disabledClass]
		.filter(Boolean)
		.join(' ');
}

/**
 * Merge CSS class names, filtering out falsy values.
 */
export function cx(...classes: (string | undefined | null | false)[]): string {
	return classes.filter(Boolean).join(' ');
}

// Re-export colors so consumers can use them programmatically
export { colors };
