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
	Affix,
	Box,
	Collapse,
	Divider,
	FloatingIndicator,
	FocusTrap,
	Paper,
	Portal,
	ScrollArea,
	ThemeIcon,
	Transition,
} from '@kivora/react';
import { useState } from 'react';

function CollapseDemo() {
	const [open, setOpen] = useState(false);
	return (
		<div className='space-y-3'>
			<button
				type='button'
				className='px-4 py-2 text-sm rounded-lg bg-brand text-white hover:bg-brand/90 transition-colors'
				onClick={() => setOpen((v) => !v)}>
				{open ? 'Colapsar' : 'Expandir'}
			</button>
			<Collapse in={open}>
				<div className='p-4 bg-brand/5 border border-brand/20 rounded-lg text-sm text-on-surface'>
					<p className='font-medium mb-1'>Contenido colapsable</p>
					<p className='text-muted'>
						Este panel se anima con height + opacity al expandirse y
						colapsar. Útil para acordeones, filtros y paneles
						opcionales.
					</p>
				</div>
			</Collapse>
		</div>
	);
}

function TransitionDemo() {
	const [mounted, setMounted] = useState(false);
	const [transition, setTransition] = useState<
		'fade' | 'fade-up' | 'scale' | 'slide-up'
	>('fade');
	return (
		<div className='space-y-4'>
			<div className='flex flex-wrap gap-2'>
				{(['fade', 'fade-up', 'scale', 'slide-up'] as const).map(
					(t) => (
						<button
							key={t}
							type='button'
							onClick={() => setTransition(t)}
							className={[
								'px-3 py-1.5 text-xs rounded-lg border transition-colors',
								transition === t
									? 'bg-brand text-white border-brand'
									: 'border-border text-on-surface hover:bg-muted/20',
							].join(' ')}>
							{t}
						</button>
					),
				)}
			</div>
			<button
				type='button'
				className='px-4 py-2 text-sm rounded-lg bg-brand text-white hover:bg-brand/90 transition-colors'
				onClick={() => setMounted((v) => !v)}>
				{mounted ? 'Ocultar' : 'Mostrar'}
			</button>
			<div className='relative h-20'>
				<Transition
					mounted={mounted}
					transition={transition}
					duration={300}>
					{(styles) => (
						<div
							style={styles}
							className='absolute inset-0 flex items-center justify-center bg-brand/10 border border-brand/20 rounded-lg text-sm text-brand font-medium'>
							¡Aparezco con transición &quot;{transition}&quot;!
						</div>
					)}
				</Transition>
			</div>
		</div>
	);
}

function FloatingIndicatorDemo() {
	const [parentEl, setParentEl] = useState<HTMLDivElement | null>(null);
	const [active, setActive] = useState<string>('react');
	const [target, setTarget] = useState<Element | null>(null);

	return (
		<div
			ref={setParentEl}
			className='relative flex gap-1 p-1 bg-muted/10 rounded-lg w-fit'>
			<FloatingIndicator
				parent={parentEl}
				target={target}
				className='bg-surface shadow-sm rounded-md'
			/>
			{['react', 'solid', 'svelte'].map((item) => (
				<button
					key={item}
					type='button'
					ref={(el) => {
						if (active === item && el) setTarget(el);
					}}
					onClick={(e) => {
						setActive(item);
						setTarget(e.currentTarget);
					}}
					className={[
						'relative z-10 px-4 py-1.5 text-sm rounded-md transition-colors',
						active === item
							? 'text-on-surface font-medium'
							: 'text-muted hover:text-on-surface',
					].join(' ')}>
					{item.charAt(0).toUpperCase() + item.slice(1)}
				</button>
			))}
		</div>
	);
}

function FocusTrapDemo() {
	const [active, setActive] = useState(false);
	return (
		<div className='space-y-3'>
			<button
				type='button'
				className='px-4 py-2 text-sm rounded-lg bg-brand text-white hover:bg-brand/90 transition-colors'
				onClick={() => setActive(true)}>
				Activar FocusTrap
			</button>
			{active && (
				<FocusTrap active={active}>
					<div className='p-4 border-2 border-brand rounded-lg space-y-3 bg-surface'>
						<p className='text-sm font-medium text-on-surface'>
							FocusTrap activo — Tab cicla solo dentro de este
							panel
						</p>
						<input
							className='w-full px-3 py-2 text-sm border border-border rounded-md bg-surface outline-none focus:ring-2 focus:ring-brand'
							placeholder='Campo 1'
						/>
						<input
							className='w-full px-3 py-2 text-sm border border-border rounded-md bg-surface outline-none focus:ring-2 focus:ring-brand'
							placeholder='Campo 2'
						/>
						<button
							type='button'
							className='px-4 py-2 text-sm rounded-lg border border-border hover:bg-muted/20 transition-colors'
							onClick={() => setActive(false)}>
							Desactivar
						</button>
					</div>
				</FocusTrap>
			)}
		</div>
	);
}

export default function MiscellaneousPage() {
	const [portalVisible, setPortalVisible] = useState(false);
	const [affixVisible, setAffixVisible] = useState(false);

	return (
		<div>
			<PageBreadcrumb
				items={[
					{ label: 'Inicio', href: '/' },
					{ label: 'Componentes' },
					{ label: 'Miscellaneous' },
				]}
			/>
			<PageHeader
				title='Miscellaneous'
				description='Componentes de utilidad: Box, Paper, Divider, Affix, Collapse, Portal, FocusTrap, ScrollArea, ThemeIcon, Transition y FloatingIndicator.'
				pkg='@kivora/react → Box, Paper, Divider, Collapse, ThemeIcon…'
			/>

			{/* ── Box ─────────────────────────────────────── */}
			<Section
				title='Box'
				description='Primitiva polimórfica que acepta cualquier elemento HTML como raíz via prop component.'>
				<Demo>
					<div className='flex flex-wrap gap-3'>
						<Box className='px-4 py-2 bg-brand/10 border border-brand/20 rounded-lg text-sm font-medium text-brand'>
							Box (default div)
						</Box>
						<Box
							component='span'
							className='px-3 py-1.5 bg-surface border border-border rounded-md text-sm text-on-surface'>
							Box como span
						</Box>
						<a
							href='#'
							className='px-3 py-1.5 bg-surface border border-border rounded-md text-sm text-brand underline hover:opacity-80'>
							Box como anchor
						</a>
					</div>
				</Demo>
			</Section>

			{/* ── Paper ───────────────────────────────────── */}
			<Section
				title='Paper'
				description='Superficie elevada con fondo, sombra y radio configurables.'>
				<Demo>
					<Label>Sombras</Label>
					<div className='flex flex-wrap gap-4 mb-4'>
						{(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((s) => (
							<Paper
								key={s}
								shadow={s}
								p='1rem'
								className='text-xs text-center min-w-16'>
								shadow=&quot;{s}&quot;
							</Paper>
						))}
					</div>

					<Label>Con borde</Label>
					<Paper
						withBorder
						shadow='sm'
						p='1rem'
						className='max-w-xs'>
						<p className='text-sm font-medium text-on-surface'>
							Tarjeta con borde
						</p>
						<p className='text-xs text-muted mt-1'>
							Combina withBorder y shadow para tarjetas definidas.
						</p>
					</Paper>
				</Demo>
			</Section>

			{/* ── Divider ─────────────────────────────────── */}
			<Section
				title='Divider'
				description='Separador horizontal o vertical con variantes de estilo y etiqueta opcional.'>
				<Demo>
					<Label>Variantes</Label>
					<div className='space-y-4 mb-6'>
						<Divider variant='solid' />
						<Divider variant='dashed' />
						<Divider variant='dotted' />
					</div>

					<Label>Con etiqueta</Label>
					<div className='space-y-4 mb-6'>
						<Divider
							label='O continúa con'
							labelPosition='left'
						/>
						<Divider
							label='Centro'
							labelPosition='center'
						/>
						<Divider
							label='Derecha'
							labelPosition='right'
						/>
					</div>

					<Label>Vertical</Label>
					<div className='flex items-center gap-4 h-8'>
						<span className='text-sm text-muted'>Izquierda</span>
						<Divider orientation='vertical' />
						<span className='text-sm text-muted'>Derecha</span>
					</div>
				</Demo>
			</Section>

			{/* ── ThemeIcon ───────────────────────────────── */}
			<Section
				title='ThemeIcon'
				description='Contenedor cuadrado para íconos con variantes y tamaños del sistema de diseño.'>
				<Demo>
					<Label>Variantes</Label>
					<div className='flex flex-wrap gap-3 mb-4'>
						{(
							[
								'filled',
								'light',
								'outline',
								'subtle',
								'default',
							] as const
						).map((v) => (
							<div
								key={v}
								className='flex flex-col items-center gap-1'>
								<ThemeIcon
									variant={v}
									size='lg'>
									<svg
										className='w-1/2 h-1/2'
										fill='none'
										viewBox='0 0 24 24'
										stroke='currentColor'
										strokeWidth={2}>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											d='M13 10V3L4 14h7v7l9-11h-7z'
										/>
									</svg>
								</ThemeIcon>
								<span className='text-xs text-muted'>{v}</span>
							</div>
						))}
					</div>

					<Label>Tamaños</Label>
					<div className='flex flex-wrap items-end gap-3'>
						{(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((s) => (
							<div
								key={s}
								className='flex flex-col items-center gap-1'>
								<ThemeIcon
									variant='light'
									size={s}>
									<svg
										className='w-1/2 h-1/2'
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
								</ThemeIcon>
								<span className='text-xs text-muted'>{s}</span>
							</div>
						))}
					</div>
				</Demo>
			</Section>

			{/* ── Collapse ────────────────────────────────── */}
			<Section
				title='Collapse'
				description='Animación de altura + opacidad para mostrar/ocultar contenido.'>
				<Demo>
					<CollapseDemo />
				</Demo>
			</Section>

			{/* ── Transition ──────────────────────────────── */}
			<Section
				title='Transition'
				description='Componente render-prop para transiciones CSS de entrada y salida con 15+ presets.'>
				<Demo>
					<TransitionDemo />
				</Demo>
			</Section>

			{/* ── ScrollArea ──────────────────────────────── */}
			<Section
				title='ScrollArea'
				description='Contenedor scrollable con tamaño fijo y barra de scroll configurable.'>
				<Demo>
					<Label>Altura fija (mah 200px)</Label>
					<ScrollArea
						mah={200}
						className='border border-border rounded-lg p-3'>
						{Array.from({ length: 20 }, (_, i) => (
							<p
								key={i}
								className='text-sm py-1 border-b border-border/50 last:border-0 text-muted'>
								Elemento {i + 1} — Scroll para ver más
							</p>
						))}
					</ScrollArea>
				</Demo>
			</Section>

			{/* ── FocusTrap ───────────────────────────────── */}
			<Section
				title='FocusTrap'
				description='Encierra el foco dentro de un contenedor — imprescindible para accesibilidad en modals.'>
				<Demo>
					<FocusTrapDemo />
				</Demo>
			</Section>

			{/* ── FloatingIndicator ───────────────────────── */}
			<Section
				title='FloatingIndicator'
				description='Indicador flotante que sigue a un elemento target dentro de un parent — útil para tabs y navbars.'>
				<Demo>
					<FloatingIndicatorDemo />
				</Demo>
			</Section>

			{/* ── Portal ──────────────────────────────────── */}
			<Section
				title='Portal'
				description='Renderiza hijos en document.body o en un nodo arbitrario, fuera del árbol React actual.'>
				<Demo>
					<div className='space-y-3'>
						<button
							type='button'
							className='px-4 py-2 text-sm rounded-lg bg-brand text-white hover:bg-brand/90 transition-colors'
							onClick={() => {
								setPortalVisible((v) => !v);
								if (!portalVisible)
									setTimeout(
										() => setPortalVisible(false),
										3000,
									);
							}}>
							{portalVisible
								? 'Ocultar portal (3s auto)'
								: 'Mostrar toast via Portal'}
						</button>
						{portalVisible && (
							<Portal>
								<div className='fixed bottom-24 left-1/2 -translate-x-1/2 z-99999 bg-on-surface text-surface px-4 py-2 rounded-lg shadow-lg text-sm font-medium'>
									¡Renderizado fuera del árbol React via
									Portal!
								</div>
							</Portal>
						)}
						<p className='text-xs text-muted'>
							Este div renderiza en document.body, no dentro de
							este contenedor.
						</p>
					</div>
				</Demo>
			</Section>

			{/* ── Affix ───────────────────────────────────── */}
			<Section
				title='Affix'
				description='Fija un elemento a una posición absoluta de la ventana via Portal. Ideal para botones flotantes.'>
				<Demo>
					<div className='space-y-3'>
						<button
							type='button'
							className='px-4 py-2 text-sm rounded-lg bg-brand text-white hover:bg-brand/90 transition-colors'
							onClick={() => {
								setAffixVisible((v) => !v);
								if (!affixVisible)
									setTimeout(
										() => setAffixVisible(false),
										4000,
									);
							}}>
							{affixVisible
								? 'Ocultar Affix (4s auto)'
								: 'Mostrar Affix flotante'}
						</button>
						{affixVisible && (
							<Affix
								position={{ bottom: '5rem', right: '1.5rem' }}
								zIndex={9999}>
								<button
									type='button'
									onClick={() => setAffixVisible(false)}
									className='w-12 h-12 rounded-full bg-brand text-white shadow-lg flex items-center justify-center text-xl hover:bg-brand/90 transition-colors'>
									↑
								</button>
							</Affix>
						)}
						<p className='text-xs text-muted'>
							El botón flotante aparece fijado a la esquina
							inferior derecha de la ventana.
						</p>
					</div>
				</Demo>
			</Section>

			{/* ── API ─────────────────────────────────────── */}
			<Section title='API — Paper'>
				<PropTable
					rows={[
						{
							prop: 'shadow',
							type: "'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'none'",
							default: "'sm'",
							description: 'Sombra del paper.',
						},
						{
							prop: 'radius',
							type: "'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'none'",
							default: "'md'",
							description: 'Radio de bordes.',
						},
						{
							prop: 'withBorder',
							type: 'boolean',
							default: 'false',
							description: 'Añade borde.',
						},
						{
							prop: 'p',
							type: 'number | string',
							description: 'Padding interno.',
						},
						{
							prop: 'component',
							type: 'ElementType',
							default: "'div'",
							description: 'Elemento raíz del paper.',
						},
					]}
				/>
			</Section>
		</div>
	);
}
