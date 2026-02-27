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
	Button,
	Dialog,
	Drawer,
	HoverCard,
	HoverCardDropdown,
	HoverCardTarget,
	Menu,
	MenuDivider,
	MenuDropdown,
	MenuItem,
	MenuLabel,
	MenuTarget,
	Modal,
	Overlay,
	Popover,
	PopoverDropdown,
	PopoverTarget,
	TextInput,
	Toaster,
	Tooltip,
	toast,
} from '@kivora/react';
import { useState } from 'react';

function OverlayDemo() {
	const [show, setShow] = useState(false);
	return (
		<div className='relative h-32 rounded-lg border border-border overflow-hidden flex items-center justify-center bg-surface'>
			<p className='text-sm text-muted'>Contenido debajo del overlay</p>
			{show && (
				<Overlay
					opacity={0.6}
					blur={2}
					onClick={() => setShow(false)}
				/>
			)}
			<button
				type='button'
				className='absolute top-2 right-2 px-3 py-1 text-xs rounded bg-brand text-white hover:bg-brand/90 transition-colors z-10'
				onClick={() => setShow((v) => !v)}>
				{show ? 'Quitar' : 'Mostrar overlay'}
			</button>
		</div>
	);
}

export default function OverlaysPage() {
	const [modalOpened, setModalOpened] = useState(false);
	const [drawerOpened, setDrawerOpened] = useState(false);
	const [menuOpened, setMenuOpened] = useState(false);
	const [popoverOpened, setPopoverOpened] = useState(false);
	const [dialogOpened, setDialogOpened] = useState(false);

	return (
		<div>
			<PageBreadcrumb
				items={[
					{ label: 'Inicio', href: '/' },
					{ label: 'Componentes' },
					{ label: 'Overlays' },
				]}
			/>
			<PageHeader
				title='Overlays'
				description='Capas flotantes para mostrar información contextual o flujos secundarios: tooltips, modales, drawers y menús.'
				pkg='@kivora/react → Tooltip, Modal, Drawer, Menu, HoverCard'
			/>

			{/* ── Tooltip ─────────────────────────────────── */}
			<Section
				title='Tooltip'
				description='Información contextual al hacer hover sobre un elemento.'>
				<Demo>
					<Label>Posiciones</Label>
					<div className='flex flex-wrap gap-3 mb-6'>
						{(['top', 'bottom', 'left', 'right'] as const).map(
							(pos) => (
								<Tooltip
									key={pos}
									label={`Posición: ${pos}`}
									position={pos}
									withArrow>
									<Button
										variant='outline'
										size='sm'>
										{pos}
									</Button>
								</Tooltip>
							),
						)}
					</div>

					<Label>Con flecha</Label>
					<Tooltip
						label='Editar configuración del proyecto'
						withArrow
						position='top'>
						<Button
							variant='ghost'
							size='sm'>
							<svg
								className='w-4 h-4'
								fill='none'
								viewBox='0 0 24 24'
								stroke='currentColor'
								strokeWidth={2}>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									d='M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z'
								/>
							</svg>
							Editar
						</Button>
					</Tooltip>

					<Label>Multiline</Label>
					<Tooltip
						label='Este tooltip contiene una descripción más larga que normalmente no cabe en una sola línea.'
						multiline
						width={240}
						withArrow>
						<Button
							variant='outline'
							size='sm'>
							Hover para descripción larga
						</Button>
					</Tooltip>
				</Demo>
			</Section>

			{/* ── Modal ───────────────────────────────────── */}
			<Section
				title='Modal'
				description='Diálogo en capa superior para flujos críticos de confirmación o edición.'>
				<Demo>
					<Button onClick={() => setModalOpened(true)}>
						Abrir Modal
					</Button>

					<Modal
						opened={modalOpened}
						onClose={() => setModalOpened(false)}
						title='Confirmar acción'
						size='md'
						centered>
						<p className='text-sm text-muted mb-6'>
							¿Estás seguro de que quieres eliminar este elemento?
							Esta acción no se puede deshacer.
						</p>
						<div className='flex gap-3 justify-end'>
							<Button
								variant='outline'
								onClick={() => setModalOpened(false)}>
								Cancelar
							</Button>
							<Button
								variant='solid'
								onClick={() => setModalOpened(false)}>
								Eliminar
							</Button>
						</div>
					</Modal>
				</Demo>
			</Section>

			{/* ── Drawer ──────────────────────────────────── */}
			<Section
				title='Drawer'
				description='Panel lateral deslizante para configuraciones o detalles adicionales.'>
				<Demo>
					<Button
						variant='outline'
						onClick={() => setDrawerOpened(true)}>
						Abrir Drawer
					</Button>

					<Drawer
						opened={drawerOpened}
						onClose={() => setDrawerOpened(false)}
						title='Configuración'>
						<div className='space-y-4 pt-2'>
							<div>
								<p className='text-sm font-medium text-on-surface mb-1'>
									Tema
								</p>
								<div className='flex gap-2'>
									<button className='px-3 py-1.5 text-sm rounded-lg bg-brand text-white'>
										Claro
									</button>
									<button className='px-3 py-1.5 text-sm rounded-lg border border-border text-muted'>
										Oscuro
									</button>
								</div>
							</div>
							<div>
								<p className='text-sm font-medium text-on-surface mb-1'>
									Idioma
								</p>
								<select className='w-full text-sm border border-border rounded-lg px-3 py-2'>
									<option>Español</option>
									<option>English</option>
								</select>
							</div>
							<div className='pt-4 border-t border-border'>
								<Button
									fullWidth
									onClick={() => setDrawerOpened(false)}>
									Guardar cambios
								</Button>
							</div>
						</div>
					</Drawer>
				</Demo>
			</Section>

			{/* ── Menu ────────────────────────────────────── */}
			<Section
				title='Menu'
				description='Menú contextual desplegable con acciones.'>
				<Demo>
					<Menu
						opened={menuOpened}
						onChange={setMenuOpened}
						withArrow>
						<MenuTarget>
							<Button
								variant='outline'
								size='sm'
								rightSection={
									<svg
										className='w-4 h-4'
										fill='none'
										viewBox='0 0 24 24'
										stroke='currentColor'
										strokeWidth={2}>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											d='M19 9l-7 7-7-7'
										/>
									</svg>
								}>
								Acciones
							</Button>
						</MenuTarget>
						<MenuDropdown>
							<MenuLabel>Archivo</MenuLabel>
							<MenuItem>Nuevo documento</MenuItem>
							<MenuItem>Duplicar</MenuItem>
							<MenuItem>Renombrar</MenuItem>
							<MenuDivider />
							<MenuLabel>Peligroso</MenuLabel>
							<MenuItem className='text-danger'>
								Eliminar
							</MenuItem>
						</MenuDropdown>
					</Menu>
				</Demo>
			</Section>

			{/* ── HoverCard ───────────────────────────────── */}
			<Section
				title='HoverCard'
				description='Tarjeta de previsualización que aparece al hacer hover.'>
				<Demo>
					<HoverCard
						width={280}
						shadow='md'
						withArrow>
						<HoverCardTarget>
							<span className='text-brand hover:underline cursor-pointer text-sm font-medium'>
								@kivora/react
							</span>
						</HoverCardTarget>
						<HoverCardDropdown>
							<div className='flex items-center gap-3 mb-3'>
								<div className='w-10 h-10 rounded-lg bg-brand/10 flex items-center justify-center'>
									<span className='text-xs font-bold text-brand'>
										K
									</span>
								</div>
								<div>
									<p className='text-sm font-semibold text-on-surface'>
										@kivora/react
									</p>
									<p className='text-xs text-muted'>
										v0.0.0 · React 19
									</p>
								</div>
							</div>
							<p className='text-xs text-muted'>
								Librería de componentes UI construida con React,
								TypeScript y Tailwind CSS.
							</p>
						</HoverCardDropdown>
					</HoverCard>
				</Demo>
			</Section>
			{/* ── Popover ────────────────────────────────────── */}
			<Section
				title='Popover'
				description='Panel flotante anclado a un elemento, ideal para filtros o formularios in-context.'>
				<Demo>
					<Popover
						opened={popoverOpened}
						onChange={setPopoverOpened}
						width={260}
						withArrow
						shadow='md'>
						<PopoverTarget>
							<Button
								variant='outline'
								size='sm'
								onClick={() => setPopoverOpened((o) => !o)}>
								Filtros
							</Button>
						</PopoverTarget>
						<PopoverDropdown>
							<p className='text-xs text-muted font-semibold uppercase tracking-widest mb-2'>
								Filtrar por
							</p>
							<div className='space-y-2'>
								<TextInput
									placeholder='Buscar...'
									size='sm'
								/>
								<Button
									size='sm'
									fullWidth
									onClick={() => setPopoverOpened(false)}>
									Aplicar filtros
								</Button>
							</div>
						</PopoverDropdown>
					</Popover>
				</Demo>
			</Section>

			{/* ── Dialog ───────────────────────────────────────── */}
			<Section
				title='Dialog'
				description='Ventana flotante persistente (no modal) para notificaciones o chats.'>
				<Demo>
					<Button
						variant='outline'
						onClick={() => setDialogOpened((o) => !o)}>
						{dialogOpened ? 'Cerrar Dialog' : 'Abrir Dialog'}
					</Button>
					<Dialog
						opened={dialogOpened}
						onClose={() => setDialogOpened(false)}
						size='md'
						radius='md'
						title='Asistente'>
						<p className='text-sm text-muted mb-3'>
							A diferencia del Modal, el Dialog no bloquea el
							fondo. Es ideal para chats, asistentes o
							notificaciones persistentes.
						</p>
						<Button
							size='sm'
							fullWidth
							variant='outline'
							onClick={() => setDialogOpened(false)}>
							Cerrar
						</Button>
					</Dialog>
				</Demo>
			</Section>
			{/* ── Toast ─────────────────────────────────── */}
			<Section
				title='Toast'
				description='Notificaciones no bloqueantes basadas en Sonner. Monta <Toaster /> una vez en el layout raíz.'>
				<Demo>
					<div className='flex flex-wrap gap-2'>
						<Button
							variant='outline'
							size='sm'
							onClick={() => toast('Mensaje informativo')}>
							Default
						</Button>
						<Button
							variant='outline'
							size='sm'
							onClick={() =>
								toast.success('¡Operación completada!')
							}>
							Success
						</Button>
						<Button
							variant='outline'
							size='sm'
							onClick={() => toast.error('Algo salió mal')}>
							Error
						</Button>
						<Button
							variant='outline'
							size='sm'
							onClick={() => toast.warning('Revisa los cambios')}>
							Warning
						</Button>
						<Button
							variant='outline'
							size='sm'
							onClick={() =>
								toast.info('Actualización disponible')
							}>
							Info
						</Button>
						<Button
							variant='outline'
							size='sm'
							onClick={() =>
								toast.promise(
									new Promise((res) => setTimeout(res, 2000)),
									{
										loading: 'Guardando...',
										success: '¡Guardado!',
										error: 'Error al guardar',
									},
								)
							}>
							Promise
						</Button>
						<Button
							variant='outline'
							size='sm'
							onClick={() =>
								toast('Con acción', {
									description:
										'Archivo eliminado permanentemente',
									action: {
										label: 'Deshacer',
										onClick: () =>
											toast.success('Acción deshecha'),
									},
								})
							}>
							Con acción
						</Button>
					</div>
				</Demo>
				<Toaster
					richColors
					position='bottom-right'
				/>
			</Section>

			{/* ── Overlay ─────────────────────────────────── */}
			<Section
				title='Overlay'
				description='Capa semitransparente que bloquea el contenido. Base de Modal, Drawer y Dialog.'>
				<Demo>
					<OverlayDemo />
				</Demo>
			</Section>

			{/* ── API ─────────────────────────────────────── */}
			<Section title='API — Modal'>
				<PropTable
					rows={[
						{
							prop: 'opened',
							type: 'boolean',
							description: 'Controla si el modal está visible.',
						},
						{
							prop: 'onClose',
							type: '() => void',
							description:
								'Se llama al cerrar (Esc, clic fuera, botón ×).',
						},
						{
							prop: 'title',
							type: 'ReactNode',
							description: 'Título del modal.',
						},
						{
							prop: 'size',
							type: "'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full'",
							default: "'md'",
							description: 'Ancho del modal.',
						},
						{
							prop: 'centered',
							type: 'boolean',
							default: 'false',
							description: 'Centra verticalmente el modal.',
						},
						{
							prop: 'withCloseButton',
							type: 'boolean',
							default: 'true',
							description: 'Muestra botón × en el header.',
						},
						{
							prop: 'closeOnClickOutside',
							type: 'boolean',
							default: 'true',
							description: 'Cierra al hacer clic fuera.',
						},
						{
							prop: 'closeOnEscape',
							type: 'boolean',
							default: 'true',
							description: 'Cierra al pulsar Escape.',
						},
					]}
				/>
			</Section>
		</div>
	);
}
