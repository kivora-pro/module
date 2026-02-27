// Shared types for all Kivora packages

export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type Variant = 'solid' | 'outline' | 'ghost' | 'link';
export type ColorScheme =
	| 'primary'
	| 'neutral'
	| 'success'
	| 'warning'
	| 'danger';
export type Radius = 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full';

export interface BaseProps {
	/** Additional CSS class names */
	class?: string;
	/** Visual size of the component */
	size?: Size;
	/** Color scheme */
	colorScheme?: ColorScheme;
	/** Whether the component is disabled */
	disabled?: boolean;
}
