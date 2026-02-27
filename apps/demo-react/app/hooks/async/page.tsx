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
	Button,
	Loader,
	useDebouncedCallback,
	useDebouncedState,
	useDebouncedValue,
	useFetch,
	useInterval,
	useThrottledValue,
	useTimeout,
} from '@kivora/react';
import { useState } from 'react';

function CodeBlock({ children }: { children: string }) {
	return (
		<pre className='bg-muted/10 border border-border rounded-lg p-4 text-xs overflow-x-auto text-on-surface/80 font-mono'>
			{children}
		</pre>
	);
}

export default function HooksAsyncPage() {
	// useDebouncedValue demo
	const [searchInput, setSearchInput] = useState('');
	const [debounced] = useDebouncedValue(searchInput, 400);

	// useInterval demo
	const [seconds, setSeconds] = useState(0);
	const {
		start: startInterval,
		stop: stopInterval,
		active: running,
	} = useInterval(() => setSeconds((s) => s + 1), 1000);

	// useTimeout demo
	const [timeoutMsg, setTimeoutMsg] = useState<string | null>(null);
	const { start, clear } = useTimeout(
		() => setTimeoutMsg('¡Timeout ejecutado!'),
		2000,
	);

	// useDebouncedState demo
	const [debStateInput, setDebStateInput] = useDebouncedState('', 600);

	// useThrottledValue demo
	const [sliderVal, setSliderVal] = useState(50);
	const throttledSlider = useThrottledValue(sliderVal, 200);

	// useFetch demo
	const {
		data: postData,
		loading: postLoading,
		error: postError,
	} = useFetch<{ id: number; title: string; body: string }>(
		'https://jsonplaceholder.typicode.com/posts/1',
	);

	// useDebouncedCallback demo
	const [debCallResult, setDebCallResult] = useState('');
	const handleDebounced = useDebouncedCallback(
		(val: string) => setDebCallResult(val),
		500,
	);

	return (
		<div>
			<PageBreadcrumb
				items={[
					{ label: 'Inicio', href: '/' },
					{ label: 'Hooks' },
					{ label: 'Async & Timers' },
				]}
			/>
			<PageHeader
				title='Async & Timers Hooks'
				description='Hooks para controlar tiempo: debounce, intervalos y timeouts reactivos con limpieza automática.'
				pkg='@kivora/react → useDebouncedValue, useInterval, useTimeout'
			/>

			{/* ── useDebouncedValue ───────────────────────── */}
			<Section
				title='useDebouncedValue'
				description='Retrasa la actualización de un valor hasta N ms después del último cambio.'>
				<Demo>
					<div className='max-w-sm space-y-3'>
						<div>
							<Label>Valor en tiempo real</Label>
							<input
								className='w-full text-sm border border-border rounded-lg px-3 py-2 mt-1'
								placeholder='Escribe para buscar...'
								value={searchInput}
								onChange={(e) => setSearchInput(e.target.value)}
							/>
						</div>
						<div className='p-3 rounded-lg bg-muted/10 space-y-1'>
							<div className='flex items-center justify-between text-xs'>
								<span className='text-muted'>Directo:</span>
								<span className='text-on-surface font-mono'>
									{searchInput || '—'}
								</span>
							</div>
							<div className='flex items-center justify-between text-xs'>
								<span className='text-muted'>
									Debounced (400ms):
								</span>
								<span className='text-brand font-mono font-medium'>
									{debounced || '—'}
								</span>
							</div>
						</div>
						<p className='text-xs text-muted'>
							El valor debounced se actualiza 400ms después de que
							dejes de escribir.
						</p>
					</div>
				</Demo>
				<CodeBlock>{`const [debounced] = useDebouncedValue(value, 400);

// ideal para search inputs, filtros, auto-guardado
useEffect(() => {
  if (debounced) fetchResults(debounced);
}, [debounced]);`}</CodeBlock>
			</Section>

			{/* ── useInterval ─────────────────────────────── */}
			<Section
				title='useInterval'
				description='setInterval declarativo que se limpia automáticamente al desmontar.'>
				<Demo>
					<div className='flex flex-col gap-4'>
						<div className='text-4xl font-mono font-bold text-on-surface w-24 tabular-nums'>
							{String(Math.floor(seconds / 60)).padStart(2, '0')}:
							{String(seconds % 60).padStart(2, '0')}
						</div>
						<div className='flex gap-2 items-center'>
							<Button
								size='sm'
								variant={running ? 'outline' : 'solid'}
								onClick={() =>
									running ? stopInterval() : startInterval()
								}>
								{running ? 'Pausar' : 'Iniciar'}
							</Button>
							<Button
								size='sm'
								variant='ghost'
								onClick={() => {
									stopInterval();
									setSeconds(0);
								}}>
								Reset
							</Button>
							<Badge
								variant='light'
								size='sm'>
								{running ? (
									<>
										<Loader
											type='dots'
											size='xs'
										/>
										Corriendo
									</>
								) : (
									'Pausado'
								)}
							</Badge>
						</div>
					</div>
				</Demo>
				<CodeBlock>{`// Pasar null en lugar del delay pausa el intervalo
useInterval(callback, running ? 1000 : null);

// Acceso al control manual:
const { start, stop } = useInterval(callback, 1000, {
  autoInvoke: true,
});`}</CodeBlock>
			</Section>

			{/* ── useTimeout ──────────────────────────────── */}
			<Section
				title='useTimeout'
				description='setTimeout declarativo con start/clear controlados.'>
				<Demo>
					<div className='flex items-center gap-3 flex-wrap'>
						<Button
							size='sm'
							onClick={() => {
								setTimeoutMsg(null);
								start();
							}}>
							Ejecutar en 2s
						</Button>
						<Button
							size='sm'
							variant='outline'
							onClick={() => {
								clear();
								setTimeoutMsg(null);
							}}>
							Cancelar
						</Button>
						{timeoutMsg && (
							<Badge variant='filled'>{timeoutMsg}</Badge>
						)}
					</div>
					<p className='text-xs text-muted mt-3'>
						El callback se limpia automáticamente cuando el
						componente se desmonta.
					</p>
				</Demo>
				<CodeBlock>{`const { start, clear } = useTimeout(() => {
  showNotification();
}, 2000);

// start() — inicia el timer
// clear() — cancela el timer pendiente`}</CodeBlock>
			</Section>

			{/* ── useDebouncedCallback ──────────────────────────── */}
			<Section
				title='useDebouncedCallback'
				description='Debouncea una función callback — a diferencia de useDebouncedValue, el retraso está en la llamada.'>
				<Demo>
					<div className='space-y-3 max-w-sm'>
						<input
							className='w-full text-sm border border-border rounded-lg px-3 py-2'
							placeholder='Escribe (callback con 500ms de retraso)...'
							onChange={(e) => handleDebounced(e.target.value)}
						/>
						<div className='p-3 rounded-lg bg-muted/10 text-xs'>
							<span className='text-muted'>
								Resultado debouncedo:{' '}
							</span>
							<span className='text-brand font-mono'>
								{debCallResult || '—'}
							</span>
						</div>
					</div>
				</Demo>
				<CodeBlock>{`const handleSearch = useDebouncedCallback(
  (query: string) => fetchResults(query),
  300,
);

// Cancelar la llamada pendiente:
handleSearch.cancel();

// Útil para event handlers donde useDebouncedValue no aplica`}</CodeBlock>
			</Section>

			{/* ── useDebouncedState ───────────────────────────────── */}
			<Section
				title='useDebouncedState'
				description='Igual a useState pero la actualización se retrasa N ms. Ideal para campos de formulario que disparan efectos costosos.'>
				<Demo>
					<div className='space-y-3 max-w-sm'>
						<input
							className='w-full text-sm border border-border rounded-lg px-3 py-2'
							placeholder='Escribe algo (debounce 600ms)...'
							onChange={(e) => setDebStateInput(e.target.value)}
						/>
						<p className='text-sm text-muted'>
							Estado debouncedo:{' '}
							<strong className='text-brand font-mono'>
								{debStateInput || '—'}
							</strong>
						</p>
					</div>
				</Demo>
				<CodeBlock>{`const [value, setValue] = useDebouncedState('', 600);
// Diferencia con useDebouncedValue:
// useDebouncedState → retrasa el setter
// useDebouncedValue → retrasa un valor existente`}</CodeBlock>
			</Section>

			{/* ── useThrottledValue ─────────────────────────────────── */}
			<Section
				title='useThrottledValue'
				description='Limita la frecuencia de actualización de un valor a máximo una vez cada N ms.'>
				<Demo>
					<div className='space-y-4 max-w-sm'>
						<div>
							<p className='text-xs text-muted mb-2'>
								Mueve el slider rápidamente:
							</p>
							<input
								type='range'
								min={0}
								max={100}
								value={sliderVal}
								onChange={(e) =>
									setSliderVal(Number(e.target.value))
								}
								className='w-full accent-[var(--color-brand)]'
							/>
						</div>
						<div className='flex gap-4'>
							<div className='bg-muted/10 rounded-lg p-3 flex-1 text-center'>
								<p className='text-xs text-muted mb-1'>
									Directo
								</p>
								<p className='font-bold text-on-surface'>
									{sliderVal}
								</p>
							</div>
							<div className='bg-brand/10 rounded-lg p-3 flex-1 text-center'>
								<p className='text-xs text-muted mb-1'>
									Throttled (200ms)
								</p>
								<p className='font-bold text-brand'>
									{throttledSlider}
								</p>
							</div>
						</div>
					</div>
				</Demo>
				<CodeBlock>{`const throttled = useThrottledValue(value, 200);
// Máximo una actualización cada 200ms
// Ideal para scroll, resize, mouse move`}</CodeBlock>
			</Section>

			{/* ── useFetch ─────────────────────────────────────────── */}
			<Section
				title='useFetch'
				description='Fetch declarativo con estados loading/error/data y cancelación automática al desmontar.'>
				<Demo>
					{postLoading ? (
						<div className='flex items-center gap-2'>
							<Loader
								type='oval'
								size='sm'
							/>
							<span className='text-sm text-muted'>
								Cargando post...
							</span>
						</div>
					) : postError ? (
						<Badge variant='outline'>Error al cargar</Badge>
					) : postData ? (
						<div className='space-y-1'>
							<p className='text-xs text-muted uppercase tracking-widest font-bold'>
								Post #{postData.id} (JSONPlaceholder)
							</p>
							<p className='text-sm font-semibold text-on-surface capitalize'>
								{postData.title}
							</p>
							<p className='text-xs text-muted line-clamp-2'>
								{postData.body}
							</p>
						</div>
					) : null}
				</Demo>
				<CodeBlock>{`const { data, loading, error } = useFetch<Post>(
  '/api/posts/1',
);

// Cancelación automática del AbortController al desmontar
// Ideal para cargar datos iniciales en componentes`}</CodeBlock>
			</Section>

			<Section
				title='Patrones comunes'
				description='Combinaciones habituales de estos hooks en aplicaciones reales.'>
				<div className='space-y-4'>
					<div>
						<h3 className='text-sm font-semibold text-on-surface mb-2'>
							Search con debounce + fetch
						</h3>
						<CodeBlock>{`function SearchBox() {
  const [query, setQuery] = useState('');
  const [debounced] = useDebouncedValue(query, 300);
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (!debounced) return;
    fetch('/api/search?q=' + debounced)
      .then(r => r.json())
      .then(setResults);
  }, [debounced]);

  return <input value={query} onChange={e => setQuery(e.target.value)} />;
}`}</CodeBlock>
					</div>
					<div>
						<h3 className='text-sm font-semibold text-on-surface mb-2'>
							Polling periódico
						</h3>
						<CodeBlock>{`function StatusPoller() {
  const [status, setStatus] = useState('idle');

  useInterval(async () => {
    const { status } = await fetchStatus();
    setStatus(status);
  }, 5000); // cada 5 segundos

  return <Badge>{status}</Badge>;
}`}</CodeBlock>
					</div>
				</div>
			</Section>
		</div>
	);
}
