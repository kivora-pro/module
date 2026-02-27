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
	Anchor,
	Breadcrumbs,
	NavLink,
	Pagination,
	Stepper,
	StepperCompleted,
	StepperStep,
	TableOfContents,
	Tabs,
	TabsList,
	TabsPanel,
	TabsTab,
} from '@kivora/react';
import { useState } from 'react';

const tocLinks = [
	{ value: 'introduccion', label: 'Introducción', order: 1 },
	{ value: 'instalacion', label: 'Instalación', order: 1 },
	{ value: 'configuracion', label: 'Configuración', order: 2 },
	{ value: 'opciones', label: 'Opciones avanzadas', order: 2 },
	{ value: 'uso', label: 'Uso básico', order: 1 },
	{ value: 'ejemplos', label: 'Ejemplos', order: 2 },
];

function TableOfContentsDemo() {
	const [active, setActive] = useState('instalacion');
	return (
		<div className='max-w-xs border border-border rounded-lg p-3 bg-surface'>
			<TableOfContents
				links={tocLinks}
				active={active}
				onItemClick={(item) => setActive(item.value)}
			/>
		</div>
	);
}

export default function NavigationPage() {
	const [tabValue, setTabValue] = useState<string>('overview');
	const [pillTab, setPillTab] = useState<string>('all');
	const [page, setPage] = useState(1);
	const [step, setStep] = useState(1);

	return (
		<div>
			<PageBreadcrumb
				items={[
					{ label: 'Inicio', href: '/' },
					{ label: 'Componentes' },
					{ label: 'Navigation' },
				]}
			/>
			<PageHeader
				title='Navigation'
				description='Componentes para guiar al usuario por la aplicación: breadcrumbs, tabs, paginación y steppers.'
				pkg='@kivora/react → Breadcrumbs, Tabs, NavLink, Pagination, Stepper'
			/>

			{/* ── Breadcrumbs ─────────────────────────────── */}
			<Section
				title='Breadcrumbs'
				description='Ruta de migas de pan para indicar el contexto actual.'>
				<Demo>
					<Label>Por defecto</Label>
					<Breadcrumbs className='mb-4'>
						<a
							href='#'
							className='text-brand hover:underline'>
							Inicio
						</a>
						<a
							href='#'
							className='text-brand hover:underline'>
							Componentes
						</a>
						<span>Navigation</span>
					</Breadcrumbs>

					<Label>Separador personalizado</Label>
					<Breadcrumbs
						separator='/'
						separatorMargin={8}>
						<a
							href='#'
							className='text-brand hover:underline'>
							docs
						</a>
						<a
							href='#'
							className='text-brand hover:underline'>
							components
						</a>
						<span>navigation</span>
					</Breadcrumbs>
				</Demo>
			</Section>

			{/* ── Tabs ────────────────────────────────────── */}
			<Section
				title='Tabs'
				description='Navegación entre vistas dentro de un mismo contexto.'>
				<Demo>
					<Label>Variante default</Label>
					<div className='mb-6'>
						<Tabs
							value={tabValue}
							onChange={setTabValue}>
							<TabsList>
								<TabsTab value='overview'>Resumen</TabsTab>
								<TabsTab value='analytics'>Analíticas</TabsTab>
								<TabsTab value='settings'>Ajustes</TabsTab>
								<TabsTab
									value='disabled'
									disabled>
									Desactivado
								</TabsTab>
							</TabsList>
							<TabsPanel
								value='overview'
								className='pt-4'>
								<p className='text-sm text-muted'>
									Contenido del panel <strong>Resumen</strong>
									.
								</p>
							</TabsPanel>
							<TabsPanel
								value='analytics'
								className='pt-4'>
								<p className='text-sm text-muted'>
									Contenido del panel{' '}
									<strong>Analíticas</strong>.
								</p>
							</TabsPanel>
							<TabsPanel
								value='settings'
								className='pt-4'>
								<p className='text-sm text-muted'>
									Contenido del panel <strong>Ajustes</strong>
									.
								</p>
							</TabsPanel>
						</Tabs>
					</div>
					<Label>Variante pills</Label>
					<div className='mb-6'>
						<Tabs
							value={pillTab}
							onChange={setPillTab}
							variant='pills'>
							<TabsList>
								<TabsTab value='all'>Todos</TabsTab>
								<TabsTab value='active'>Activos</TabsTab>
								<TabsTab value='archived'>Archivados</TabsTab>
							</TabsList>
							<TabsPanel
								value='all'
								className='pt-3'>
								<p className='text-sm text-muted'>
									Mostrando todos los registros.
								</p>
							</TabsPanel>
							<TabsPanel
								value='active'
								className='pt-3'>
								<p className='text-sm text-muted'>
									Mostrando solo activos.
								</p>
							</TabsPanel>
							<TabsPanel
								value='archived'
								className='pt-3'>
								<p className='text-sm text-muted'>
									Mostrando archivados.
								</p>
							</TabsPanel>
						</Tabs>
					</div>
					<Label>Variante outline</Label>
					<Tabs
						defaultValue='a'
						variant='outline'>
						<TabsList>
							<TabsTab value='a'>Pestaña A</TabsTab>
							<TabsTab value='b'>Pestaña B</TabsTab>
							<TabsTab value='c'>Pestaña C</TabsTab>
						</TabsList>
						<TabsPanel
							value='a'
							className='pt-3'>
							<p className='text-sm text-muted'>Panel A</p>
						</TabsPanel>
						<TabsPanel
							value='b'
							className='pt-3'>
							<p className='text-sm text-muted'>Panel B</p>
						</TabsPanel>
						<TabsPanel
							value='c'
							className='pt-3'>
							<p className='text-sm text-muted'>Panel C</p>
						</TabsPanel>
					</Tabs>
				</Demo>
			</Section>

			{/* ── NavLink ─────────────────────────────────── */}
			<Section
				title='NavLink'
				description='Elemento de navegación con soporte de estado activo y anidación.'>
				<Demo>
					<div className='max-w-xs border border-border rounded-lg overflow-hidden'>
						<NavLink
							label='Dashboard'
							active
							leftSection={
								<svg
									className='w-4 h-4'
									fill='none'
									viewBox='0 0 24 24'
									stroke='currentColor'
									strokeWidth={2}>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										d='M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6'
									/>
								</svg>
							}
						/>
						<NavLink
							label='Usuarios'
							leftSection={
								<svg
									className='w-4 h-4'
									fill='none'
									viewBox='0 0 24 24'
									stroke='currentColor'
									strokeWidth={2}>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										d='M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z'
									/>
								</svg>
							}
							rightSection={
								<span className='text-xs bg-brand/10 text-brand px-1.5 py-0.5 rounded-full'>
									12
								</span>
							}
						/>
						<NavLink
							label='Reportes'
							disabled
						/>
					</div>
				</Demo>
			</Section>

			{/* ── Pagination ──────────────────────────────── */}
			<Section
				title='Pagination'
				description='Navegación entre páginas de datos.'>
				<Demo>
					<div className='space-y-4'>
						<div className='flex flex-col items-start gap-2'>
							<Label>
								Con estado activo (página {page} de 10)
							</Label>
							<Pagination
								total={10}
								value={page}
								onChange={setPage}
							/>
						</div>
					</div>
				</Demo>
			</Section>

			{/* ── Stepper ─────────────────────────────────── */}
			<Section
				title='Stepper'
				description='Proceso paso a paso con estado de progreso.'>
				<Demo>
					<div className='mb-6'>
						<Stepper active={step}>
							<StepperStep
								label='Información'
								description='Datos personales'>
								<div className='pt-4 text-sm text-muted'>
									Completa tu nombre, email y contraseña.
								</div>
							</StepperStep>
							<StepperStep
								label='Perfil'
								description='Preferencias'>
								<div className='pt-4 text-sm text-muted'>
									Elige tu avatar y configura tus
									preferencias.
								</div>
							</StepperStep>
							<StepperStep
								label='Revisión'
								description='Confirmar datos'>
								<div className='pt-4 text-sm text-muted'>
									Revisa y confirma la información antes de
									continuar.
								</div>
							</StepperStep>
							<StepperCompleted>
								<div className='pt-4 text-sm text-success font-medium'>
									¡Proceso completado! Bienvenido a Kivora.
								</div>
							</StepperCompleted>
						</Stepper>
					</div>

					<div className='flex gap-3'>
						<button
							className='px-4 py-2 text-sm rounded-lg border border-border text-on-surface hover:bg-muted/10 disabled:opacity-40'
							disabled={step === 0}
							onClick={() => setStep((s) => Math.max(0, s - 1))}>
							Anterior
						</button>
						<button
							className='px-4 py-2 text-sm rounded-lg bg-brand text-white hover:bg-brand/90 disabled:opacity-40'
							disabled={step === 3}
							onClick={() => setStep((s) => Math.min(3, s + 1))}>
							{step === 2 ? 'Completar' : 'Siguiente'}
						</button>
					</div>
				</Demo>
			</Section>

			{/* ── Anchor ──────────────────────────────────── */}
			<Section
				title='Anchor'
				description='Enlace con subrayado configurable y estilos del sistema de diseño.'>
				<Demo>
					<div className='flex flex-wrap gap-4 items-center text-sm'>
						<Anchor
							href='#'
							underline='always'>
							Subrayado siempre
						</Anchor>
						<Anchor
							href='#'
							underline='hover'>
							Hover (default)
						</Anchor>
						<Anchor
							href='#'
							underline='never'>
							Sin subrayado
						</Anchor>
						<Anchor
							href='https://github.com'
							target='_blank'
							rel='noreferrer'>
							Enlace externo ↗
						</Anchor>
					</div>
				</Demo>
			</Section>

			{/* ── TableOfContents ─────────────────────────── */}
			<Section
				title='TableOfContents'
				description='Índice de contenidos con ítem activo resaltado e indentación por nivel.'>
				<Demo>
					<TableOfContentsDemo />
				</Demo>
			</Section>

			{/* ── API ─────────────────────────────────────── */}
			<Section title='API — Tabs'>
				<PropTable
					rows={[
						{
							prop: 'value',
							type: 'string | null',
							description: 'Pestaña activa (controlado).',
						},
						{
							prop: 'defaultValue',
							type: 'string',
							description: 'Pestaña inicial (no controlado).',
						},
						{
							prop: 'onChange',
							type: '(value: string | null) => void',
							description: 'Callback al cambiar pestaña.',
						},
						{
							prop: 'variant',
							type: "'default' | 'outline' | 'pills'",
							default: "'default'",
							description: 'Estilo visual de las pestañas.',
						},
						{
							prop: 'orientation',
							type: "'horizontal' | 'vertical'",
							default: "'horizontal'",
							description: 'Orientación del grupo de pestañas.',
						},
						{
							prop: 'keepMounted',
							type: 'boolean',
							default: 'true',
							description:
								'Mantiene paneles inactivos en el DOM.',
						},
					]}
				/>
			</Section>
		</div>
	);
}
