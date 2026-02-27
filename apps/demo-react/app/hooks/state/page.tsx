'use client';

import {
HookCard,
PageBreadcrumb,
PageHeader,
} from '@/app/_components/Demo';
import {
Badge,
Button,
useCounter,
useDidUpdate,
useDisclosure,
useForceUpdate,
useInputState,
useListState,
useLocalStorage,
useMap,
useMounted,
usePagination,
usePrevious,
useQueue,
useSessionStorage,
useSet,
useSetState,
useStateHistory,
useToggle,
useUncontrolled,
useValidatedState,
} from '@kivora/react';
import { useState } from 'react';

function GroupLabel({ children }: { children: string }) {
return (
<p className='text-[10px] font-bold uppercase tracking-widest text-muted/60 mb-4 mt-10 first:mt-0 flex items-center gap-2'>
<span className='flex-1 border-t border-border/60' />
{children}
<span className='flex-1 border-t border-border/60' />
</p>
);
}

function UseListStateDemo() {
const [list, handlers] = useListState(['Elemento 1', 'Elemento 2', 'Elemento 3']);
const [newItem, setNewItem] = useState('');
return (
<div className='flex flex-col gap-3 max-w-xs'>
<div className='flex gap-2'>
<input
className='flex-1 text-sm border border-border rounded-lg px-3 py-1.5 bg-surface text-on-surface outline-none focus:ring-2 focus:ring-brand'
placeholder='Nuevo elemento...'
value={newItem}
onChange={(e) => setNewItem(e.target.value)}
onKeyDown={(e) => {
if (e.key === 'Enter' && newItem.trim()) {
handlers.append(newItem.trim());
setNewItem('');
}
}}
/>
<Button size='sm' onClick={() => { if (newItem.trim()) { handlers.append(newItem.trim()); setNewItem(''); } }}>+</Button>
</div>
<ul className='space-y-1'>
{list.map((item, i) => (
<li key={i} className='flex items-center justify-between p-2 rounded-lg bg-muted/10 text-sm text-on-surface'>
{item}
<button type='button' onClick={() => handlers.remove(i)} className='text-muted hover:text-danger text-xs ml-2'>x</button>
</li>
))}
</ul>
</div>
);
}

function UseMapDemo() {
const map = useMap<string, number>([['manzanas', 5], ['peras', 3], ['uvas', 8]]);
const [key, setKey] = useState('kiwis');
const [val, setVal] = useState('2');
return (
<div className='space-y-3 max-w-xs'>
<ul className='space-y-1'>
{Array.from(map.keys()).map((k) => (
<li key={k} className='flex items-center justify-between p-2 rounded-lg bg-muted/10 text-sm'>
<span className='text-on-surface font-mono'>{k}</span>
<div className='flex items-center gap-2'>
<span className='font-bold text-brand'>{map.get(k)}</span>
<button type='button' onClick={() => map.delete(k)} className='text-muted hover:text-danger text-xs'>x</button>
</div>
</li>
))}
</ul>
<div className='flex gap-2'>
<input className='flex-1 text-xs border border-border rounded-lg px-2 py-1.5 bg-surface outline-none focus:ring-2 focus:ring-brand' placeholder='clave' value={key} onChange={(e) => setKey(e.target.value)} />
<input className='w-16 text-xs border border-border rounded-lg px-2 py-1.5 bg-surface outline-none focus:ring-2 focus:ring-brand' placeholder='val' type='number' value={val} onChange={(e) => setVal(e.target.value)} />
<Button size='sm' onClick={() => { if (key) { map.set(key, Number(val)); setKey(''); } }}>+</Button>
</div>
</div>
);
}

function UseSetDemo() {
const set = useSet<string>(['React', 'TypeScript', 'Tailwind']);
const tags = ['React', 'TypeScript', 'Tailwind', 'Next.js', 'Vite', 'Zod'];
return (
<div className='space-y-3'>
<p className='text-xs text-muted'>Click para añadir/quitar del Set ({set.size} elementos):</p>
<div className='flex flex-wrap gap-2'>
{tags.map((t) => (
<button
key={t}
type='button'
onClick={() => set.has(t) ? set.delete(t) : set.add(t)}
className={[
'px-3 py-1 text-xs rounded-full border transition-colors',
set.has(t) ? 'bg-brand text-white border-brand' : 'border-border text-muted hover:border-brand hover:text-brand',
].join(' ')}>
{t}
</button>
))}
</div>
<p className='text-xs font-mono text-muted bg-muted/10 rounded-lg px-3 py-2'>
Set: {'{'}  {[...set.values()].join(', ')}  {'}'}
</p>
</div>
);
}

function UseQueueDemo() {
const { queue, state, add, cleanQueue } = useQueue<string>({ initialValues: ['A', 'B', 'C', 'D', 'E'], limit: 3 });
return (
<div className='space-y-3 max-w-sm'>
<div className='flex gap-4 text-sm'>
<div className='flex-1'>
<p className='text-xs text-muted mb-1.5 font-medium'>Activos (limit=3)</p>
<div className='flex gap-1 flex-wrap'>
{state.map((s, i) => <span key={i} className='px-2 py-1 bg-brand/10 text-brand text-xs rounded-md font-mono'>{s}</span>)}
</div>
</div>
<div className='flex-1'>
<p className='text-xs text-muted mb-1.5 font-medium'>En cola (overflow)</p>
<div className='flex gap-1 flex-wrap'>
{queue.length === 0
? <span className='text-xs text-muted/50 italic'>empty</span>
: queue.map((s, i) => <span key={i} className='px-2 py-1 bg-muted/20 text-muted text-xs rounded-md font-mono'>{s}</span>)
}
</div>
</div>
</div>
<div className='flex gap-2'>
<Button size='sm' onClick={() => add(String.fromCharCode(65 + state.length + queue.length))}>Add</Button>
<Button size='sm' variant='outline' onClick={cleanQueue}>Limpiar cola</Button>
</div>
</div>
);
}

function UseStateHistoryDemo() {
const { state, history, pointer, set, back, forward } = useStateHistory('Hola mundo');
return (
<div className='space-y-3 max-w-sm'>
<input
className='w-full text-sm border border-border rounded-lg px-3 py-1.5 bg-surface text-on-surface outline-none focus:ring-2 focus:ring-brand'
value={state}
onChange={(e) => set(e.target.value)}
/>
<div className='flex items-center gap-2'>
<Button size='sm' variant='outline' onClick={() => back()} disabled={pointer === 0}>Back</Button>
<Button size='sm' variant='outline' onClick={() => forward()} disabled={pointer === history.length - 1}>Forward</Button>
<Badge variant='light' size='sm'>{pointer + 1} / {history.length}</Badge>
</div>
<div className='text-xs text-muted font-mono bg-muted/10 rounded-lg px-3 py-2 space-y-0.5 max-h-24 overflow-y-auto'>
{history.map((h, i) => (
<p key={i} className={i === pointer ? 'text-brand font-bold' : 'text-muted/60'}>
{i === pointer ? '> ' : '  '}{h || '(vacio)'}
</p>
))}
</div>
</div>
);
}

function UsePaginationDemo() {
const { range, active, setPage, next, previous, first, last } = usePagination({ total: 8, siblings: 1, boundaries: 1 });
return (
<div className='space-y-3'>
<div className='flex items-center gap-1 flex-wrap'>
<button type='button' onClick={first} disabled={active === 1} className='px-2 py-1.5 text-xs rounded-lg border border-border text-muted hover:bg-muted/20 disabled:opacity-30 transition-colors'></button>
<button type='button' onClick={previous} disabled={active === 1} className='px-2 py-1.5 text-xs rounded-lg border border-border text-muted hover:bg-muted/20 disabled:opacity-30 transition-colors'></button>
{range.map((p, i) =>
p === 'dots'
? <span key={'dots-' + i} className='px-2 py-1.5 text-xs text-muted'></span>
: <button key={p} type='button' onClick={() => setPage(p as number)} className={['px-3 py-1.5 text-xs rounded-lg border transition-colors', active === p ? 'bg-brand text-white border-brand' : 'border-border text-on-surface hover:bg-muted/20'].join(' ')}>{p}</button>
)}
<button type='button' onClick={next} disabled={active === 8} className='px-2 py-1.5 text-xs rounded-lg border border-border text-muted hover:bg-muted/20 disabled:opacity-30 transition-colors'></button>
<button type='button' onClick={last} disabled={active === 8} className='px-2 py-1.5 text-xs rounded-lg border border-border text-muted hover:bg-muted/20 disabled:opacity-30 transition-colors'></button>
</div>
<p className='text-xs text-muted'>Pagina activa: <strong className='text-on-surface'>{active}</strong> de 8</p>
</div>
);
}

function UseDidUpdateDemo() {
const [count, setCount] = useState(0);
const [log, setLog] = useState<string[]>([]);
useDidUpdate(() => {
setLog((prev) => ['count -> ' + count, ...prev].slice(0, 5));
}, [count]);
return (
<div className='space-y-3'>
<div className='flex items-center gap-3'>
<Button size='sm' variant='outline' onClick={() => setCount((c) => c - 1)}>-</Button>
<span className='text-2xl font-bold text-on-surface w-10 text-center'>{count}</span>
<Button size='sm' variant='outline' onClick={() => setCount((c) => c + 1)}>+</Button>
<p className='text-xs text-muted ml-2'>El log no se añade en el primer render</p>
</div>
<div className='text-xs font-mono space-y-1 bg-muted/10 rounded-lg px-3 py-2 min-h-12'>
{log.length === 0
? <p className='text-muted/50 italic'>Sin cambios aun...</p>
: log.map((l, i) => <p key={i} className={i === 0 ? 'text-brand' : 'text-muted/60'}>{l}</p>)
}
</div>
</div>
);
}

export default function HooksStatePage() {
const counter = useCounter(0, { min: 0, max: 10 });
const [toggleValue, toggle] = useToggle(['light', 'dark'] as const);
const { opened, open, close, toggle: toggleDisc } = useDisclosure(false);
const [prevInput, setPrevInput] = useState(0);
const previous = usePrevious(prevInput);
const [formState, setFormState] = useSetState({ name: '', email: '' });
const [inputVal, setInputVal] = useInputState('');
const { value: vName, valid: vNameValid, setValue: setVName } = useValidatedState('', (v) => v.length >= 3);
const [storedName, setStoredName] = useLocalStorage({ key: 'kivora-demo-name', defaultValue: '' });
const [sessionVal, setSessionVal] = useSessionStorage({ key: 'kivora-session-demo', defaultValue: '' });
const [uncontrolled, handleUncontrolled] = useUncontrolled({ defaultValue: 'Valor inicial' });
const mounted = useMounted();
const forceUpdate = useForceUpdate();
	const renderTimestamp = new Date().toLocaleTimeString('es', { hour: '2-digit', minute: '2-digit', second: '2-digit' });


return (
<div>
<PageBreadcrumb items={[{ label: 'Inicio', href: '/' }, { label: 'Hooks' }, { label: 'State' }]} />
<PageHeader
title='State Hooks'
description='Hooks para gestionar estado local, colecciones, historial, paginacion, persistencia y ciclos de vida.'
pkg='@kivora/react -> useCounter, useToggle, useDisclosure, useListState, usePagination...'
/>

<GroupLabel>Contadores y alternancia</GroupLabel>

<HookCard
title='useCounter'
description='Contador numerico con min/max y metodos de incremento/decremento.'
demo={
<div className='flex items-center gap-3'>
<Button variant='outline' size='sm' onClick={() => counter.decrement()}>-</Button>
<span className='text-2xl font-bold text-on-surface w-10 text-center'>{counter.count}</span>
<Button variant='outline' size='sm' onClick={() => counter.increment()}>+</Button>
<Button variant='ghost' size='sm' onClick={() => counter.reset()}>Reset</Button>
<Button variant='ghost' size='sm' onClick={() => counter.set(5)}>Set 5</Button>
<Badge variant='light' size='sm'>min=0 max=10</Badge>
</div>
}
code={`const counter = useCounter(0, { min: 0, max: 10 });
counter.count       // valor actual
counter.increment() // +1
counter.decrement() // -1
counter.set(5)      // valor fijo
counter.reset()     // al valor inicial`}
/>

<HookCard
title='useToggle'
description='Alterna entre N valores dados, ideal para temas, modos u opciones ciclicas.'
demo={
<div className='flex items-center gap-4'>
<Button variant='outline' onClick={() => toggle()}>Toggle</Button>
<Badge variant={toggleValue === 'light' ? 'filled' : 'outline'}>
{toggleValue === 'light' ? 'Claro' : 'Oscuro'}
</Badge>
</div>
}
code={`const [value, toggle] = useToggle(['light', 'dark'] as const);
toggle()          // cambia al siguiente
toggle('light')   // fuerza valor especifico`}
/>

<HookCard
title='useDisclosure'
description='Gestiona estados booleanos de apertura/cierre (modal, drawer, dropdown...).'
demo={
<div className='flex flex-wrap items-center gap-3'>
<Button size='sm' onClick={open}>Abrir</Button>
<Button size='sm' variant='outline' onClick={close}>Cerrar</Button>
<Button size='sm' variant='ghost' onClick={toggleDisc}>Toggle</Button>
<Badge variant={opened ? 'filled' : 'light'}>{opened ? 'Abierto' : 'Cerrado'}</Badge>
</div>
}
code={`const { opened, open, close, toggle } = useDisclosure(false);
// Con callbacks:
useDisclosure(false, {
  onOpen:  () => console.log('opened'),
  onClose: () => console.log('closed'),
})`}
/>

<GroupLabel>Colecciones</GroupLabel>

<HookCard
title='useListState'
description='Gestiona arrays con metodos inmutables: append, prepend, remove, insert, reorder...'
demo={<UseListStateDemo />}
code={`const [list, handlers] = useListState(['a', 'b']);
handlers.append('c')
handlers.prepend('z')
handlers.remove(0)
handlers.insert(1, 'x')
handlers.reorder({ from: 0, to: 2 })
handlers.apply(fn)`}
/>

<HookCard
title='useMap'
description='Map reactivo con metodos set/delete/clear que disparan re-renders.'
demo={<UseMapDemo />}
code={`const map = useMap<string, number>([['a', 1]]);
map.set('b', 2)
map.delete('a')
map.clear()
map.get('b')   // -> 2
map.has('b')   // -> true
map.size       // -> numero de entradas`}
/>

<HookCard
title='useSet'
description='Set reactivo con metodos add/delete/clear/replace que disparan re-renders.'
demo={<UseSetDemo />}
code={`const set = useSet<string>(['React', 'TypeScript']);
set.add('Vite')
set.delete('React')
set.has('Vite')     // -> true
set.size            // -> numero de elementos
set.clear()
set.replace(['a', 'b'])`}
/>

<HookCard
title='useQueue'
description='Cola con limite de elementos activos; el exceso se guarda en un buffer separado.'
demo={<UseQueueDemo />}
code={`const { state, queue, add, cleanQueue } = useQueue({
  initialValues: ['A', 'B', 'C', 'D', 'E'],
  limit: 3,
});
// state -> primeros 3 activos
// queue -> resto en espera
add('F')
cleanQueue()`}
/>

<GroupLabel>Historial y estado anterior</GroupLabel>

<HookCard
title='usePrevious'
description='Recuerda el valor anterior de cualquier variable en la renderizacion previa.'
demo={
<div className='flex flex-col gap-4'>
<div className='flex items-center gap-3'>
<Button variant='outline' size='sm' onClick={() => setPrevInput((n) => n - 1)}>-</Button>
<span className='text-2xl font-bold text-on-surface w-10 text-center'>{prevInput}</span>
<Button variant='outline' size='sm' onClick={() => setPrevInput((n) => n + 1)}>+</Button>
</div>
<div className='flex gap-4 text-sm'>
<div className='bg-muted/10 rounded-lg px-4 py-2.5 flex flex-col items-center'>
<p className='text-xs text-muted mb-1'>Actual</p>
<p className='font-bold text-on-surface text-lg'>{prevInput}</p>
</div>
<div className='bg-muted/10 rounded-lg px-4 py-2.5 flex flex-col items-center'>
<p className='text-xs text-muted mb-1'>Anterior</p>
<p className='font-bold text-brand text-lg'>{previous ?? '-'}</p>
</div>
</div>
</div>
}
code={`const [count, setCount] = useState(0);
const previous = usePrevious(count);
// previous -> valor de la renderizacion anterior`}
/>

<HookCard
title='useStateHistory'
description='Estado con historial completo de valores  undo/redo con back() y forward().'
demo={<UseStateHistoryDemo />}
code={`const { state, history, pointer, set, back, forward, reset } =
  useStateHistory('Hola');
set('Nuevo valor')  // aniade al historial
back()              // retrocede 1 paso
back(2)             // retrocede 2 pasos
forward()           // avanza 1 paso
reset()             // vuelve al inicial`}
/>

<GroupLabel>Formularios y objetos</GroupLabel>

<HookCard
title='useSetState'
description='Como useState pero fusiona el estado parcialmente  ideal para objetos de formulario.'
demo={
<div className='space-y-2 max-w-xs'>
<input className='w-full text-sm border border-border rounded-lg px-3 py-1.5 bg-surface outline-none focus:ring-2 focus:ring-brand' placeholder='Nombre...' value={formState.name} onChange={(e) => setFormState({ name: e.target.value })} />
<input className='w-full text-sm border border-border rounded-lg px-3 py-1.5 bg-surface outline-none focus:ring-2 focus:ring-brand' placeholder='Email...' value={formState.email} onChange={(e) => setFormState({ email: e.target.value })} />
<div className='bg-muted/10 rounded-lg p-3 text-xs font-mono text-on-surface/80'>{JSON.stringify(formState, null, 2)}</div>
</div>
}
code={`const [state, setState] = useSetState({ name: '', age: 0 });
setState({ name: 'Ana' })  // -> { name: 'Ana', age: 0 }
setState((prev) => ({ age: prev.age + 1 }))`}
/>

<HookCard
title='useInputState'
description='Devuelve un onChange que acepta tanto un ChangeEvent como un string directamente.'
demo={
<div className='space-y-2 max-w-xs'>
<input className='w-full text-sm border border-border rounded-lg px-3 py-1.5 bg-surface outline-none focus:ring-2 focus:ring-brand' placeholder='Escribe algo...' value={inputVal} onChange={setInputVal} />
<div className='flex gap-2'>
<Button size='sm' variant='outline' onClick={() => setInputVal('Kivora')}>Set &quot;Kivora&quot;</Button>
<Button size='sm' variant='ghost' onClick={() => setInputVal('')}>Limpiar</Button>
</div>
<p className='text-xs font-mono text-muted'>valor: &ldquo;{inputVal}&rdquo;</p>
</div>
}
code={`const [value, onChange] = useInputState('');
<input value={value} onChange={onChange} />
onChange('directo')  // tambien valido`}
/>

<HookCard
title='useValidatedState'
description='Estado que incluye resultado de una funcion de validacion en cada cambio.'
demo={
<div className='max-w-xs space-y-2'>
<input
className={'w-full text-sm border rounded-lg px-3 py-1.5 bg-surface outline-none transition-colors focus:ring-2 ' + (vNameValid ? 'border-green-400 focus:ring-green-400' : 'border-red-400 focus:ring-red-400')}
placeholder='Min. 3 caracteres...'
value={vName}
onChange={(e) => setVName(e.target.value)}
/>
<p className={'text-xs font-medium ' + (vNameValid ? 'text-green-500' : 'text-red-500')}>
{vName === '' ? 'Escribe algo...' : vNameValid ? 'Valido' : 'Minimo 3 caracteres'}
</p>
</div>
}
code={`const { value, valid, setValue } = useValidatedState(
  '',
  (v) => v.length >= 3,
);
// valid: boolean, value: string`}
/>

<HookCard
title='useUncontrolled'
description='Puente entre componentes controlados y no controlados  acepta value externo o usa estado interno.'
demo={
<div className='space-y-2 max-w-xs'>
<input className='w-full text-sm border border-border rounded-lg px-3 py-1.5 bg-surface outline-none focus:ring-2 focus:ring-brand' value={uncontrolled} onChange={(e) => handleUncontrolled(e.currentTarget.value)} />
<p className='text-xs text-muted'>Valor: <span className='font-mono text-on-surface'>&ldquo;{uncontrolled}&rdquo;</span></p>
</div>
}
code={`const [value, setValue] = useUncontrolled({
  defaultValue: 'Inicial',
  value: controlledProp,   // control externo opcional
  onChange: (v) => ...,
});`}
/>

<GroupLabel>Paginacion</GroupLabel>

<HookCard
title='usePagination'
description='Genera el rango de paginas con "dots" para truncar  listo para renderizar.'
demo={<UsePaginationDemo />}
code={`const { range, active, setPage, next, previous, first, last } =
  usePagination({ total: 10, siblings: 1, boundaries: 1 });
// range -> [1, 2, 'dots', 8, 9, 10]
setPage(5) ; next() ; previous()`}
/>

<GroupLabel>Persistencia</GroupLabel>

<HookCard
title='useLocalStorage'
description='Sincroniza estado con localStorage con serializacion JSON automatica y sincronizacion entre pestanas.'
demo={
<div className='space-y-2 max-w-xs'>
<input className='w-full text-sm border border-border rounded-lg px-3 py-1.5 bg-surface outline-none focus:ring-2 focus:ring-brand' placeholder='Escribe tu nombre...' value={storedName} onChange={(e) => setStoredName(e.target.value)} />
<p className='text-xs text-muted'>Recarga la pagina y el valor persistira.{' '}<button type='button' className='text-brand hover:underline' onClick={() => setStoredName('')}>Limpiar</button></p>
</div>
}
code={`const [value, setValue] = useLocalStorage({
  key: 'my-key',
  defaultValue: '',
});
// Se sincroniza entre pestanas del mismo origen`}
/>

<HookCard
title='useSessionStorage'
description='Igual que useLocalStorage pero con sessionStorage  los datos se pierden al cerrar la pestana.'
demo={
<div className='space-y-2 max-w-xs'>
<input className='w-full text-sm border border-border rounded-lg px-3 py-1.5 bg-surface outline-none focus:ring-2 focus:ring-brand' placeholder='Temporal para esta sesion...' value={sessionVal} onChange={(e) => setSessionVal(e.target.value)} />
<p className='text-xs text-muted'>Se borra al cerrar la pestana.{' '}<button type='button' className='text-brand hover:underline' onClick={() => setSessionVal('')}>Limpiar</button></p>
</div>
}
code={`const [value, setValue] = useSessionStorage({
  key: 'session-key',
  defaultValue: '',
});
// Misma API que useLocalStorage`}
/>

<GroupLabel>Ciclo de vida</GroupLabel>

<HookCard
title='useMounted'
description='Devuelve true solo despues de que el componente se haya montado en el cliente  util para SSR.'
demo={
<div className='flex items-center gap-3'>
<Badge variant={mounted ? 'filled' : 'light'}>{mounted ? 'Montado (cliente)' : 'No montado'}</Badge>
<p className='text-xs text-muted'>En SSR  false; en cliente  true</p>
</div>
}
code={`const mounted = useMounted();
// false durante SSR, true tras el primer useEffect
// Util para evitar hydration mismatches`}
/>

<HookCard
title='useForceUpdate'
description='Devuelve una funcion que fuerza una re-renderizacion del componente sin cambiar estado.'
demo={
<div className='flex items-center gap-4'>
<Button variant='outline' onClick={() => forceUpdate()}>Forzar re-render</Button>
<p className='text-sm text-muted'>Ultima renderizacion: <span className='font-bold text-brand font-mono'>{renderTimestamp}</span></p>
</div>
}
code={`const forceUpdate = useForceUpdate();
	const renderTimestamp = new Date().toLocaleTimeString('es', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
// Util cuando necesitas re-renderizar sin
// cambiar ningun estado (refs, datos externos...)`}
/>

<HookCard
title='useDidUpdate'
description='Como useEffect pero omite la ejecucion en el primer render  solo se ejecuta en actualizaciones.'
demo={<UseDidUpdateDemo />}
code={`useDidUpdate(() => {
  console.log('count cambio a', count);
  // NO se ejecuta en el primer render
}, [count]);`}
/>
</div>
);
}



