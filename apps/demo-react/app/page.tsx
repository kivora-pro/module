'use client';

import {
	ActionIcon,
	Alert,
	Avatar,
	Badge,
	Breadcrumbs,
	Button,
	Card,
	Checkbox,
	Loader,
	Progress,
	Select,
	Switch,
	Tabs,
	TabsList,
	TabsPanel,
	TabsTab,
	TextInput,
	Title,
	Tooltip,
} from '@kivora/react';
import Link from 'next/link';
import { useState } from 'react';

/* ── Helper: Demo block ─────────────────────────────────── */
function Section({
	title,
	href,
	children,
}: {
	title: string;
	href: string;
	children: React.ReactNode;
}) {
	return (
		<div className='mb-12'>
			<div className='flex items-center justify-between mb-4'>
				<h2 className='text-lg font-bold text-on-surface'>{title}</h2>
				<Link
					href={href}
					className='text-xs text-brand hover:underline font-medium flex items-center gap-1'>
					Ver todo
					<svg
						className='w-3 h-3'
						fill='none'
						viewBox='0 0 24 24'
						stroke='currentColor'
						strokeWidth={2.5}>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							d='M9 5l7 7-7 7'
						/>
					</svg>
				</Link>
			</div>
			<div className='rounded-2xl border border-border bg-surface p-6 shadow-sm'>
				{children}
			</div>
		</div>
	);
}

function Label({ children }: { children: React.ReactNode }) {
	return (
		<p className='text-[10px] font-bold uppercase tracking-widest text-muted/70 mb-2 mt-4 first:mt-0'>
			{children}
		</p>
	);
}

/* ── Stats data ─────────────────────────────────────────── */
const stats = [
	{ value: '60+', label: 'Componentes', icon: '⬡' },
	{ value: '30+', label: 'Hooks', icon: '⚡' },
	{ value: '100%', label: 'TypeScript', icon: '✦' },
	{ value: 'MIT', label: 'Licencia', icon: '◎' },
];

/* ── Category cards data ────────────────────────────────── */
const categories = [
	{
		label: 'Buttons',
		href: '/components/buttons',
		desc: 'Button, ActionIcon, CopyButton, CloseButton',
		count: 6,
	},
	{
		label: 'Inputs',
		href: '/components/inputs',
		desc: 'TextInput, Select, Switch, Checkbox, Slider…',
		count: 18,
	},
	{
		label: 'Feedback',
		href: '/components/feedback',
		desc: 'Alert, Loader, Notification, Progress, Skeleton',
		count: 5,
	},
	{
		label: 'Data Display',
		href: '/components/data-display',
		desc: 'Badge, Avatar, Card, Table, Timeline…',
		count: 14,
	},
	{
		label: 'Navigation',
		href: '/components/navigation',
		desc: 'Tabs, Breadcrumbs, Pagination, NavLink…',
		count: 7,
	},
	{
		label: 'Overlays',
		href: '/components/overlays',
		desc: 'Modal, Drawer, Tooltip, Popover, Menu…',
		count: 8,
	},
	{
		label: 'Typography',
		href: '/components/typography',
		desc: 'Title, Text, Mark, Highlight, Code…',
		count: 7,
	},
	{
		label: 'Layout',
		href: '/components/layout',
		desc: 'Stack, Group, Grid, Flex, Container…',
		count: 10,
	},
];

/* ══════════════════════════════════════════════════════════
   PAGE
══════════════════════════════════════════════════════════ */
export default function HomePage() {
	const [switchOn, setSwitchOn] = useState(false);
	const [checked, setChecked] = useState(false);
	const [progress] = useState(68);

	return (
		<div>
			{/* ── Hero ────────────────────────────────────────── */}
			<div className='mb-14'>
				<div className='inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand/10 text-brand text-xs font-semibold mb-6 border border-brand/20'>
					<span className='w-1.5 h-1.5 rounded-full bg-brand' />
					v0.0.0-alpha — Disponible ahora
				</div>

				<h1 className='text-4xl sm:text-5xl font-extrabold text-on-surface tracking-tight leading-[1.1] mb-5'>
					Construye interfaces{' '}
					<span className='text-brand'>más rápido.</span>
				</h1>

				<p className='text-lg text-muted max-w-2xl mb-8 leading-relaxed'>
					<strong className='text-on-surface'>@kivora/react</strong> —
					librería de componentes React accesible, composable y lista
					para producción. Compatible con Next.js 14+, estilizada con
					Tailwind CSS v4.
				</p>

				<div className='flex flex-wrap gap-3 mb-10'>
					<Link href='/components/buttons'>
						<Button
							variant='solid'
							size='lg'>
							Explorar componentes
						</Button>
					</Link>
					<Link href='/hooks/state'>
						<Button
							variant='outline'
							size='lg'>
							Ver hooks
						</Button>
					</Link>
					<a
						href='https://github.com/kivora'
						target='_blank'
						rel='noreferrer'>
						<Button
							variant='ghost'
							size='lg'>
							GitHub
						</Button>
					</a>
				</div>

				{/* Install snippet */}
				<div className='rounded-xl border border-border bg-on-surface/[0.03] px-4 py-3 flex items-center gap-3 max-w-sm'>
					<span className='text-muted text-sm select-none'>$</span>
					<code className='text-sm font-mono text-on-surface flex-1'>
						npm install @kivora/react
					</code>
					<Badge
						variant='light'
						size='xs'>
						npm
					</Badge>
				</div>
			</div>

			{/* ── Stats ───────────────────────────────────────── */}
			<div className='grid grid-cols-2 sm:grid-cols-4 gap-3 mb-14'>
				{stats.map((s) => (
					<div
						key={s.label}
						className='rounded-xl border border-border bg-surface p-5 text-center shadow-sm hover:shadow-md transition-shadow'>
						<p className='text-2xl mb-1'>{s.icon}</p>
						<p className='text-2xl font-extrabold text-brand'>
							{s.value}
						</p>
						<p className='text-sm text-muted mt-0.5'>{s.label}</p>
					</div>
				))}
			</div>

			{/* ── Live previews ───────────────────────────────── */}

			{/* BUTTONS */}
			<Section
				title='Buttons'
				href='/components/buttons'>
				<Label>Variantes</Label>
				<div className='flex flex-wrap gap-2 mb-4'>
					<Button variant='solid'>Solid</Button>
					<Button variant='outline'>Outline</Button>
					<Button variant='ghost'>Ghost</Button>
					<Button variant='subtle'>Subtle</Button>
					<Button variant='link'>Link</Button>
				</div>

				<Label>Tamaños</Label>
				<div className='flex flex-wrap items-center gap-2 mb-4'>
					<Button size='xs'>XS</Button>
					<Button size='sm'>SM</Button>
					<Button size='md'>MD</Button>
					<Button size='lg'>LG</Button>
					<Button size='xl'>XL</Button>
				</div>

				<Label>Estados</Label>
				<div className='flex flex-wrap gap-2 mb-4'>
					<Button loading>Cargando...</Button>
					<Button disabled>Desactivado</Button>
					<Button
						variant='solid'
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
									d='M12 4v16m8-8H4'
								/>
							</svg>
						}>
						Con icono
					</Button>
				</div>

				<Label>ActionIcon</Label>
				<div className='flex flex-wrap items-center gap-2'>
					{(['solid', 'outline', 'ghost', 'subtle'] as const).map(
						(v) => (
							<Tooltip
								key={v}
								label={v}
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
			</Section>

			{/* INPUTS */}
			<Section
				title='Inputs'
				href='/components/inputs'>
				<div className='grid sm:grid-cols-2 gap-4'>
					<TextInput
						label='Nombre completo'
						placeholder='John Doe'
					/>
					<TextInput
						label='Email'
						placeholder='hola@kivora.dev'
						type='email'
					/>
					<TextInput
						label='Con error'
						placeholder='...'
						error='Este campo es requerido'
					/>
					<Select
						label='Framework'
						placeholder='Selecciona uno...'
						data={['Next.js', 'Remix', 'Astro', 'Vite']}
					/>
				</div>
				<div className='flex flex-wrap gap-6 mt-4'>
					<Switch
						label='Notificaciones'
						checked={switchOn}
						onChange={(e) =>
							setSwitchOn((e.target as HTMLInputElement).checked)
						}
					/>
					<Checkbox
						label='Acepto los términos'
						checked={checked}
						size='lg'
						onChange={(e) =>
							setChecked((e.target as HTMLInputElement).checked)
						}
					/>
				</div>
			</Section>

			{/* FEEDBACK */}
			<Section
				title='Feedback'
				href='/components/feedback'>
				<div className='space-y-3 mb-4'>
					<Alert
						variant='light'
						title='Información'>
						Nueva versión disponible (0.0.1-beta).
					</Alert>
					<Alert
						variant='filled'
						title='Éxito'>
						Componentes cargados correctamente.
					</Alert>
					<Alert
						variant='outline'
						title='Advertencia'>
						Los cambios no se han guardado.
					</Alert>
					<Alert
						variant='default'
						title='Error'
						withCloseButton
						onClose={() => {}}>
						No se pudo conectar al servidor.
					</Alert>
				</div>

				<Label>Loaders</Label>
				<div className='flex items-center gap-6'>
					<Loader
						type='oval'
						size='md'
					/>
					<Loader
						type='bars'
						size='md'
					/>
					<Loader
						type='dots'
						size='md'
					/>
				</div>

				<Label>Progress</Label>
				<div className='space-y-2'>
					<Progress
						value={progress}
						size='sm'
					/>
					<Progress
						value={progress}
						size='md'
					/>
					<Progress
						value={45}
						size='md'
						animated
					/>
				</div>
			</Section>

			{/* DATA DISPLAY */}
			<Section
				title='Data Display'
				href='/components/data-display'>
				<Label>Badges</Label>
				<div className='flex flex-wrap gap-2 mb-4'>
					{(
						[
							'filled',
							'light',
							'outline',
							'dot',
							'transparent',
						] as const
					).map((v) => (
						<Badge
							key={v}
							variant={v}
							size='md'>
							{v}
						</Badge>
					))}
				</div>

				<Label>Avatars</Label>
				<div className='flex items-center gap-3 mb-4'>
					<Avatar
						size='xl'
						variant='filled'>
						AB
					</Avatar>
					<Avatar
						size='lg'
						variant='light'>
						CD
					</Avatar>
					<Avatar
						size='md'
						variant='outline'>
						EF
					</Avatar>
					<Avatar
						size='sm'
						variant='filled'>
						<svg
							className='w-4 h-4'
							fill='currentColor'
							viewBox='0 0 20 20'>
							<path
								fillRule='evenodd'
								d='M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z'
								clipRule='evenodd'
							/>
						</svg>
					</Avatar>
				</div>

				<Label>Cards</Label>
				<div className='grid sm:grid-cols-3 gap-3'>
					{[
						{
							title: 'Total usuarios',
							value: '12,450',
							delta: '+8.2%',
						},
						{
							title: 'Ingresos (mes)',
							value: '$48,320',
							delta: '+14.7%',
						},
						{ title: 'Conversión', value: '3.72%', delta: '-0.4%' },
					].map((c) => (
						<Card
							key={c.title}
							withBorder
							shadow='sm'
							padding='1rem'>
							<p className='text-xs text-muted mb-1'>{c.title}</p>
							<p className='text-2xl font-bold text-on-surface'>
								{c.value}
							</p>
							<p
								className={`text-xs font-semibold mt-1 ${c.delta.startsWith('+') ? 'text-success' : 'text-danger'}`}>
								{c.delta} vs mes anterior
							</p>
						</Card>
					))}
				</div>
			</Section>

			{/* NAVIGATION */}
			<Section
				title='Navigation'
				href='/components/navigation'>
				<Label>Breadcrumbs</Label>
				<Breadcrumbs
					separator='›'
					className='mb-4'>
					<a
						href='/'
						className='text-sm text-muted hover:text-brand transition-colors'>
						Home
					</a>
					<a
						href='/components'
						className='text-sm text-muted hover:text-brand transition-colors'>
						Componentes
					</a>
					<span className='text-sm text-on-surface font-medium'>
						Navigation
					</span>
				</Breadcrumbs>

				<Label>Tabs</Label>
				<Tabs
					defaultValue='overview'
					variant='default'>
					<TabsList>
						<TabsTab value='overview'>Overview</TabsTab>
						<TabsTab value='api'>API</TabsTab>
						<TabsTab value='examples'>Ejemplos</TabsTab>
						<TabsTab value='changelog'>Changelog</TabsTab>
					</TabsList>
					<TabsPanel value='overview'>
						<p className='text-sm text-muted pt-4'>
							Contenido del tab Overview. Los Tabs soportan
							orientación horizontal y vertical, variantes
							default, outline y pills.
						</p>
					</TabsPanel>
					<TabsPanel value='api'>
						<p className='text-sm text-muted pt-4'>
							Props: value, defaultValue, onChange, variant,
							orientation, keepMounted.
						</p>
					</TabsPanel>
					<TabsPanel value='examples'>
						<p className='text-sm text-muted pt-4'>
							Consulta la página de Navigation para ver todos los
							ejemplos interactivos.
						</p>
					</TabsPanel>
					<TabsPanel value='changelog'>
						<p className='text-sm text-muted pt-4'>
							v0.0.0-alpha — Release inicial.
						</p>
					</TabsPanel>
				</Tabs>
			</Section>

			{/* TYPOGRAPHY */}
			<Section
				title='Typography'
				href='/components/typography'>
				<div className='space-y-2'>
					<Title order={1}>Heading 1 — The quick brown fox</Title>
					<Title order={2}>Heading 2 — The quick brown fox</Title>
					<Title order={3}>Heading 3 — The quick brown fox</Title>
					<Title order={4}>Heading 4 — The quick brown fox</Title>
					<Title order={5}>Heading 5 — The quick brown fox</Title>
					<Title order={6}>Heading 6 — The quick brown fox</Title>
				</div>
			</Section>

			{/* ── Todas las categorías ─────────────────────────── */}
			<div className='mb-12'>
				<h2 className='text-lg font-bold text-on-surface mb-4'>
					Todas las categorías
				</h2>
				<div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
					{categories.map((cat) => (
						<Link
							key={cat.href}
							href={cat.href}
							className='group'>
							<div className='rounded-xl border border-border bg-surface p-4 h-full hover:border-brand/40 hover:shadow-md transition-all'>
								<div className='flex items-start justify-between gap-3'>
									<div className='min-w-0'>
										<h3 className='font-semibold text-sm text-on-surface group-hover:text-brand transition-colors mb-1'>
											{cat.label}
										</h3>
										<p className='text-xs text-muted leading-snug'>
											{cat.desc}
										</p>
									</div>
									<Badge
										variant='light'
										size='sm'>
										{cat.count}
									</Badge>
								</div>
							</div>
						</Link>
					))}
				</div>
			</div>
		</div>
	);
}
