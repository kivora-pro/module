import { defineConfig } from 'tsup';

export default defineConfig({
	entry: { index: 'src/index.ts' },
	format: ['cjs'],
	dts: true,
	sourcemap: true,
	clean: true,
	external: ['react', 'react-native'],
	esbuildOptions(options) {
		options.jsx = 'automatic';
	},
});
