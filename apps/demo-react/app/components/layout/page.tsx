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
	AppShell,
	AspectRatio,
	Center,
	Container,
	Flex,
	Grid,
	GridCol,
	Group,
	SimpleGrid,
	Space,
	Stack,
} from '@kivora/react';

const Box = ({
	label,
	className = '',
}: {
	label: string;
	className?: string;
}) => (
	<div
		className={`bg-brand/10 border border-brand/20 rounded-lg flex items-center justify-center px-3 py-2 text-xs font-medium text-brand ${className}`}>
		{label}
	</div>
);

export default function LayoutPage() {
	return (
		<div>
			<PageBreadcrumb
				items={[
					{ label: 'Inicio', href: '/' },
					{ label: 'Componentes' },
					{ label: 'Layout' },
				]}
			/>
			<PageHeader
				title='Layout'
				description='Primitivas de maquetación para organizar elementos en el espacio: Stack, Group, Grid, Flex, Center y más.'
				pkg='@kivora/react → Stack, Group, Grid, SimpleGrid, Flex, Center, Container, AspectRatio, Space'
			/>

			{/* ── Stack ───────────────────────────────────── */}
			<Section
				title='Stack'
				description='Apila elementos verticalmente con espaciado uniforme.'>
				<Demo>
					<Label>gap xs → xl</Label>
					<div className='space-y-4'>
						{(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((g) => (
							<div key={g}>
								<p className='text-xs text-muted mb-1'>
									gap=&quot;{g}&quot;
								</p>
								<Stack
									gap={g}
									className='p-3 border border-dashed border-border rounded-lg'>
									<Box label='A' />
									<Box label='B' />
									<Box label='C' />
								</Stack>
							</div>
						))}
					</div>
				</Demo>
			</Section>

			{/* ── Group ───────────────────────────────────── */}
			<Section
				title='Group'
				description='Alinea elementos horizontalmente con espaciado uniforme.'>
				<Demo>
					<Label>grow (distribución igualada)</Label>
					<Group
						grow
						gap='md'
						className='p-3 border border-dashed border-border rounded-lg mb-4'>
						<Box label='Elemento 1' />
						<Box label='Elemento 2' />
						<Box label='Elemento 3' />
					</Group>

					<Label>justify center / space-between</Label>
					<div className='space-y-2'>
						<Group
							justify='center'
							className='p-3 border border-dashed border-border rounded-lg'>
							<Box label='A' />
							<Box label='B' />
							<Box label='C' />
						</Group>
						<Group
							justify='space-between'
							className='p-3 border border-dashed border-border rounded-lg'>
							<Box label='Logo' />
							<Box label='Acciones' />
						</Group>
					</div>
				</Demo>
			</Section>

			{/* ── Grid ────────────────────────────────────── */}
			<Section
				title='Grid'
				description='Grid de columnas con control de span por elemento.'>
				<Demo>
					<Grid
						gutter='md'
						className='p-3 border border-dashed border-border rounded-lg'>
						<GridCol span={12}>
							<Box label='span 12 (full)' />
						</GridCol>
						<GridCol span={6}>
							<Box label='span 6' />
						</GridCol>
						<GridCol span={6}>
							<Box label='span 6' />
						</GridCol>
						<GridCol span={4}>
							<Box label='span 4' />
						</GridCol>
						<GridCol span={4}>
							<Box label='span 4' />
						</GridCol>
						<GridCol span={4}>
							<Box label='span 4' />
						</GridCol>
						<GridCol span={3}>
							<Box label='span 3' />
						</GridCol>
						<GridCol span={3}>
							<Box label='span 3' />
						</GridCol>
						<GridCol span={3}>
							<Box label='span 3' />
						</GridCol>
						<GridCol span={3}>
							<Box label='span 3' />
						</GridCol>
					</Grid>
				</Demo>
			</Section>

			{/* ── SimpleGrid ──────────────────────────────── */}
			<Section
				title='SimpleGrid'
				description='Grid responsivo simplificado con cols fijo.'>
				<Demo>
					<SimpleGrid
						cols={3}
						spacing='md'
						className='p-3 border border-dashed border-border rounded-lg'>
						{['1', '2', '3', '4', '5', '6'].map((n) => (
							<Box
								key={n}
								label={`Item ${n}`}
							/>
						))}
					</SimpleGrid>
				</Demo>
			</Section>

			{/* ── Flex ────────────────────────────────────── */}
			<Section
				title='Flex'
				description='Flexbox configurable con todas las propiedades.'>
				<Demo>
					<Flex
						direction='row'
						wrap='wrap'
						gap='sm'
						justify='flex-start'
						align='center'
						className='p-3 border border-dashed border-border rounded-lg'>
						{[
							'Alpha',
							'Beta',
							'Gamma',
							'Delta',
							'Epsilon',
							'Zeta',
						].map((n) => (
							<Box
								key={n}
								label={n}
							/>
						))}
					</Flex>
				</Demo>
			</Section>

			{/* ── Center ──────────────────────────────────── */}
			<Section
				title='Center'
				description='Centra su hijo horizontal y verticalmente.'>
				<Demo>
					<Center className='h-24 p-3 border border-dashed border-border rounded-lg'>
						<Box
							label='Centrado'
							className='px-6 py-3'
						/>
					</Center>
				</Demo>
			</Section>

			{/* ── AspectRatio ─────────────────────────────── */}
			<Section
				title='AspectRatio'
				description='Mantiene la proporción de su hijo.'>
				<Demo>
					<Label>ratio 16/9</Label>
					<AspectRatio
						ratio={16 / 9}
						className='max-w-sm'>
						<div className='w-full h-full bg-brand/10 border border-brand/20 rounded-lg flex items-center justify-center text-sm font-medium text-brand'>
							16 : 9
						</div>
					</AspectRatio>
				</Demo>
			</Section>

			{/* ── Space ───────────────────────────────────── */}
			<Section
				title='Space'
				description='Espaciador invisible horizontal o vertical.'>
				<Demo>
					<div className='flex items-center border border-dashed border-border rounded-lg p-4'>
						<Box label='Izquierda' />
						<Space w={40} />
						<Box label='Derecha (40px de separación)' />
					</div>
				</Demo>
			</Section>

			{/* ── Container ───────────────────────────────── */}
			<Section
				title='Container'
				description='Limita el ancho máximo y centra el contenido.'>
				<Demo>
					<Container
						size='sm'
						className='border border-dashed border-border rounded-lg p-4'>
						<p className='text-sm text-muted text-center'>
							Container size=&quot;sm&quot; — max-width limitado y
							centrado
						</p>
					</Container>
				</Demo>
			</Section>

			{/* ── AppShell ─────────────────────────────────── */}
			<Section
				title='AppShell'
				description='Estructura de página completa con header, navbar, main y footer. Composable con subcomponentes.'>
				<Demo>
					<div className='h-72 border border-border rounded-lg overflow-hidden text-xs'>
						<AppShell>
							<AppShell.Header className='h-10 flex items-center px-4 gap-3'>
								<span className='font-semibold text-brand'>
									AppShell.Header
								</span>
								<span className='text-muted text-xs'>
									sticky top-0
								</span>
							</AppShell.Header>
							<div
								className='flex flex-1 overflow-hidden'
								style={{ minHeight: 0 }}>
								<AppShell.Navbar className='w-32 flex flex-col gap-1 p-2'>
									<span className='text-muted font-medium px-2 py-1'>
										Navbar
									</span>
									{['Inicio', 'Perfil', 'Ajustes'].map(
										(item) => (
											<button
												key={item}
												className='text-left px-2 py-1 rounded hover:bg-brand/10 text-muted hover:text-brand transition-colors'>
												{item}
											</button>
										),
									)}
								</AppShell.Navbar>
								<AppShell.Main>
									<p className='text-muted'>
										<strong className='text-on-surface'>
											AppShell.Main
										</strong>{' '}
										— área principal de contenido
									</p>
								</AppShell.Main>
							</div>
							<AppShell.Footer className='h-10 flex items-center justify-center px-4'>
								<span className='text-muted'>
									AppShell.Footer
								</span>
							</AppShell.Footer>
						</AppShell>
					</div>
				</Demo>
			</Section>

			{/* ── API ─────────────────────────────────────── */}
			<Section title='API — Stack'>
				<PropTable
					rows={[
						{
							prop: 'gap',
							type: "'xs' | 'sm' | 'md' | 'lg' | 'xl' | number",
							default: "'md'",
							description: 'Espacio entre elementos.',
						},
						{
							prop: 'align',
							type: "'stretch' | 'center' | 'flex-start' | 'flex-end'",
							default: "'stretch'",
							description: 'Alineación horizontal de los hijos.',
						},
						{
							prop: 'justify',
							type: "CSSProperties['justifyContent']",
							default: "'flex-start'",
							description: 'Justificación vertical de los hijos.',
						},
						{
							prop: 'children',
							type: 'ReactNode',
							description: 'Elementos a apilar.',
						},
					]}
				/>
			</Section>
		</div>
	);
}
