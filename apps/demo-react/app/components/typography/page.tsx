'use client';

import {
	Demo,
	Label,
	PageBreadcrumb,
	PageHeader,
	PropTable,
	Section,
} from '@/app/_components/Demo';
import { Blockquote, Code, Highlight, Mark, Text, Title } from '@kivora/react';

export default function TypographyPage() {
	return (
		<div>
			<PageBreadcrumb
				items={[
					{ label: 'Inicio', href: '/' },
					{ label: 'Componentes' },
					{ label: 'Typography' },
				]}
			/>
			<PageHeader
				title='Typography'
				description='Primitivas de texto para construir jerarquías visuales claras: títulos, párrafos, resaltados, código y citas.'
				pkg='@kivora/react → Title, Text, Mark, Highlight, Code, Blockquote'
			/>

			{/* ── Title ───────────────────────────────────── */}
			<Section
				title='Title'
				description='Encabezados semánticos h1–h6 con control de tamaño y peso.'>
				<Demo>
					<div className='space-y-2'>
						{([1, 2, 3, 4, 5, 6] as const).map((order) => (
							<div
								key={order}
								className='flex items-baseline gap-3'>
								<span className='text-xs text-muted w-6'>
									h{order}
								</span>
								<Title order={order}>
									El kit de UI para React moderno
								</Title>
							</div>
						))}
					</div>
				</Demo>
			</Section>

			{/* ── Text ────────────────────────────────────── */}
			<Section
				title='Text'
				description='Componente de párrafo con soporte de tamaños, colores y transformaciones.'>
				<Demo>
					<Label>Tamaños</Label>
					<div className='space-y-1 mb-4'>
						{(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((s) => (
							<div
								key={s}
								className='flex items-baseline gap-3'>
								<span className='text-xs text-muted w-5'>
									{s}
								</span>
								<Text size={s}>
									Kivora UI — librería de componentes React
								</Text>
							</div>
						))}
					</div>

					<Label>Pesos y estilos</Label>
					<div className='space-y-1 mb-4'>
						<Text fw={400}>Normal (fw 400)</Text>
						<Text fw={500}>Medium (fw 500)</Text>
						<Text fw={600}>Semibold (fw 600)</Text>
						<Text fw={700}>Bold (fw 700)</Text>
						<Text className='italic'>Italic</Text>
						<Text className='underline'>Underlined</Text>
						<Text className='line-through'>Strikethrough</Text>
					</div>

					<Label>Colores</Label>
					<div className='space-y-1'>
						<Text c='dimmed'>color dimmed</Text>
						<Text c='blue'>color blue (brand)</Text>
						<Text c='red'>color red</Text>
						<Text c='green'>color green</Text>
					</div>
				</Demo>
			</Section>

			{/* ── Mark ────────────────────────────────────── */}
			<Section
				title='Mark'
				description='Resaltado en línea con fondo amarillo.'>
				<Demo>
					<Text>
						Kivora UI es una <Mark>librería de componentes</Mark>{' '}
						diseñada para <Mark>React 19</Mark> con soporte total
						para TypeScript y Tailwind CSS.
					</Text>
				</Demo>
			</Section>

			{/* ── Highlight ───────────────────────────────── */}
			<Section
				title='Highlight'
				description='Resalta automáticamente substrings dentro de un texto.'>
				<Demo>
					<Highlight
						highlight={['React', 'TypeScript', 'Tailwind']}
						highlightColor='rgba(59,130,246,0.2)'>
						Kivora UI está construido con React, TypeScript y
						Tailwind CSS para máxima productividad.
					</Highlight>
				</Demo>
			</Section>

			{/* ── Code ────────────────────────────────────── */}
			<Section
				title='Code'
				description='Estilo monoespaciado para fragmentos de código en línea o en bloque.'>
				<Demo>
					<Label>Inline</Label>
					<Text className='mb-4'>
						Instala con <Code>npm install @kivora/react</Code> o con{' '}
						<Code>pnpm add @kivora/react</Code>.
					</Text>

					<Label>Bloque</Label>
					<Code
						block
						className='text-sm'>
						{`import { Button, Alert } from '@kivora/react';
import '@kivora/react/styles.css';

export default function App() {
  return <Button variant="solid">Hola Kivora!</Button>;
}`}
					</Code>
				</Demo>
			</Section>

			{/* ── Blockquote ──────────────────────────────── */}
			<Section
				title='Blockquote'
				description='Citas destacadas con barra lateral y atribución opcional.'>
				<Demo>
					<Blockquote cite='– Tony Hoare, inventor del null'>
						I call it my billion-dollar mistake. It was the
						invention of the null reference in 1965.
					</Blockquote>

					<Blockquote className='mt-4'>
						Good code is its own best documentation.
					</Blockquote>
				</Demo>
			</Section>

			{/* ── API ─────────────────────────────────────── */}
			<Section title='API — Title'>
				<PropTable
					rows={[
						{
							prop: 'order',
							type: '1 | 2 | 3 | 4 | 5 | 6',
							default: '1',
							description: 'Nivel de encabezado (h1–h6).',
						},
						{
							prop: 'size',
							type: "'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'",
							description:
								'Tamaño visual independiente del nivel semántico.',
						},
						{
							prop: 'fw',
							type: 'string | number',
							description: 'Peso tipográfico (font-weight).',
						},
						{
							prop: 'c',
							type: 'string',
							description: 'Color del texto.',
						},
						{
							prop: 'children',
							type: 'ReactNode',
							description: 'Contenido del título.',
						},
					]}
				/>
			</Section>
		</div>
	);
}
