import { defineConfig } from 'tsup';

export default defineConfig({
	entry: { index: 'src/index.ts' },
	format: ['esm', 'cjs'],
	dts: true,
	sourcemap: true,
	clean: true,
	external: ['solid-js'],
	esbuildOptions(options) {
		options.jsx = 'preserve';
	},
});
