import { defineConfig } from 'tsup';

export default defineConfig({
	entry: { index: 'src/index.ts' },
	format: ['esm', 'cjs'],
	dts: true,
	sourcemap: true,
	clean: true,
	external: [
		'react',
		'react-dom',
		'framer-motion',
		'sonner',
		'react-day-picker',
		'date-fns',
	],
	banner: { js: "'use client';" },
	esbuildOptions(options) {
		options.jsx = 'automatic';
	},
});
