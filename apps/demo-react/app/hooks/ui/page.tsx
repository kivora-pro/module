'use client';

import {
	Demo,
	Label,
	PageBreadcrumb,
	PageHeader,
	Section,
} from '@/app/_components/Demo';
import {
	Badge,
	useClickOutside,
	useClipboard,
	useColorScheme,
	useDocumentTitle,
	useDocumentVisibility,
	useFullscreen,
	useHotkeys,
	useHover,
	useIdle,
	useMediaQuery,
	useNetwork,
	useOs,
	useReducedMotion,
	useViewportSize,
	useWindowScroll,
} from '@kivora/react';

function CodeBlock({ children }: { children: string }) {
	return (
		<pre className='bg-muted/10 border border-border rounded-lg p-4 text-xs overflow-x-auto text-on-surface/80 font-mono'>
			{children}
		</pre>
	);
}

function Chip({
	active,
	children,
}: {
	active: boolean;
	children: React.ReactNode;
}) {
	return (
		<span
			className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${active ? 'bg-brand text-white' : 'bg-muted/10 text-muted'}`}>
			<span
				className={`w-1.5 h-1.5 rounded-full ${active ? 'bg-white' : 'bg-muted/40'}`}
			/>
			{children}
		</span>
	);
}

export default function HooksUIPage() {
	const isMobile = useMediaQuery('(max-width: 640px)');
	const isMd = useMediaQuery('(min-width: 641px) and (max-width: 1024px)');
	const isLg = useMediaQuery('(min-width: 1025px)');

	const { ref: hoverRef, hovered } = useHover<HTMLDivElement>();
	const isIdle = useIdle(3000);
	const { width, height } = useViewportSize();
	const [scroll] = useWindowScroll();
	const os = useOs();

	const dropdownRef = useClickOutside<HTMLDivElement>(() => {});
	const clipboard = useClipboard({ timeout: 2000 });
	const colorScheme = useColorScheme();
	const isReduced = useReducedMotion();
	const docVisible = useDocumentVisibility();
	const { online, downlink } = useNetwork();
	const {
		ref: fullscreenRef,
		toggle: toggleFullscreen,
		fullscreen,
	} = useFullscreen();
	useDocumentTitle('Kivora — Demo');
	useHotkeys([['mod+k', () => {}]]);

	return (
		<div>
			<PageBreadcrumb
				items={[
					{ label: 'Inicio', href: '/' },
					{ label: 'Hooks' },
					{ label: 'UI & DOM' },
				]}
			/>
			<PageHeader
				title='UI & DOM Hooks'
				description='Hooks para reaccionar a cambios en el viewport, interacciones del usuario y el entorno del sistema operativo.'
				pkg='@kivora/react → useMediaQuery, useHover, useIdle, useViewportSize, useWindowScroll, useClickOutside, useOs'
			/>

			{/* ── useMediaQuery ───────────────────────────── */}
			<Section
				title='useMediaQuery'
				description='Evalúa media queries CSS de forma reactiva.'>
				<Demo>
					<div className='flex flex-wrap gap-2'>
						<Chip active={!!isMobile}>Mobile (&lt;640px)</Chip>
						<Chip active={!!isMd}>Tablet (641–1024px)</Chip>
						<Chip active={!!isLg}>Desktop (&gt;1024px)</Chip>
					</div>
				</Demo>
				<CodeBlock>{`const isMobile = useMediaQuery('(max-width: 640px)');
const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion)');`}</CodeBlock>
			</Section>

			{/* ── useHover ────────────────────────────────── */}
			<Section
				title='useHover'
				description='Detecta si el puntero está sobre un elemento.'>
				<Demo>
					<div
						ref={hoverRef}
						className={`p-6 rounded-xl border-2 border-dashed transition-all cursor-pointer text-center ${
							hovered
								? 'border-brand bg-brand/5 text-brand'
								: 'border-border text-muted'
						}`}>
						{hovered ? '✓ Haciendo hover' : 'Pasa el cursor aquí'}
					</div>
				</Demo>
				<CodeBlock>{`const { ref, hovered } = useHover<HTMLDivElement>();

return <div ref={ref}>{hovered ? 'Hovered!' : 'Not hovered'}</div>;`}</CodeBlock>
			</Section>

			{/* ── useIdle ─────────────────────────────────── */}
			<Section
				title='useIdle'
				description='Detecta si el usuario lleva X ms sin interacción.'>
				<Demo>
					<div className='flex items-center gap-3'>
						<Badge variant={isIdle ? 'light' : 'filled'}>
							{isIdle
								? '💤 Inactivo (3s sin mover)'
								: '⚡ Activo'}
						</Badge>
						<span className='text-xs text-muted'>
							Mueve el ratón para restablecer
						</span>
					</div>
				</Demo>
				<CodeBlock>{`const isIdle = useIdle(3000); // ms sin interacción`}</CodeBlock>
			</Section>

			{/* ── useViewportSize ─────────────────────────── */}
			<Section
				title='useViewportSize'
				description='Tamaño actual de la ventana, reactivo al resize.'>
				<Demo>
					<div className='flex gap-4'>
						<div className='bg-muted/10 rounded-lg p-3 text-center min-w-[80px]'>
							<p className='text-xs text-muted mb-1'>Ancho</p>
							<p className='text-lg font-bold text-on-surface'>
								{width}px
							</p>
						</div>
						<div className='bg-muted/10 rounded-lg p-3 text-center min-w-[80px]'>
							<p className='text-xs text-muted mb-1'>Alto</p>
							<p className='text-lg font-bold text-on-surface'>
								{height}px
							</p>
						</div>
					</div>
				</Demo>
				<CodeBlock>{`const { width, height } = useViewportSize();`}</CodeBlock>
			</Section>

			{/* ── useWindowScroll ─────────────────────────── */}
			<Section
				title='useWindowScroll'
				description='Posición de scroll actual con método para scrollar programáticamente.'>
				<Demo>
					<div className='flex gap-4 items-center'>
						<div className='bg-muted/10 rounded-lg p-3'>
							<p className='text-xs text-muted mb-1'>Scroll Y</p>
							<p className='text-lg font-bold text-on-surface'>
								{Math.round(scroll.y)}px
							</p>
						</div>
						<Label>
							Desplaza la página para ver el valor actualizado
						</Label>
					</div>
				</Demo>
				<CodeBlock>{`const [scroll, scrollTo] = useWindowScroll();

scroll.x  // posición horizontal
scroll.y  // posición vertical

scrollTo({ y: 0 }) // scroll al top`}</CodeBlock>
			</Section>

			{/* ── useClickOutside ─────────────────────────── */}
			<Section
				title='useClickOutside'
				description='Ejecuta un callback cuando el usuario hace click fuera del elemento.'>
				<Demo>
					<div
						ref={dropdownRef}
						className='inline-block'>
						<div className='bg-muted/10 border border-border rounded-lg px-4 py-3 text-sm text-muted'>
							Este elemento detecta clicks fuera (revisa la
							consola)
						</div>
					</div>
				</Demo>
				<CodeBlock>{`const ref = useClickOutside(() => closeDropdown());

return <div ref={ref}>...</div>;`}</CodeBlock>
			</Section>

			{/* ── useOs ───────────────────────────────────── */}
			<Section
				title='useOs'
				description='Detecta el sistema operativo del usuario.'>
				<Demo>
					<Badge variant='light'>{os || 'Detectando...'}</Badge>
					<p className='text-xs text-muted mt-2'>
						Útil para mostrar atajos de teclado específicos del SO.
					</p>
				</Demo>
				<CodeBlock>{`const os = useOs();
// → 'windows' | 'macos' | 'linux' | 'ios' | 'android' | 'undetermined'

const key = os === 'macos' ? '⌘' : 'Ctrl';`}</CodeBlock>
			</Section>
			{/* ── useClipboard ──────────────────────────────────── */}
			<Section
				title='useClipboard'
				description='Copia texto al portapapeles y expone el estado copied por N ms.'>
				<Demo>
					<div className='flex flex-wrap items-center gap-3'>
						<button
							className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all ${
								clipboard.copied
									? 'bg-brand text-white border-brand'
									: 'border-border text-on-surface hover:bg-muted/10'
							}`}
							onClick={() =>
								clipboard.copy('npm install @kivora/react')
							}>
							{clipboard.copied ? '✓ Copiado!' : 'Copiar comando'}
						</button>
						<Badge
							variant='light'
							size='sm'>
							timeout: 2000ms
						</Badge>
					</div>
				</Demo>
				<CodeBlock>{`const clipboard = useClipboard({ timeout: 2000 });

clipboard.copy('texto');  // copia al portapapeles
clipboard.copied          // true durante 2000ms
clipboard.error           // Error | null`}</CodeBlock>
			</Section>

			{/* ── useColorScheme ───────────────────────────────── */}
			<Section
				title='useColorScheme'
				description='Detecta el tema preferido del sistema operativo (light / dark).'>
				<Demo>
					<Badge
						variant={colorScheme === 'dark' ? 'filled' : 'light'}>
						{colorScheme === 'dark' ? '🌙 Oscuro' : '☀️ Claro'}
					</Badge>
					<p className='text-xs text-muted mt-2'>
						Cambia el tema del SO para ver el cambio en tiempo real.
					</p>
				</Demo>
				<CodeBlock>{`const colorScheme = useColorScheme();
// → 'dark' | 'light' (reactivo a prefers-color-scheme)`}</CodeBlock>
			</Section>

			{/* ── useDocumentTitle ───────────────────────────────── */}
			<Section
				title='useDocumentTitle'
				description='Establece document.title de forma declarativa y lo restaura al desmontar.'>
				<Demo>
					<p className='text-sm text-muted'>
						El título de esta pestaña fue establecido con{' '}
						<code className='text-xs bg-muted/20 px-1 py-0.5 rounded'>
							useDocumentTitle(&apos;Kivora — Demo&apos;)
						</code>
						.
					</p>
				</Demo>
				<CodeBlock>{`useDocumentTitle('Mi App - Página de inicio');
// Restaura el título original al desmontar`}</CodeBlock>
			</Section>

			{/* ── useDocumentVisibility ───────────────────────────── */}
			<Section
				title='useDocumentVisibility'
				description='Detecta si la pestaña está visible o en segundo plano.'>
				<Demo>
					<Badge
						variant={docVisible === 'visible' ? 'filled' : 'light'}>
						{docVisible === 'visible' ? '👁 Visible' : '💤 Oculta'}
					</Badge>
					<p className='text-xs text-muted mt-2'>
						Cambia a otra pestaña del navegador para ver el estado
						actualizado.
					</p>
				</Demo>
				<CodeBlock>{`const visibility = useDocumentVisibility();
// → 'visible' | 'hidden' | 'prerender' (API Page Visibility)`}</CodeBlock>
			</Section>

			{/* ── useNetwork ───────────────────────────────────────── */}
			<Section
				title='useNetwork'
				description='Estado de la conexión de red: online/offline y velocidad estimada.'>
				<Demo>
					<div className='flex items-center gap-3'>
						<Badge variant={online ? 'filled' : 'outline'}>
							{online ? '🟢 En línea' : '🔴 Sin conexión'}
						</Badge>
						{downlink && (
							<span className='text-xs text-muted'>
								{downlink.toFixed(1)} Mbps
							</span>
						)}
					</div>
				</Demo>
				<CodeBlock>{`const { online, downlink, effectiveType } = useNetwork();
// online: boolean
// downlink: MB/s estimados (puede ser undefined)
// effectiveType: '4g' | '3g' | '2g' | 'slow-2g'`}</CodeBlock>
			</Section>

			{/* ── useReducedMotion ─────────────────────────────────── */}
			<Section
				title='useReducedMotion'
				description='Detecta si el usuario prefer las animaciones reducidas (accesibilidad).'>
				<Demo>
					<Badge variant={isReduced ? 'outline' : 'filled'}>
						{isReduced
							? 'Movimiento reducido activado'
							: 'Animaciones normales'}
					</Badge>
					<p className='text-xs text-muted mt-2'>
						Activa "Reducir movimiento" en la configuración de
						accesibilidad del SO.
					</p>
				</Demo>
				<CodeBlock>{`const isReduced = useReducedMotion();
// prefers-reduced-motion: reduce → true

const transition = isReduced ? 'none' : { duration: 0.3 };`}</CodeBlock>
			</Section>

			{/* ── useFullscreen ────────────────────────────────────── */}
			<Section
				title='useFullscreen'
				description='Controla el modo pantalla completa nativo del navegador en cualquier elemento.'>
				<Demo>
					<div
						// eslint-disable-next-line @typescript-eslint/no-explicit-any
						ref={fullscreenRef as any}
						className={`rounded-xl border-2 border-dashed border-border p-6 flex flex-col items-center justify-center gap-3 transition-all ${
							fullscreen ? 'bg-surface-elevated' : ''
						}`}>
						<p className='text-sm text-muted'>
							{fullscreen
								? 'Presiona Esc para salir'
								: 'Este área puede ir a pantalla completa'}
						</p>
						<button
							className='px-4 py-2 rounded-lg border border-border text-sm hover:bg-muted/10 transition-colors'
							onClick={toggleFullscreen}>
							{fullscreen
								? 'Salir de pantalla completa'
								: 'Pantalla completa'}
						</button>
					</div>
				</Demo>
				<CodeBlock>{`const { ref, toggle, fullscreen } = useFullscreen<HTMLDivElement>();

return (
  <div ref={ref}>
    <button onClick={toggle}>
      {fullscreen ? 'Salir' : 'Pantalla completa'}
    </button>
  </div>
);`}</CodeBlock>
			</Section>

			{/* ── useHotkeys ────────────────────────────────────────── */}
			<Section
				title='useHotkeys'
				description='Registra atajos de teclado globales con soporte para mod (Ctrl/Cmd).'>
				<Demo>
					<div className='space-y-2'>
						<p className='text-sm text-muted'>
							Atajos registrados en esta página:
						</p>
						<div className='flex flex-wrap gap-2'>
							<div className='flex items-center gap-1 bg-muted/10 rounded-lg px-3 py-2'>
								<span className='text-xs font-mono bg-surface border border-border rounded px-1.5 py-0.5'>
									mod+k
								</span>
								<span className='text-xs text-muted ml-2'>
									Abrir búsqueda
								</span>
							</div>
						</div>
					</div>
				</Demo>
				<CodeBlock>{`useHotkeys([
  ['mod+k', () => openSearch()],          // Ctrl+K / Cmd+K
  ['mod+shift+d', () => toggleDark()],    // Ctrl+Shift+D
  ['escape', () => closeModal()],
]);
// mod = Ctrl en Windows/Linux, Cmd en macOS`}</CodeBlock>
			</Section>
		</div>
	);
}
