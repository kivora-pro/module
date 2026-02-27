import type { Plugin } from 'vite';

/**
 * @kivora/vite — Vite plugin (WIP)
 *
 * This package will house Vite-specific tooling for the Kivora ecosystem.
 * Possible uses:
 *   - Auto-import Kivora CSS tokens
 *   - Virtual module for the design system
 *   - Build optimizations for Kivora components
 */
export function kivora(): Plugin {
	return {
		name: 'vite-plugin-kivora',
		config() {
			return {};
		},
	};
}

export default kivora;
