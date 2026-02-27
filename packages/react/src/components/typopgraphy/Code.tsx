'use client';

import React from 'react';
import type { SyntaxHighlighterProps } from 'react-syntax-highlighter';
import SyntaxHighlighterBase from 'react-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { useClipboard } from '../../hooks/use-clipboard';

// Cast necesario por incompatibilidad de tipos entre @types/react v18 y la librería
const SyntaxHighlighter =
	SyntaxHighlighterBase as unknown as React.ComponentType<SyntaxHighlighterProps>;

// ── Types ──────────────────────────────────────────────────────────────────

export interface CodeProps {
	/**
	 * Código a mostrar. En modo bloque debe ser un string.
	 * En modo inline acepta cualquier ReactNode.
	 */
	children: React.ReactNode;
	/**
	 * Muestra un bloque de código con syntax highlighting.
	 * @default false
	 */
	block?: boolean;
	/**
	 * Lenguaje para el syntax highlighting (solo en modo `block`).
	 * Cualquier lenguaje soportado por highlight.js.
	 * @default 'typescript'
	 */
	language?: string;
	/**
	 * Muestra numeración de líneas (solo en modo `block`).
	 * @default false
	 */
	showLineNumbers?: boolean;
	/**
	 * Muestra un botón para copiar el código al portapapeles.
	 * @default false
	 */
	copyable?: boolean;
	/**
	 * Tema de syntax highlighting. Cualquier objeto de estilo de
	 * `react-syntax-highlighter/dist/esm/styles/hljs`.
	 * @default atomOneDark
	 */
	highlighterStyle?: SyntaxHighlighterProps['style'];
	/** Props extra pasadas directamente a SyntaxHighlighter (escape hatch). */
	highlighterProps?: Omit<
		SyntaxHighlighterProps,
		'language' | 'style' | 'showLineNumbers' | 'children'
	>;
	className?: string;
	style?: React.CSSProperties;
}

// ── Component ──────────────────────────────────────────────────────────────

export function Code({
	block = false,
	language = 'typescript',
	showLineNumbers = false,
	copyable = false,
	highlighterStyle = atomOneDark,
	highlighterProps,
	className = '',
	style,
	children,
}: CodeProps) {
	// Separate customStyle from the rest so we can merge it with the defaults
	const { customStyle: userCustomStyle, ...restHighlighterProps } =
		highlighterProps ?? {};
	const { copy, copied } = useClipboard();

	// ── Inline code ────────────────────────────────────────────────────────
	if (!block) {
		return (
			<code
				className={[
					'rounded px-1.5 py-0.5 bg-muted font-mono text-[0.875em] text-on-surface',
					className,
				]
					.filter(Boolean)
					.join(' ')}
				style={style}>
				{children}
			</code>
		);
	}

	// ── Block code ─────────────────────────────────────────────────────────
	const code =
		typeof children === 'string' ? children : String(children ?? '');

	const handleCopy = () => copy(code);

	return (
		<div
			className={[
				'relative group rounded-xl overflow-hidden border border-white/8',
				className,
			]
				.filter(Boolean)
				.join(' ')}
			style={style}>
			{/* Language badge */}
			{language && (
				<span className='absolute top-2 left-3 text-[10px] font-mono text-white/40 select-none z-10 pointer-events-none'>
					{language}
				</span>
			)}

			{/* Copy button */}
			{copyable && (
				<button
					type='button'
					onClick={handleCopy}
					className={[
						'absolute top-2 right-2 z-10 px-2 py-1 rounded text-[11px] font-medium transition-all',
						'opacity-0 group-hover:opacity-100 focus:opacity-100',
						copied
							? 'bg-green-500/20 text-green-400'
							: 'bg-white/10 text-white/60 hover:bg-white/20 hover:text-white',
					].join(' ')}
					aria-label='Copiar código'>
					{copied ? '✓ Copiado' : 'Copiar'}
				</button>
			)}

			<SyntaxHighlighter
				language={language}
				style={highlighterStyle}
				showLineNumbers={showLineNumbers}
				customStyle={{
					margin: 0,
					borderRadius: 0,
					fontSize: '0.875rem',
					paddingTop: '2.25rem',
					paddingBottom: '1rem',
					background: '#09090b',
					...(userCustomStyle as React.CSSProperties | undefined),
				}}
				lineNumberStyle={{
					opacity: 0.35,
					userSelect: 'none',
					minWidth: '2.5em',
				}}
				{...restHighlighterProps}>
				{code}
			</SyntaxHighlighter>
		</div>
	);
}
