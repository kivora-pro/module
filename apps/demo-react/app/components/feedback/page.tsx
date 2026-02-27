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
	Alert,
	Loader,
	LoadingOverlay,
	Notification,
	Progress,
	Skeleton,
} from '@kivora/react';
import { useState } from 'react';

function LoadingOverlayDemo() {
	const [visible, setVisible] = useState(false);
	return (
		<div className='space-y-4'>
			<button
				type='button'
				className='px-4 py-2 text-sm rounded-lg bg-brand text-white hover:bg-brand/90 transition-colors'
				onClick={() => {
					setVisible(true);
					setTimeout(() => setVisible(false), 2500);
				}}>
				{visible ? 'Cargando…' : 'Activar overlay (2.5s)'}
			</button>
			<div className='relative h-32 rounded-lg border border-border bg-surface flex items-center justify-center overflow-hidden'>
				<p className='text-sm text-muted'>
					Área bloqueada con LoadingOverlay
				</p>
				<LoadingOverlay
					visible={visible}
					overlayProps={{ blur: 3, opacity: 0.6 }}
				/>
			</div>
		</div>
	);
}

export default function FeedbackPage() {
	const [alertOpen, setAlertOpen] = useState(true);
	const [progress] = useState(68);

	return (
		<div>
			<PageBreadcrumb
				items={[
					{ label: 'Inicio', href: '/' },
					{ label: 'Componentes' },
					{ label: 'Feedback' },
				]}
			/>
			<PageHeader
				title='Feedback'
				description='Componentes para comunicar estado al usuario: alertas, loaders, notificaciones, barras de progreso y esqueletos.'
				pkg='@kivora/react → Alert, Loader, Notification, Progress, Skeleton'
			/>

			{/* ── Alert ───────────────────────────────────── */}
			<Section
				title='Alert'
				description='Mensajes informativos o de estado con 4 variantes.'>
				<Demo>
					<Label>Variantes</Label>
					<div className='space-y-3 mb-4'>
						{(
							['light', 'filled', 'outline', 'default'] as const
						).map((v) => (
							<Alert
								key={v}
								variant={v}
								title={v.charAt(0).toUpperCase() + v.slice(1)}>
								Este es un ejemplo de alert con variant=&quot;
								{v}&quot;.
							</Alert>
						))}
					</div>

					<Label>Con icono</Label>
					<Alert
						variant='light'
						title='Actualización disponible'
						icon={
							<svg
								className='w-5 h-5 text-brand'
								fill='none'
								viewBox='0 0 24 24'
								stroke='currentColor'
								strokeWidth={2}>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
								/>
							</svg>
						}>
						Kivora UI v0.0.1-beta ya está disponible. Actualiza con{' '}
						<code className='text-xs bg-brand/10 px-1 rounded'>
							npm update @kivora/react
						</code>
						.
					</Alert>

					<Label>Con botón de cierre (interactivo)</Label>
					{alertOpen ? (
						<Alert
							variant='filled'
							title='Guardado correctamente'
							withCloseButton
							onClose={() => setAlertOpen(false)}>
							Los cambios se han guardado. Haz click en X para
							cerrar esta alerta.
						</Alert>
					) : (
						<button
							className='text-sm text-brand hover:underline'
							onClick={() => setAlertOpen(true)}>
							Mostrar alerta de nuevo
						</button>
					)}
				</Demo>
			</Section>

			{/* ── Loader ──────────────────────────────────── */}
			<Section
				title='Loader'
				description='Indicadores de carga animados.'>
				<Demo>
					<Label>Tipos</Label>
					<div className='flex items-center gap-8 mb-6'>
						<div className='flex flex-col items-center gap-2'>
							<Loader
								type='oval'
								size='lg'
							/>
							<span className='text-xs text-muted'>oval</span>
						</div>
						<div className='flex flex-col items-center gap-2'>
							<Loader
								type='bars'
								size='lg'
							/>
							<span className='text-xs text-muted'>bars</span>
						</div>
						<div className='flex flex-col items-center gap-2'>
							<Loader
								type='dots'
								size='lg'
							/>
							<span className='text-xs text-muted'>dots</span>
						</div>
					</div>

					<Label>Tamaños (oval)</Label>
					<div className='flex items-end gap-6'>
						{(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((s) => (
							<div
								key={s}
								className='flex flex-col items-center gap-2'>
								<Loader
									type='oval'
									size={s}
								/>
								<span className='text-xs text-muted'>{s}</span>
							</div>
						))}
					</div>
				</Demo>
			</Section>

			{/* ── Notification ────────────────────────────── */}
			<Section
				title='Notification'
				description='Notificaciones tipo toast con título, icono y botón de cierre.'>
				<Demo>
					<div className='space-y-3 max-w-sm'>
						<Notification
							title='Éxito'
							withBorder
							onClose={() => {}}>
							El archivo se ha subido correctamente.
						</Notification>
						<Notification
							title='Error de red'
							withBorder
							loading={false}
							icon={
								<svg
									className='w-5 h-5 text-danger'
									fill='currentColor'
									viewBox='0 0 20 20'>
									<path
										fillRule='evenodd'
										d='M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z'
										clipRule='evenodd'
									/>
								</svg>
							}
							onClose={() => {}}>
							No se pudo conectar. Revisa tu conexión.
						</Notification>
						<Notification
							title='Cargando...'
							loading
							withBorder
							onClose={() => {}}>
							Procesando tu solicitud...
						</Notification>
					</div>
				</Demo>
			</Section>

			{/* ── Progress ────────────────────────────────── */}
			<Section
				title='Progress'
				description='Barras de progreso lineales.'>
				<Demo>
					<Label>Tamaños</Label>
					<div className='space-y-3 mb-4'>
						{(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((s) => (
							<div
								key={s}
								className='flex items-center gap-3'>
								<span className='text-xs text-muted w-5'>
									{s}
								</span>
								<Progress
									value={progress}
									size={s}
									className='flex-1'
								/>
								<span className='text-xs text-muted'>
									{progress}%
								</span>
							</div>
						))}
					</div>

					<Label>Animado</Label>
					<Progress
						value={45}
						size='lg'
						animated
					/>

					<Label>Secciones coloreadas</Label>
					<Progress
						size='lg'
						sections={[
							{
								value: 40,
								color: '#3b82f6',
								tooltip: 'React: 40%',
							},
							{
								value: 25,
								color: '#22c55e',
								tooltip: 'Solid: 25%',
							},
							{
								value: 15,
								color: '#f59e0b',
								tooltip: 'Svelte: 15%',
							},
							{
								value: 20,
								color: '#8b5cf6',
								tooltip: 'Vue: 20%',
							},
						]}
					/>
				</Demo>
			</Section>

			{/* ── Skeleton ────────────────────────────────── */}
			<Section
				title='Skeleton'
				description='Placeholder animado para carga de contenido.'>
				<Demo>
					<Label>Tarjeta de perfil en skeleton</Label>
					<div className='flex gap-3 items-start max-w-sm'>
						<Skeleton
							circle
							width={48}
							height={48}
						/>
						<div className='flex-1 space-y-2'>
							<Skeleton
								height={14}
								width='60%'
								radius={4}
							/>
							<Skeleton
								height={12}
								width='40%'
								radius={4}
							/>
							<Skeleton
								height={12}
								radius={4}
							/>
							<Skeleton
								height={12}
								radius={4}
							/>
							<Skeleton
								height={12}
								width='80%'
								radius={4}
							/>
						</div>
					</div>
				</Demo>
			</Section>

			{/* ── LoadingOverlay ──────────────────────────── */}
			<Section
				title='LoadingOverlay'
				description='Overlay con loader centrado para bloquear un área mientras se carga.'>
				<Demo>
					<LoadingOverlayDemo />
				</Demo>
			</Section>

			{/* ── API ─────────────────────────────────────── */}
			<Section title='API — Alert'>
				<PropTable
					rows={[
						{
							prop: 'variant',
							type: "'light' | 'filled' | 'outline' | 'default'",
							default: "'light'",
							description: 'Estilo visual de la alerta.',
						},
						{
							prop: 'title',
							type: 'ReactNode',
							description: 'Título en negrita dentro del alert.',
						},
						{
							prop: 'icon',
							type: 'ReactNode',
							description: 'Icono o elemento a la izquierda.',
						},
						{
							prop: 'withCloseButton',
							type: 'boolean',
							default: 'false',
							description: 'Muestra botón ×.',
						},
						{
							prop: 'onClose',
							type: '() => void',
							description:
								'Callback al cerrar. Activa withCloseButton.',
						},
						{
							prop: 'children',
							type: 'ReactNode',
							description: 'Contenido del mensaje.',
						},
					]}
				/>
			</Section>
		</div>
	);
}
