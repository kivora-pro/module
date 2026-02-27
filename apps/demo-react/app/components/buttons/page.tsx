'use client';

import {
	Demo,
	Label,
	PageBreadcrumb,
	PageHeader,
	PropTable,
	Section,
} from '@/app/_components/Demo';
import {
	ActionIcon,
	ActionIconGroup,
	Badge,
	Burger,
	Button,
	CloseButton,
	CopyButton,
	FileButton,
	Tooltip,
	UnstyledButton,
} from '@kivora/react';
import { useState } from 'react';

export default function ButtonsPage() {
	const [loading, setLoading] = useState(false);
	const [clicks, setClicks] = useState(0);

	return (
		<div>
			<PageBreadcrumb
				items={[
					{ label: 'Inicio', href: '/' },
					{ label: 'Componentes' },
					{ label: 'Buttons' },
				]}
			/>
			<PageHeader
				title='Buttons'
				description='Botones y controles de acción con múltiples variantes, tamaños y estados. Incluye Button, ActionIcon, CloseButton y más.'
				pkg='@kivora/react → Button, ActionIcon, CloseButton'
			/>

			{/* ── Button: Variantes ───────────────────────── */}
			<Section
				title='Variantes'
				description='Button soporta 5 variantes visuales.'>
				<Demo>
					<div className='flex flex-wrap gap-3'>
						<Button variant='solid'>Solid</Button>
						<Button variant='outline'>Outline</Button>
						<Button variant='ghost'>Ghost</Button>
						<Button variant='subtle'>Subtle</Button>
						<Button variant='link'>Link</Button>
					</div>
				</Demo>
			</Section>

			{/* ── Button: Tamaños ─────────────────────────── */}
			<Section
				title='Tamaños'
				description='5 tamaños predefinidos: xs, sm, md, lg, xl.'>
				<Demo>
					<div className='flex flex-wrap items-center gap-3'>
						<Button size='xs'>XS</Button>
						<Button size='sm'>SM</Button>
						<Button size='md'>MD (default)</Button>
						<Button size='lg'>LG</Button>
						<Button size='xl'>XL</Button>
					</div>
				</Demo>
			</Section>

			{/* ── Button: Con íconos ──────────────────────── */}
			<Section
				title='Con secciones'
				description='leftSection y rightSection para añadir íconos.'>
				<Demo>
					<div className='flex flex-wrap gap-3'>
						<Button leftSection={<span>⬇️</span>}>Descargar</Button>
						<Button
							rightSection={
								<Badge
									variant='filled'
									size='xs'
									circle>
									3
								</Badge>
							}>
							Notificaciones
						</Button>
						<Button
							leftSection={<span>✨</span>}
							rightSection={<span>→</span>}
							variant='outline'>
							Ambos lados
						</Button>
					</div>
				</Demo>
			</Section>

			{/* ── Button: fullWidth ───────────────────────── */}
			<Section title='Full width'>
				<Demo>
					<div className='flex flex-col gap-2 max-w-xs'>
						<Button fullWidth>Full width solid</Button>
						<Button
							fullWidth
							variant='outline'>
							Full width outline
						</Button>
					</div>
				</Demo>
			</Section>

			{/* ── Button: Estados ─────────────────────────── */}
			<Section title='Estados'>
				<Demo>
					<div className='flex flex-wrap gap-3'>
						<Button
							loading={loading}
							onClick={() => {
								setLoading(true);
								setTimeout(() => setLoading(false), 2000);
							}}>
							{loading ? 'Procesando...' : 'Click para cargar'}
						</Button>
						<Button disabled>Desactivado</Button>
						<Button
							loading
							disabled>
							Loading + disabled
						</Button>
					</div>
				</Demo>
			</Section>

			{/* ── Button: Interactivo ─────────────────────── */}
			<Section
				title='Interactivo'
				description='Prueba el contador de clicks.'>
				<Demo>
					<div className='flex items-center gap-4'>
						<Button onClick={() => setClicks((c) => c + 1)}>
							Click me
						</Button>
						<span className='text-sm text-muted'>
							Clicks:{' '}
							<strong className='text-on-surface'>
								{clicks}
							</strong>
						</span>
						{clicks > 0 && (
							<Button
								variant='ghost'
								size='xs'
								onClick={() => setClicks(0)}>
								Reset
							</Button>
						)}
					</div>
				</Demo>
			</Section>

			{/* ── ActionIcon ──────────────────────────────── */}
			<Section
				title='ActionIcon'
				description='Botón cuadrado para íconos. Requiere aria-label.'>
				<Demo>
					<Label>Variantes</Label>
					<div className='flex flex-wrap items-center gap-2 mb-4'>
						{(['solid', 'outline', 'ghost', 'subtle'] as const).map(
							(v) => (
								<Tooltip
									key={v}
									label={`variant="${v}"`}
									withArrow>
									<ActionIcon
										variant={v}
										aria-label={v}>
										<svg
											className='w-4 h-4'
											fill='none'
											viewBox='0 0 24 24'
											stroke='currentColor'
											strokeWidth={2}>
											<path
												strokeLinecap='round'
												strokeLinejoin='round'
												d='M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z'
											/>
										</svg>
									</ActionIcon>
								</Tooltip>
							),
						)}
					</div>

					<Label>Tamaños</Label>
					<div className='flex flex-wrap items-center gap-2'>
						{(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((s) => (
							<ActionIcon
								key={s}
								size={s}
								aria-label={s}>
								<svg
									className='w-3/5 h-3/5'
									fill='none'
									viewBox='0 0 24 24'
									stroke='currentColor'
									strokeWidth={2}>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										d='M12 6v6m0 0v6m0-6h6m-6 0H6'
									/>
								</svg>
							</ActionIcon>
						))}
					</div>
				</Demo>
			</Section>

			{/* ── CloseButton ─────────────────────────────── */}
			<Section
				title='CloseButton'
				description='Variante especializada para cerrar paneles.'>
				<Demo>
					<div className='flex items-center gap-4'>
						<CloseButton
							size='sm'
							aria-label='Cerrar'
						/>
						<CloseButton
							size='md'
							aria-label='Cerrar'
						/>
						<CloseButton
							size='lg'
							aria-label='Cerrar'
						/>
					</div>
				</Demo>
			</Section>

			{/* ── CopyButton ─────────────────────────────── */}
			<Section
				title='CopyButton'
				description='Copia texto al portapapeles con feedback visual automático.'>
				<Demo>
					<div className='flex flex-wrap items-center gap-4'>
						<CopyButton value='npm install @kivora/react'>
							{({ copied, copy }) => (
								<Button
									variant={copied ? 'solid' : 'outline'}
									size='sm'
									onClick={copy}>
									{copied ? '✓ Copiado' : 'Copiar comando'}
								</Button>
							)}
						</CopyButton>
						<CopyButton value='https://kivora.dev'>
							{({ copied, copy }) => (
								<Tooltip
									label={copied ? '¡Copiado!' : 'Copiar URL'}
									withArrow>
									<ActionIcon
										variant={copied ? 'solid' : 'subtle'}
										aria-label='Copiar URL'
										onClick={copy}>
										<svg
											className='w-4 h-4'
											fill='none'
											viewBox='0 0 24 24'
											stroke='currentColor'
											strokeWidth={2}>
											<path
												strokeLinecap='round'
												strokeLinejoin='round'
												d='M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z'
											/>
										</svg>
									</ActionIcon>
								</Tooltip>
							)}
						</CopyButton>
					</div>
				</Demo>
			</Section>

			{/* ── Burger ──────────────────────────────────── */}
			<Section
				title='Burger'
				description='Icono de menú hamburguesa animado para navbars y drawers.'>
				<Demo>
					<div className='flex flex-wrap items-center gap-6'>
						{(['sm', 'md', 'lg'] as const).map((s) => (
							<div
								key={s}
								className='flex flex-col items-center gap-2'>
								<Burger
									size={s}
									opened={false}
									aria-label='Abrir menú'
								/>
								<span className='text-xs text-muted'>{s}</span>
							</div>
						))}
					</div>
				</Demo>
			</Section>

			{/* ── ActionIconGroup ─────────────────────────── */}
			<Section
				title='ActionIconGroup'
				description='Agrupa ActionIcons eliminando bordes intermedios para un look unificado.'>
				<Demo>
					<Label>Horizontal (default)</Label>
					<div className='flex flex-wrap gap-4 mb-4'>
						{(['solid', 'outline', 'subtle'] as const).map((v) => (
							<ActionIconGroup key={v}>
								{(['←', '↑', '↓', '→'] as const).map((icon) => (
									<ActionIcon
										key={icon}
										variant={v}
										aria-label={icon}>
										<span className='text-xs'>{icon}</span>
									</ActionIcon>
								))}
							</ActionIconGroup>
						))}
					</div>
					<Label>Vertical</Label>
					<ActionIconGroup orientation='vertical'>
						{['↑', '↓'].map((icon) => (
							<ActionIcon
								key={icon}
								variant='outline'
								aria-label={icon}>
								<span className='text-xs'>{icon}</span>
							</ActionIcon>
						))}
					</ActionIconGroup>
				</Demo>
			</Section>

			{/* ── FileButton ──────────────────────────────── */}
			<Section
				title='FileButton'
				description='Abre el selector de archivos del SO usando un render prop; sin estilos propios.'>
				<Demo>
					<div className='flex flex-wrap gap-3'>
						<FileButton
							accept='image/*'
							onChange={(file) =>
								alert(
									file
										? `Seleccionado: ${(file as File).name}`
										: 'Sin archivo',
								)
							}>
							{({ onClick }) => (
								<Button
									variant='outline'
									leftSection={<span>🖼️</span>}
									onClick={onClick}>
									Subir imagen
								</Button>
							)}
						</FileButton>
						<FileButton
							multiple
							onChange={(files) =>
								alert(
									Array.isArray(files)
										? `${files.length} archivo(s) seleccionado(s)`
										: 'Sin archivos',
								)
							}>
							{({ onClick }) => (
								<Button
									variant='solid'
									leftSection={<span>📎</span>}
									onClick={onClick}>
									Subir múltiples
								</Button>
							)}
						</FileButton>
					</div>
				</Demo>
			</Section>

			{/* ── UnstyledButton ──────────────────────────── */}
			<Section
				title='UnstyledButton'
				description='Botón sin estilos propios — base para componentes custom totalmente personalizados.'>
				<Demo>
					<div className='flex flex-wrap gap-3'>
						<UnstyledButton className='px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-semibold shadow hover:opacity-90 transition-opacity'>
							Custom gradient
						</UnstyledButton>
						<UnstyledButton className='flex items-center gap-2 px-4 py-2 rounded-full border-2 border-dashed border-brand text-brand text-sm hover:bg-brand/5 transition-colors'>
							<span>+</span> Añadir elemento
						</UnstyledButton>
					</div>
				</Demo>
			</Section>

			{/* ── API Table ───────────────────────────────── */}
			<Section title='API — Button'>
				<PropTable
					rows={[
						{
							prop: 'variant',
							type: "'solid' | 'outline' | 'ghost' | 'link' | 'subtle'",
							default: "'solid'",
							description: 'Variante visual del botón.',
						},
						{
							prop: 'size',
							type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'",
							default: "'md'",
							description: 'Tamaño del botón.',
						},
						{
							prop: 'loading',
							type: 'boolean',
							default: 'false',
							description:
								'Muestra spinner y deshabilita el botón.',
						},
						{
							prop: 'disabled',
							type: 'boolean',
							default: 'false',
							description: 'Deshabilita el botón.',
						},
						{
							prop: 'fullWidth',
							type: 'boolean',
							default: 'false',
							description: 'Ocupa el 100% del ancho disponible.',
						},
						{
							prop: 'leftSection',
							type: 'ReactNode',
							default: 'undefined',
							description: 'Contenido a la izquierda del label.',
						},
						{
							prop: 'rightSection',
							type: 'ReactNode',
							default: 'undefined',
							description: 'Contenido a la derecha del label.',
						},
						{
							prop: 'component',
							type: 'ElementType',
							default: "'button'",
							description:
								'Componente raíz (ej. "a" para links).',
						},
						{
							prop: 'href',
							type: 'string',
							default: 'undefined',
							description: 'Si se provee, usa <a> como raíz.',
						},
					]}
				/>
			</Section>
		</div>
	);
}
