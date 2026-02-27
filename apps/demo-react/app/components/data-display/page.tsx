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
	Accordion,
	AccordionControl,
	AccordionItem,
	AccordionPanel,
	Avatar,
	AvatarGroup,
	BackgroundImage,
	Badge,
	Caption,
	Card,
	CardSection,
	ColorSwatch,
	Indicator,
	Kbd,
	Image as KivoraImage,
	List,
	ListItem,
	NumberFormatter,
	Pill,
	RingProgress,
	SemiCircleProgress,
	Spoiler,
	Table,
	Tbody,
	Td,
	Th,
	Thead,
	Timeline,
	TimelineItem,
	Tr,
	Tree,
} from '@kivora/react';

export default function DataDisplayPage() {
	return (
		<div>
			<PageBreadcrumb
				items={[
					{ label: 'Inicio', href: '/' },
					{ label: 'Componentes' },
					{ label: 'Data Display' },
				]}
			/>
			<PageHeader
				title='Data Display'
				description='Componentes para mostrar información estructurada: badges, avatares, tarjetas y timelines.'
				pkg='@kivora/react → Badge, Avatar, Card, Timeline'
			/>

			{/* ── Badge ───────────────────────────────────── */}
			<Section
				title='Badge'
				description='Etiquetas compactas para estado, categoría o conteo.'>
				<Demo>
					<Label>Variantes</Label>
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
								variant={v}>
								{v}
							</Badge>
						))}
					</div>

					<Label>Tamaños</Label>
					<div className='flex flex-wrap items-center gap-2 mb-4'>
						{(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((s) => (
							<Badge
								key={s}
								size={s}>
								{s}
							</Badge>
						))}
					</div>

					<Label>Con secciones</Label>
					<div className='flex flex-wrap gap-2 mb-4'>
						<Badge
							leftSection={
								<svg
									className='w-3 h-3'
									fill='currentColor'
									viewBox='0 0 20 20'>
									<path
										fillRule='evenodd'
										d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
										clipRule='evenodd'
									/>
								</svg>
							}>
							Completado
						</Badge>
						<Badge
							variant='light'
							rightSection={<span>3</span>}>
							Pendientes
						</Badge>
						<Badge circle>99+</Badge>
					</div>
				</Demo>
			</Section>

			{/* ── Avatar ──────────────────────────────────── */}
			<Section
				title='Avatar'
				description='Imagen de perfil o iniciales de usuario.'>
				<Demo>
					<Label>Variantes</Label>
					<div className='flex gap-3 items-center mb-4'>
						{(
							[
								'filled',
								'light',
								'outline',
								'transparent',
							] as const
						).map((v) => (
							<div
								key={v}
								className='flex flex-col items-center gap-2'>
								<Avatar variant={v}>JD</Avatar>
								<span className='text-xs text-muted'>{v}</span>
							</div>
						))}
					</div>

					<Label>Tamaños</Label>
					<div className='flex gap-4 items-end mb-4'>
						{(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((s) => (
							<div
								key={s}
								className='flex flex-col items-center gap-2'>
								<Avatar size={s}>AB</Avatar>
								<span className='text-xs text-muted'>{s}</span>
							</div>
						))}
					</div>

					<Label>Grupo</Label>
					<div className='flex -space-x-2'>
						{['JD', 'AB', 'KL', 'MN', 'OP'].map((initials, i) => (
							<Avatar
								key={i}
								size='md'
								className='ring-2 ring-white'>
								{initials}
							</Avatar>
						))}
						<Avatar
							size='md'
							className='ring-2 ring-white bg-muted/20'>
							+5
						</Avatar>
					</div>
				</Demo>
			</Section>

			{/* ── Card ────────────────────────────────────── */}
			<Section
				title='Card'
				description='Contenedor con sombra, borde y padding configurable.'>
				<Demo>
					<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
						{/* Básica */}
						<Card
							shadow='sm'
							radius='md'
							withBorder
							padding='md'>
							<p className='text-sm font-semibold text-on-surface mb-1'>
								Card básica
							</p>
							<p className='text-sm text-muted'>
								Sombra sm, radio md, con borde.
							</p>
						</Card>

						{/* Con sección */}
						<Card
							shadow='md'
							radius='lg'
							padding='lg'>
							<CardSection
								withBorder
								inheritPadding
								className='pb-3 mb-3'>
								<p className='text-xs text-muted uppercase tracking-wide font-semibold'>
									Destacado
								</p>
							</CardSection>
							<p className='text-sm text-muted'>
								Usa CardSection para dividir el contenido.
							</p>
						</Card>

						{/* Perfil */}
						<Card
							shadow='sm'
							radius='md'
							withBorder
							padding='lg'>
							<CardSection
								inheritPadding
								className='pb-3 mb-3 flex items-center gap-3'>
								<Avatar size='md'>RS</Avatar>
								<div>
									<p className='text-sm font-semibold text-on-surface'>
										Rafael Soto
									</p>
									<p className='text-xs text-muted'>
										Frontend Dev
									</p>
								</div>
							</CardSection>
							<Badge
								variant='light'
								size='sm'>
								Activo
							</Badge>
						</Card>
					</div>
				</Demo>
			</Section>

			{/* ── Timeline ────────────────────────────────── */}
			<Section
				title='Timeline'
				description='Secuencia visual de eventos o pasos.'>
				<Demo>
					<Timeline
						active={2}
						bulletSize={24}
						lineWidth={2}>
						<TimelineItem title='Pedido recibido'>
							<p className='text-sm text-muted mt-0.5'>
								Tu pedido #1234 fue registrado.
							</p>
							<p className='text-xs text-muted/60 mt-1'>
								12 ene 2025, 10:00
							</p>
						</TimelineItem>
						<TimelineItem title='En preparación'>
							<p className='text-sm text-muted mt-0.5'>
								El equipo está preparando tu pedido.
							</p>
							<p className='text-xs text-muted/60 mt-1'>
								12 ene 2025, 11:30
							</p>
						</TimelineItem>
						<TimelineItem title='En camino'>
							<p className='text-sm text-muted mt-0.5'>
								Tu paquete ha sido enviado.
							</p>
							<p className='text-xs text-muted/60 mt-1'>
								13 ene 2025, 09:15
							</p>
						</TimelineItem>
						<TimelineItem title='Entregado'>
							<p className='text-sm text-muted mt-0.5'>
								Estimado 14 ene 2025
							</p>
						</TimelineItem>
					</Timeline>
				</Demo>
			</Section>
			{/* ── Accordion ────────────────────────────────── */}
			<Section
				title='Accordion'
				description='Contenido colapsable organizado en paneles expandibles.'>
				<Demo>
					<Accordion defaultValue='faq-1'>
						<AccordionItem value='faq-1'>
							<AccordionControl>
								¿Qué es @kivora/react?
							</AccordionControl>
							<AccordionPanel>
								<p className='text-sm text-muted'>
									Librería de componentes React, accesible y
									composable, lista para producción con
									soporte para TypeScript y Tailwind CSS v4.
								</p>
							</AccordionPanel>
						</AccordionItem>
						<AccordionItem value='faq-2'>
							<AccordionControl>
								¿Es compatible con Next.js?
							</AccordionControl>
							<AccordionPanel>
								<p className='text-sm text-muted'>
									Sí, todos los componentes son compatibles
									con Next.js 14+ y el App Router. Los
									componentes interactivos requieren{' '}
									<code className='text-xs bg-muted/20 px-1 py-0.5 rounded'>
										'use client'
									</code>
									.
								</p>
							</AccordionPanel>
						</AccordionItem>
						<AccordionItem value='faq-3'>
							<AccordionControl>
								¿Tiene modo oscuro?
							</AccordionControl>
							<AccordionPanel>
								<p className='text-sm text-muted'>
									Sí, el modo oscuro se activa añadiendo la
									clase{' '}
									<code className='text-xs bg-muted/20 px-1 py-0.5 rounded'>
										dark
									</code>{' '}
									al elemento{' '}
									<code className='text-xs bg-muted/20 px-1 py-0.5 rounded'>
										html
									</code>
									. También respeta{' '}
									<code className='text-xs bg-muted/20 px-1 py-0.5 rounded'>
										prefers-color-scheme
									</code>
									.
								</p>
							</AccordionPanel>
						</AccordionItem>
					</Accordion>
				</Demo>
			</Section>

			{/* ── Table ──────────────────────────────────────── */}
			<Section
				title='Table'
				description='Tabla de datos con estilos integrados, raya en filas pares y hover.'>
				<Demo>
					<Table
						striped
						highlightOnHover
						withTableBorder
						withColumnBorders>
						<Caption>Usuarios del sistema</Caption>
						<Thead>
							<Tr>
								<Th>Nombre</Th>
								<Th>Email</Th>
								<Th>Rol</Th>
								<Th>Estado</Th>
							</Tr>
						</Thead>
						<Tbody>
							{[
								{
									name: 'Ana García',
									email: 'ana@kivora.dev',
									role: 'Admin',
									active: true,
								},
								{
									name: 'Carlos López',
									email: 'carlos@kivora.dev',
									role: 'Editor',
									active: true,
								},
								{
									name: 'María Ruiz',
									email: 'maria@kivora.dev',
									role: 'Viewer',
									active: false,
								},
								{
									name: 'Luis Torres',
									email: 'luis@kivora.dev',
									role: 'Moderador',
									active: true,
								},
							].map((u) => (
								<Tr key={u.email}>
									<Td>{u.name}</Td>
									<Td className='text-muted text-sm'>
										{u.email}
									</Td>
									<Td>
										<Badge
											variant='light'
											size='sm'>
											{u.role}
										</Badge>
									</Td>
									<Td>
										<Badge
											variant={
												u.active ? 'filled' : 'outline'
											}
											size='sm'>
											{u.active ? 'Activo' : 'Inactivo'}
										</Badge>
									</Td>
								</Tr>
							))}
						</Tbody>
					</Table>
				</Demo>
			</Section>

			{/* ── Kbd ──────────────────────────────────────────── */}
			<Section
				title='Kbd'
				description='Representa teclas de teclado con estilo visual.'>
				<Demo>
					<div className='flex flex-wrap gap-4'>
						<div className='flex items-center gap-1'>
							<Kbd>Ctrl</Kbd>
							<span className='text-muted text-sm'>+</span>
							<Kbd>K</Kbd>
							<span className='text-xs text-muted ml-2'>
								Búsqueda rápida
							</span>
						</div>
						<div className='flex items-center gap-1'>
							<Kbd>⌘</Kbd>
							<span className='text-muted text-sm'>+</span>
							<Kbd>Shift</Kbd>
							<span className='text-muted text-sm'>+</span>
							<Kbd>P</Kbd>
							<span className='text-xs text-muted ml-2'>
								Paleta de comandos
							</span>
						</div>
						<div className='flex items-center gap-1'>
							<Kbd>Esc</Kbd>
							<span className='text-xs text-muted ml-2'>
								Cerrar modal
							</span>
						</div>
					</div>
				</Demo>
			</Section>

			{/* ── List ──────────────────────────────────────────── */}
			<Section
				title='List'
				description='Lista estilizada con soporte para íconos, orden y anidado.'>
				<Demo>
					<div className='grid sm:grid-cols-2 gap-6'>
						<div>
							<p className='text-xs text-muted uppercase tracking-widest font-bold mb-2'>
								No ordenada
							</p>
							<List spacing='xs'>
								<ListItem>Componentes accesibles</ListItem>
								<ListItem>TypeScript nativo</ListItem>
								<ListItem>Tailwind CSS v4</ListItem>
								<ListItem>Framer Motion</ListItem>
							</List>
						</div>
						<div>
							<p className='text-xs text-muted uppercase tracking-widest font-bold mb-2'>
								Con ícono personalizado
							</p>
							<List
								spacing='xs'
								icon={
									<svg
										className='w-4 h-4 text-brand'
										fill='none'
										viewBox='0 0 24 24'
										stroke='currentColor'
										strokeWidth={2.5}>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											d='M5 13l4 4L19 7'
										/>
									</svg>
								}>
								<ListItem>Instalación rápida</ListItem>
								<ListItem>Sin configuración</ListItem>
								<ListItem>Tree-shaking</ListItem>
							</List>
						</div>
					</div>
				</Demo>
			</Section>

			{/* ── RingProgress ─────────────────────────────────── */}
			<Section
				title='RingProgress'
				description='Indicador de progreso circular con secciones coloreadas.'>
				<Demo>
					<div className='flex flex-wrap items-center gap-6'>
						<RingProgress
							size={80}
							thickness={8}
							sections={[
								{ value: 68, color: 'var(--color-brand)' },
							]}
							label={
								<p className='text-xs font-bold text-center text-on-surface'>
									68%
								</p>
							}
						/>
						<RingProgress
							size={120}
							thickness={10}
							sections={[
								{ value: 40, color: 'var(--color-brand)' },
								{ value: 25, color: '#22c55e' },
								{ value: 15, color: '#f97316' },
							]}
							label={
								<p className='text-xs font-bold text-center text-on-surface'>
									80%
								</p>
							}
						/>
					</div>
				</Demo>
			</Section>

			{/* ── Pill ───────────────────────────────────────────── */}
			<Section
				title='Pill'
				description='Pastilla para mostrar valores seleccionados u etiquetas removibles.'>
				<Demo>
					<div className='flex flex-wrap gap-2'>
						<Pill>React</Pill>
						<Pill>TypeScript</Pill>
						<Pill
							withRemoveButton
							onRemove={() => {}}>
							Tailwind CSS
						</Pill>
						<Pill
							withRemoveButton
							onRemove={() => {}}>
							Framer Motion
						</Pill>
						<Pill disabled>Desactivado</Pill>
					</div>
				</Demo>
			</Section>

			{/* ── Indicator ───────────────────────────────────────── */}
			<Section
				title='Indicator'
				description='Punto de notificación o badge posicionado relativo a un elemento hijo.'>
				<Demo>
					<div className='flex flex-wrap items-center gap-6'>
						<Indicator
							label='3'
							size={18}>
							<Avatar size='md'>JD</Avatar>
						</Indicator>
						<Indicator
							processing
							size={12}>
							<Avatar size='md'>AB</Avatar>
						</Indicator>
						<Indicator
							label='99+'
							size={18}
							position='bottom-end'>
							<Avatar
								size='md'
								variant='outline'>
								KL
							</Avatar>
						</Indicator>
						<Indicator disabled>
							<Avatar
								size='md'
								variant='light'>
								MN
							</Avatar>
						</Indicator>
					</div>
				</Demo>
			</Section>

			{/* ── Spoiler ─────────────────────────────────────────── */}
			<Section
				title='Spoiler'
				description='Oculta contenido largo con un botón para expandir/colapsar.'>
				<Demo>
					<Spoiler
						maxHeight={60}
						showLabel='Mostrar más'
						hideLabel='Ocultar'>
						<p className='text-sm text-muted'>
							@kivora/react es una librería de componentes UI
							construida sobre React 18+, TypeScript y Tailwind
							CSS v4. Ofrece más de 60 componentes accesibles,
							composables y listos para producción. Cada
							componente sigue los estándares de accesibilidad
							WAI-ARIA y es compatible con lectores de pantalla.
							Además incluye más de 30 hooks reutilizables para
							gestionar estado, efectos del DOM, interacciones del
							usuario y acceso a APIs del navegador.
						</p>
					</Spoiler>
				</Demo>
			</Section>
			{/* ── AvatarGroup ─────────────────────────────── */}
			<Section
				title='AvatarGroup'
				description='Agrupa avatares con superposición configurable.'>
				<Demo>
					<AvatarGroup spacing='-0.75rem'>
						<Avatar
							src='https://i.pravatar.cc/150?img=1'
							alt='Ana'
							size='md'
						/>
						<Avatar
							src='https://i.pravatar.cc/150?img=2'
							alt='Luis'
							size='md'
						/>
						<Avatar
							src='https://i.pravatar.cc/150?img=3'
							alt='Marta'
							size='md'
						/>
						<Avatar
							size='md'
							variant='filled'>
							+4
						</Avatar>
					</AvatarGroup>
				</Demo>
			</Section>

			{/* ── Image ───────────────────────────────────── */}
			<Section
				title='Image'
				description='Imagen con soporte de fallback, object-fit y radio de bordes.'>
				<Demo>
					<div className='flex flex-wrap gap-4'>
						<KivoraImage
							src='https://picsum.photos/seed/kivora/300/200'
							alt='Paisaje'
							w={200}
							h={130}
							radius='0.5rem'
							fit='cover'
						/>
						<KivoraImage
							src='https://broken.url/img.png'
							fallbackSrc='https://placehold.co/200x130?text=Fallback'
							alt='Fallback demo'
							w={200}
							h={130}
							radius='0.5rem'
						/>
					</div>
				</Demo>
			</Section>

			{/* ── BackgroundImage ─────────────────────────── */}
			<Section
				title='BackgroundImage'
				description='Div con imagen de fondo y control de posición y tamaño.'>
				<Demo>
					<BackgroundImage
						src='https://picsum.photos/seed/landscape/800/300'
						radius='0.75rem'
						className='h-40 flex items-end p-4'>
						<span className='text-white text-sm font-semibold bg-black/50 px-2 py-1 rounded'>
							Overlay de texto sobre la imagen
						</span>
					</BackgroundImage>
				</Demo>
			</Section>

			{/* ── NumberFormatter ─────────────────────────── */}
			<Section
				title='NumberFormatter'
				description='Formatea números con separadores, prefijo, sufijo y estilo de divisa.'>
				<Demo>
					<div className='grid sm:grid-cols-2 gap-4'>
						<div className='p-3 bg-surface rounded-lg border border-border'>
							<p className='text-xs text-muted mb-1'>
								Número formateado
							</p>
							<p className='text-lg font-semibold text-on-surface'>
								<NumberFormatter
									value={1234567}
									thousandSeparator
								/>
							</p>
						</div>
						<div className='p-3 bg-surface rounded-lg border border-border'>
							<p className='text-xs text-muted mb-1'>
								Precio (€)
							</p>
							<p className='text-lg font-semibold text-on-surface'>
								<NumberFormatter
									value={9999.99}
									style='currency'
									currency='EUR'
									locale='es-ES'
								/>
							</p>
						</div>
						<div className='p-3 bg-surface rounded-lg border border-border'>
							<p className='text-xs text-muted mb-1'>
								Porcentaje
							</p>
							<p className='text-lg font-semibold text-on-surface'>
								<NumberFormatter
									value={0.842}
									style='percent'
									decimalScale={1}
								/>
							</p>
						</div>
						<div className='p-3 bg-surface rounded-lg border border-border'>
							<p className='text-xs text-muted mb-1'>
								Con prefijo/sufijo
							</p>
							<p className='text-lg font-semibold text-on-surface'>
								<NumberFormatter
									value={42}
									prefix='€'
									suffix=' / mes'
								/>
							</p>
						</div>
					</div>
				</Demo>
			</Section>

			{/* ── SemiCircleProgress ──────────────────────── */}
			<Section
				title='SemiCircleProgress'
				description='Barra de progreso en semi-círculo — ideal para métricas tipo velocímetro.'>
				<Demo>
					<div className='flex flex-wrap gap-8 items-center'>
						{([25, 50, 75, 100] as const).map((v) => (
							<div
								key={v}
								className='flex flex-col items-center gap-1'>
								<SemiCircleProgress
									value={v}
									size={120}
									thickness={10}
									label={
										<span className='text-xs font-semibold text-on-surface'>
											{v}%
										</span>
									}
								/>
								<span className='text-xs text-muted'>{v}%</span>
							</div>
						))}
					</div>
				</Demo>
			</Section>

			{/* ── ColorSwatch ─────────────────────────────── */}
			<Section
				title='ColorSwatch'
				description='Círculo o cuadrado de color — útil para paletas y pickers.'>
				<Demo>
					<Label>Tamaños</Label>
					<div className='flex flex-wrap items-end gap-3 mb-4'>
						{[12, 20, 28, 40].map((s) => (
							<ColorSwatch
								key={s}
								color='#3b82f6'
								size={s}
								withShadow
							/>
						))}
					</div>
					<Label>Paleta de colores</Label>
					<div className='flex flex-wrap gap-2'>
						{[
							'#ef4444',
							'#f97316',
							'#eab308',
							'#22c55e',
							'#3b82f6',
							'#8b5cf6',
							'#ec4899',
							'#14b8a6',
							'#6b7280',
						].map((c) => (
							<ColorSwatch
								key={c}
								color={c}
								size={28}
								withShadow
							/>
						))}
					</div>
				</Demo>
			</Section>

			{/* ── Tree ────────────────────────────────────── */}
			<Section
				title='Tree'
				description='Vista de árbol jerárquica con expansión de nodos.'>
				<Demo>
					<Tree
						data={[
							{
								value: 'src',
								label: '📁 src',
								children: [
									{
										value: 'components',
										label: '📁 components',
										children: [
											{
												value: 'Button.tsx',
												label: '📄 Button.tsx',
											},
											{
												value: 'Input.tsx',
												label: '📄 Input.tsx',
											},
										],
									},
									{ value: 'App.tsx', label: '📄 App.tsx' },
									{ value: 'index.ts', label: '📄 index.ts' },
								],
							},
							{
								value: 'public',
								label: '📁 public',
								children: [
									{
										value: 'favicon.ico',
										label: '📄 favicon.ico',
									},
								],
							},
							{ value: 'package.json', label: '📄 package.json' },
						]}
					/>
				</Demo>
			</Section>
			{/* ── API ─────────────────────────────────────── */}
			<Section title='API — Badge'>
				<PropTable
					rows={[
						{
							prop: 'variant',
							type: "'filled' | 'light' | 'outline' | 'dot' | 'transparent'",
							default: "'filled'",
							description: 'Estilo visual del badge.',
						},
						{
							prop: 'size',
							type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'",
							default: "'md'",
							description: 'Tamaño del badge.',
						},
						{
							prop: 'leftSection',
							type: 'ReactNode',
							description: 'Elemento a la izquierda del texto.',
						},
						{
							prop: 'rightSection',
							type: 'ReactNode',
							description: 'Elemento a la derecha del texto.',
						},
						{
							prop: 'circle',
							type: 'boolean',
							default: 'false',
							description: 'Convierte en forma circular.',
						},
						{
							prop: 'children',
							type: 'ReactNode',
							description: 'Texto del badge.',
						},
					]}
				/>
			</Section>
		</div>
	);
}
