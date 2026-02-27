/** Mapa de tokens de espaciado → valores CSS */
export const SPACING_TOKENS: Record<string, string> = {
	xs: '0.5rem',
	sm: '0.75rem',
	md: '1rem',
	lg: '1.5rem',
	xl: '2rem',
};

/**
 * Convierte un token ('xs', 'md'...) al valor CSS correspondiente.
 * Si ya es un valor CSS o un número, lo devuelve sin cambios.
 */
export function resolveSpacing(
	value: number | string | undefined,
): string | number | undefined {
	if (typeof value === 'string' && value in SPACING_TOKENS) {
		return SPACING_TOKENS[value];
	}
	return value;
}
