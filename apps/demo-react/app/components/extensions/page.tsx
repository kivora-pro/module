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
	Carousel,
	CarouselSlide,
	DatePickerInput,
	DateRangePickerInput,
	Dropzone,
	InlineCalendar,
	ModalsProvider,
	MonthPickerInput,
	SpotlightProvider,
	TimePicker,
	Toaster,
	modals,
	spotlight,
	type DateRange,
} from '@kivora/react';
import { useState } from 'react';
import { toast } from 'sonner';

/* ── carousel data ──────────────────────────────────────────── */
const HERO_SLIDES = [
	{
		gradient: 'from-violet-600 to-indigo-500',
		title: 'Componentes modernos',
		subtitle: 'Diseñados para React con TypeScript de primera clase',
		icon: (
			<svg
				className='w-10 h-10 text-white/80'
				fill='none'
				viewBox='0 0 24 24'
				stroke='currentColor'
				strokeWidth={1.5}>
				<path
					strokeLinecap='round'
					strokeLinejoin='round'
					d='M14.25 6.087c0-.355.186-.676.401-.959.221-.29.349-.634.349-1.003 0-1.036-1.007-1.875-2.25-1.875s-2.25.84-2.25 1.875c0 .369.128.713.349 1.003.215.283.401.604.401.959v0a.64.64 0 0 1-.657.643 48.39 48.39 0 0 1-4.163-.3c.186 1.613.293 3.25.315 4.907a.656.656 0 0 1-.658.663v0c-.355 0-.676-.186-.959-.401a1.647 1.647 0 0 0-1.003-.349c-1.036 0-1.875 1.007-1.875 2.25s.84 2.25 1.875 2.25c.369 0 .713-.128 1.003-.349.283-.215.604-.401.959-.401v0c.31 0 .555.26.532.57a48.039 48.039 0 0 1-.642 5.056c1.518.19 3.058.309 4.616.354a.64.64 0 0 0 .657-.643v0c0-.355-.186-.676-.401-.959a1.647 1.647 0 0 1-.349-1.003c0-1.035 1.008-1.875 2.25-1.875 1.243 0 2.25.84 2.25 1.875 0 .369-.128.713-.349 1.003-.215.283-.401.604-.401.959v0c0 .333.277.599.61.58a48.1 48.1 0 0 0 5.427-.63 48.05 48.05 0 0 0 .582-4.717.532.532 0 0 0-.533-.57v0c-.355 0-.676.186-.959.401-.29.221-.634.349-1.003.349-1.035 0-1.875-1.007-1.875-2.25s.84-2.25 1.875-2.25c.37 0 .713.128 1.003.349.283.215.604.401.959.401v0a.656.656 0 0 0 .658-.663 48.422 48.422 0 0 0-.37-5.36c-1.886.342-3.81.574-5.766.689a.578.578 0 0 1-.61-.58v0Z'
				/>
			</svg>
		),
	},
	{
		gradient: 'from-emerald-500 to-teal-600',
		title: 'Accesible por defecto',
		subtitle: 'Soporte completo de teclado y roles WAI-ARIA',
		icon: (
			<svg
				className='w-10 h-10 text-white/80'
				fill='none'
				viewBox='0 0 24 24'
				stroke='currentColor'
				strokeWidth={1.5}>
				<path
					strokeLinecap='round'
					strokeLinejoin='round'
					d='M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z'
				/>
			</svg>
		),
	},
	{
		gradient: 'from-orange-500 to-rose-500',
		title: 'Personalizable',
		subtitle: 'Adapta cada componente con tokens de diseño propios',
		icon: (
			<svg
				className='w-10 h-10 text-white/80'
				fill='none'
				viewBox='0 0 24 24'
				stroke='currentColor'
				strokeWidth={1.5}>
				<path
					strokeLinecap='round'
					strokeLinejoin='round'
					d='M4.098 19.902a3.75 3.75 0 0 0 5.304 0l6.401-6.402M6.75 21A3.75 3.75 0 0 1 3 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 0 0 3.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.197l2.88-2.88c.438-.439 1.15-.439 1.59 0l3.712 3.713c.44.44.44 1.152 0 1.59l-2.879 2.88M6.75 17.25h.008v.008H6.75v-.008Z'
				/>
			</svg>
		),
	},
	{
		gradient: 'from-sky-500 to-blue-600',
		title: 'Rendimiento',
		subtitle: 'Animaciones fluidas con Framer Motion y zero layout shift',
		icon: (
			<svg
				className='w-10 h-10 text-white/80'
				fill='none'
				viewBox='0 0 24 24'
				stroke='currentColor'
				strokeWidth={1.5}>
				<path
					strokeLinecap='round'
					strokeLinejoin='round'
					d='M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z'
				/>
			</svg>
		),
	},
];

const CARD_SLIDES = [
	{ color: 'bg-violet-500', label: 'Diseño UI', count: '12 componentes' },
	{ color: 'bg-indigo-500', label: 'Formularios', count: '8 inputs' },
	{ color: 'bg-emerald-500', label: 'Feedback', count: '6 widgets' },
	{ color: 'bg-amber-500', label: 'Navegación', count: '5 patrones' },
	{ color: 'bg-rose-500', label: 'Overlays', count: '4 modales' },
	{ color: 'bg-sky-500', label: 'Datos', count: '9 displays' },
	{ color: 'bg-teal-500', label: 'Extensions', count: '7 extras' },
];

/* ── dropzone helper ──────────────────────────────────────── */
function DropzoneDemo() {
	const [files, setFiles] = useState<string[]>([]);
	return (
		<div className='space-y-3'>
			<Dropzone
				accept={{ 'image/*': ['.png', '.jpg', '.jpeg', '.webp'] }}
				maxSize={5 * 1024 * 1024}
				onDrop={(f) => setFiles(f.map((x) => x.name))}
				className='border-2 border-dashed border-border rounded-xl p-6'>
				{(status) => (
					<div className='flex flex-col items-center gap-2 text-center'>
						<svg
							className={[
								'w-10 h-10',
								status === 'accept'
									? 'text-green-500'
									: status === 'reject'
										? 'text-red-500'
										: 'text-muted',
							].join(' ')}
							fill='none'
							viewBox='0 0 24 24'
							stroke='currentColor'
							strokeWidth={1.5}>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								d='M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.338-2.32 3 3 0 0 1 3.112 3.675A4.503 4.503 0 0 1 17.25 19.5H6.75Z'
							/>
						</svg>
						<p className='text-sm font-medium text-on-surface'>
							{status === 'accept'
								? 'Suelta para subir'
								: status === 'reject'
									? 'Archivo no permitido'
									: 'Arrastra imágenes aquí'}
						</p>
						<p className='text-xs text-muted'>
							PNG, JPG, WEBP · máx 5 MB
						</p>
					</div>
				)}
			</Dropzone>
			{files.length > 0 && (
				<ul className='text-xs space-y-1'>
					{files.map((f, i) => (
						<li
							key={i}
							className='flex items-center gap-2 text-on-surface'>
							<span className='w-2 h-2 rounded-full bg-green-500 inline-block' />
							{f}
						</li>
					))}
				</ul>
			)}
		</div>
	);
}

/* ── spotlight actions ────────────────────────────────────── */
const SPOTLIGHT_ACTIONS = [
	{
		id: 'home',
		label: 'Inicio',
		description: 'Ir a la página principal',
		keywords: ['home', 'inicio'],
		leftSection: (
			<svg
				className='w-4 h-4'
				fill='none'
				viewBox='0 0 24 24'
				stroke='currentColor'
				strokeWidth={2}>
				<path
					strokeLinecap='round'
					strokeLinejoin='round'
					d='m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25'
				/>
			</svg>
		),
	},
	{
		id: 'buttons',
		label: 'Componentes / Botones',
		description: 'Navegar a la demo de botones',
		keywords: ['buttons', 'botones'],
	},
	{
		id: 'inputs',
		label: 'Componentes / Inputs',
		description: 'Navegar a la demo de inputs',
		keywords: ['inputs', 'formularios'],
	},
	{
		id: 'docs',
		label: 'Documentación',
		description: 'Abrir la documentación completa',
		keywords: ['docs', 'documentacion', 'help'],
	},
];

export default function ExtensionsPage() {
	const [dateValue, setDateValue] = useState<Date | null>(null);
	const [dateWithTime, setDateWithTime] = useState<Date | null>(null);
	const [monthValue, setMonthValue] = useState<{
		year: number;
		month: number;
	} | null>(null);
	const [rangeValue, setRangeValue] = useState<DateRange>({
		from: null,
		to: null,
	});
	const [inlineDate, setInlineDate] = useState<Date | null>(null);
	const [inlineRange, setInlineRange] = useState<DateRange>({
		from: null,
		to: null,
	});
	const [disabledDate, setDisabledDate] = useState<Date | null>(null);

	return (
		<ModalsProvider>
			<Toaster
				richColors
				position='top-right'
			/>
			<SpotlightProvider
				actions={SPOTLIGHT_ACTIONS}
				nothingFound='Sin resultados'>
				<div>
					<PageBreadcrumb
						items={[
							{ label: 'Inicio', href: '/' },
							{ label: 'Componentes' },
							{ label: 'Extensions' },
						]}
					/>
					<PageHeader
						title='Extensions'
						description='Componentes avanzados: Carousel, DatePickerInput, Dropzone, Spotlight, Modals y Toast.'
						pkg='@kivora/react → Carousel, DatePickerInput, Dropzone, SpotlightProvider, Toaster…'
					/>

					{/* ── Carousel ──────────────────────────────────── */}
					<Section
						title='Carousel'
						description='Carrusel de diapositivas basado en Swiper. Soporta loop, autoplay, múltiples slides por vista y arrastrar libremente.'>
						{/* 1 — Hero con controles + indicadores */}
						<Demo>
							<Label>Controles + indicadores + loop</Label>
							<Carousel
								withControls
								withIndicators
								loop
								style={{ height: 240 }}
								className='rounded-2xl'>
								{HERO_SLIDES.map((s, i) => (
									<CarouselSlide key={i}>
										<div
											className={`h-full bg-linear-to-br ${s.gradient} flex flex-col items-center justify-center gap-3 select-none`}>
											{s.icon}
											<h3 className='text-xl font-bold text-white'>
												{s.title}
											</h3>
											<p className='text-sm text-white/75 text-center max-w-xs px-4'>
												{s.subtitle}
											</p>
										</div>
									</CarouselSlide>
								))}
							</Carousel>
						</Demo>

						{/* 2 — Múltiples slides por vista */}
						<Demo>
							<Label>Múltiples slides por vista (3)</Label>
							<Carousel
								slidesPerView={3}
								slideGap={12}
								withControls
								style={{ height: 120 }}
								className='rounded-xl'>
								{CARD_SLIDES.map((s, i) => (
									<CarouselSlide key={i}>
										<div
											className={`h-full ${s.color} rounded-xl flex flex-col items-center justify-center gap-1 select-none`}>
											<span className='text-base font-bold text-white'>
												{s.label}
											</span>
											<span className='text-xs text-white/70'>
												{s.count}
											</span>
										</div>
									</CarouselSlide>
								))}
							</Carousel>
						</Demo>

						{/* 3 — Autoplay con pausa al hover */}
						<Demo>
							<Label>Autoplay — pausa al hacer hover</Label>
							<Carousel
								autoplay={{
									delay: 2000,
									pauseOnMouseEnter: true,
								}}
								loop
								withControls={false}
								withIndicators
								style={{ height: 160 }}
								className='rounded-2xl'>
								{HERO_SLIDES.map((s, i) => (
									<CarouselSlide key={i}>
										<div
											className={`h-full bg-linear-to-r ${s.gradient} flex items-center justify-center gap-4 select-none px-8`}>
											<div className='text-white/80'>
												{s.icon}
											</div>
											<div>
												<p className='text-lg font-bold text-white'>
													{s.title}
												</p>
												<p className='text-sm text-white/70'>
													{s.subtitle}
												</p>
											</div>
										</div>
									</CarouselSlide>
								))}
							</Carousel>
						</Demo>

						{/* 4 — Arrastrar libremente */}
						<Demo>
							<Label>Arrastrar libremente (dragFree)</Label>
							<Carousel
								dragFree
								slidesPerView='auto'
								slideGap={12}
								withControls={false}
								withIndicators={false}
								style={{ height: 100 }}>
								{CARD_SLIDES.concat(CARD_SLIDES).map((s, i) => (
									<CarouselSlide
										key={i}
										style={{ width: 140 }}>
										<div
											className={`h-full ${s.color} rounded-xl flex flex-col items-center justify-center gap-1 select-none`}>
											<span className='text-sm font-bold text-white'>
												{s.label}
											</span>
											<span className='text-xs text-white/70'>
												{s.count}
											</span>
										</div>
									</CarouselSlide>
								))}
							</Carousel>
						</Demo>
					</Section>

					{/* ── Dates ─────────────────────────────────────── */}

					{/* 1 · DatePickerInput básico */}
					<Section
						title='DatePickerInput'
						description='Selector de fecha single con popover. Soporta clearable, minDate/maxDate, y control de estado.'>
						<Demo>
							<div className='flex flex-wrap gap-6'>
								{/* básico */}
								<DatePickerInput
									label='Fecha simple'
									placeholder='Selecciona una fecha'
									clearable
									value={dateValue}
									onChange={setDateValue}
								/>
								{/* con restricciones min/max */}
								<DatePickerInput
									label='Esta semana (min/max)'
									placeholder='Solo esta semana'
									clearable
									minDate={(() => {
										const d = new Date();
										d.setDate(d.getDate() - d.getDay() + 1);
										return d;
									})()}
									maxDate={(() => {
										const d = new Date();
										d.setDate(d.getDate() - d.getDay() + 7);
										return d;
									})()}
								/>
								{/* captionLayout dropdown */}
								<DatePickerInput
									label='Dropdown de mes/año'
									placeholder='Navega con dropdowns'
									captionLayout='dropdown'
									clearable
								/>
								{/* 2 meses */}
								<DatePickerInput
									label='Dos meses'
									placeholder='Vista de 2 meses'
									numberOfMonths={2}
									clearable
								/>
							</div>
							{dateValue && (
								<p className='mt-3 text-xs text-muted'>
									Fecha seleccionada:{' '}
									<strong className='text-on-surface'>
										{dateValue.toLocaleDateString('es-ES', {
											weekday: 'long',
											year: 'numeric',
											month: 'long',
											day: 'numeric',
										})}
									</strong>
								</p>
							)}
						</Demo>
					</Section>

					{/* 2 · DatePickerInput con tiempo + acciones */}
					<Section
						title='DatePickerInput — con hora y botones'
						description='Activa showTime para combinar fecha y hora. withActions añade botones Today / Clear / Apply.'>
						<Demo>
							<div className='flex flex-wrap gap-6'>
								<DatePickerInput
									label='Fecha + hora'
									placeholder='Selecciona fecha y hora'
									showTime
									timeStepMinutes={15}
									clearable
									value={dateWithTime}
									onChange={setDateWithTime}
								/>
								<DatePickerInput
									label='Con botones de acción'
									placeholder='Confirma con Apply'
									withActions
									clearable
									footerLabels={{
										today: 'Hoy',
										clear: 'Limpiar',
										apply: 'Aplicar',
									}}
								/>
								<DatePickerInput
									label='Fechas deshabilitadas'
									placeholder='Días pares deshabilitados'
									clearable
									isDateDisabled={(d) =>
										d.getDate() % 2 === 0
									}
									value={disabledDate}
									onChange={setDisabledDate}
									description='Solo días impares disponibles'
								/>
							</div>
							{dateWithTime && (
								<p className='mt-3 text-xs text-muted'>
									Fecha + hora:{' '}
									<strong className='text-on-surface'>
										{dateWithTime.toLocaleString('es-ES')}
									</strong>
								</p>
							)}
						</Demo>
					</Section>

					{/* 3 · DateRangePickerInput */}
					<Section
						title='DateRangePickerInput'
						description='Selector de rango con hover preview. Configura numberOfMonths=2 para mostrar dos months y facilitar la selección.'>
						<Demo>
							<div className='flex flex-wrap gap-6'>
								<DateRangePickerInput
									label='Rango de fechas (2 meses)'
									placeholder='Inicio – Fin'
									numberOfMonths={2}
									clearable
									value={rangeValue}
									onChange={setRangeValue}
								/>
								<DateRangePickerInput
									label='Rango mínimo 3 días'
									placeholder='Mín 3 días'
									minRangeDays={3}
									description='El rango debe ser ≥ 3 días'
									clearable
								/>
								<DateRangePickerInput
									label='Rango máximo 7 días'
									placeholder='Máx 1 semana'
									maxRangeDays={7}
									description='El rango debe ser ≤ 7 días'
									clearable
								/>
							</div>
							{(rangeValue.from || rangeValue.to) && (
								<p className='mt-3 text-xs text-muted'>
									Rango:{' '}
									<strong className='text-on-surface'>
										{rangeValue.from?.toLocaleDateString(
											'es-ES',
										)}{' '}
										→{' '}
										{rangeValue.to?.toLocaleDateString(
											'es-ES',
										) ?? '…'}
									</strong>
									{rangeValue.from && rangeValue.to && (
										<span className='ml-2 text-brand'>
											(
											{Math.abs(
												Math.round(
													(rangeValue.to.getTime() -
														rangeValue.from.getTime()) /
														86400000,
												),
											) + 1}{' '}
											días)
										</span>
									)}
								</p>
							)}
						</Demo>
					</Section>

					{/* 4 · InlineCalendar */}
					<Section
						title='InlineCalendar'
						description='Calendario embebido sin popover. Soporta modo single, range y multiple.'>
						<Demo>
							<div className='flex flex-wrap gap-8 items-start'>
								{/* single */}
								<div className='flex flex-col gap-2'>
									<Label>Single</Label>
									<InlineCalendar
										mode='single'
										value={inlineDate}
										onChange={setInlineDate}
										highlightDates={[new Date()]}
									/>
									{inlineDate && (
										<p className='text-xs text-muted'>
											{inlineDate.toLocaleDateString(
												'es-ES',
											)}
										</p>
									)}
								</div>
								{/* range */}
								<div className='flex flex-col gap-2'>
									<Label>Range (2 meses)</Label>
									<InlineCalendar
										mode='range'
										numberOfMonths={2}
										rangeValue={inlineRange}
										onRangeChange={setInlineRange}
									/>
									{(inlineRange.from || inlineRange.to) && (
										<p className='text-xs text-muted'>
											{inlineRange.from?.toLocaleDateString(
												'es-ES',
											)}{' '}
											→{' '}
											{inlineRange.to?.toLocaleDateString(
												'es-ES',
											) ?? '…'}
										</p>
									)}
								</div>
							</div>
						</Demo>
					</Section>

					{/* 5 · MonthPickerInput */}
					<Section
						title='MonthPickerInput'
						description='Selector de mes y año con navegación de años.'>
						<Demo>
							<div className='flex flex-wrap gap-6'>
								<MonthPickerInput
									label='Mes y año'
									placeholder='Selecciona un mes'
									value={monthValue ?? undefined}
									onChange={setMonthValue}
								/>
								<MonthPickerInput
									label='Con error'
									placeholder='Mes requerido'
									error='Debes seleccionar un mes'
								/>
							</div>
							{monthValue && (
								<p className='mt-3 text-xs text-muted'>
									Seleccionado:{' '}
									<strong className='text-on-surface'>
										{new Date(
											monthValue.year,
											monthValue.month,
										).toLocaleDateString('es-ES', {
											month: 'long',
											year: 'numeric',
										})}
									</strong>
								</p>
							)}
						</Demo>
					</Section>

					{/* 6 · TimePicker */}
					<Section
						title='TimePicker'
						description='Selector de hora independiente con pasos configurables.'>
						<Demo>
							<div className='flex flex-wrap gap-8 items-end'>
								<TimePicker
									label='Hora (paso 30 min)'
									stepMinutes={30}
								/>
								<TimePicker
									label='Hora (paso 15 min)'
									stepMinutes={15}
								/>
								<TimePicker
									label='Hora (paso 5 min)'
									stepMinutes={5}
								/>
								<TimePicker
									label='Deshabilitado'
									disabled
									defaultValue={{ hours: 9, minutes: 0 }}
								/>
							</div>
						</Demo>
					</Section>

					{/* ── Dropzone ──────────────────────────────────── */}
					<Section
						title='Dropzone'
						description='Zona de arrastrar y soltar archivos con validación de tipo y tamaño.'>
						<Demo>
							<DropzoneDemo />
						</Demo>
					</Section>

					{/* ── Spotlight ─────────────────────────────────── */}
					<Section
						title='SpotlightProvider'
						description='Paleta de comandos Cmd+K para búsqueda y navegación rápida.'>
						<Demo>
							<div className='flex flex-wrap items-center gap-4'>
								<button
									type='button'
									className='px-4 py-2 text-sm rounded-lg bg-brand text-white hover:bg-brand/90 transition-colors'
									onClick={() => spotlight.open()}>
									Abrir Spotlight
								</button>
								<div className='flex items-center gap-2 px-3 py-1.5 border border-border rounded-lg text-xs text-muted bg-surface'>
									<span>⌘K</span>
									<span className='text-border'>·</span>
									<span>Ctrl+K en Windows</span>
								</div>
							</div>
							<p className='mt-2 text-xs text-muted'>
								Pulsa el atajo o el botón para abrir el
								spotlight con acciones de demo.
							</p>
						</Demo>
					</Section>

					{/* ── Modals ────────────────────────────────────── */}
					<Section
						title='ModalsProvider + modals'
						description='Sistema imperativo de modales: abre, cierra y confirma desde cualquier lugar.'>
						<Demo>
							<div className='flex flex-wrap gap-3'>
								<button
									type='button'
									className='px-4 py-2 text-sm rounded-lg bg-brand text-white hover:bg-brand/90 transition-colors'
									onClick={() =>
										modals.open({
											title: 'Modal de información',
											children: (
												<div className='py-2'>
													<p className='text-sm text-on-surface mb-4'>
														Este modal fue abierto
														de forma imperativa sin
														estado local.
													</p>
													<button
														type='button'
														className='px-3 py-1.5 text-sm rounded-lg bg-brand text-white hover:bg-brand/90'
														onClick={() =>
															modals.closeAll()
														}>
														Cerrar
													</button>
												</div>
											),
										})
									}>
									Abrir modal
								</button>

								<button
									type='button'
									className='px-4 py-2 text-sm rounded-lg border border-border text-on-surface hover:bg-muted/20 transition-colors'
									onClick={() =>
										modals.openConfirmModal({
											title: '¿Confirmar acción?',
											children: (
												<p className='text-sm text-muted py-2'>
													Esta acción no se puede
													deshacer.
												</p>
											),
											labels: {
												confirm: 'Confirmar',
												cancel: 'Cancelar',
											},
											onConfirm: () =>
												toast.success(
													'Acción ejecutada correctamente.',
												),
										})
									}>
									Confirmar modal
								</button>
							</div>
						</Demo>
					</Section>

					{/* ── Toast (Sonner) ──────────────────────────── */}
					<Section
						title='Toaster + toast'
						description='Notificaciones via Sonner. Monta <Toaster /> una vez y dispara toast() desde cualquier lugar.'>
						<Demo>
							<div className='flex flex-wrap gap-3'>
								<button
									type='button'
									className='px-4 py-2 text-sm rounded-lg bg-brand text-white hover:bg-brand/90 transition-colors'
									onClick={() =>
										toast.success(
											'¡Operación completada!',
											{
												description:
													'Los cambios se guardaron correctamente.',
											},
										)
									}>
									Éxito
								</button>
								<button
									type='button'
									className='px-4 py-2 text-sm rounded-lg border border-border text-on-surface hover:bg-muted/20 transition-colors'
									onClick={() =>
										toast.info('Información', {
											description:
												'El proceso está en marcha.',
										})
									}>
									Info
								</button>
								<button
									type='button'
									className='px-4 py-2 text-sm rounded-lg border border-border text-on-surface hover:bg-muted/20 transition-colors'
									onClick={() =>
										toast.warning('Atención', {
											description:
												'Revisa los campos del formulario.',
										})
									}>
									Advertencia
								</button>
								<button
									type='button'
									className='px-4 py-2 text-sm rounded-lg border border-border text-on-surface hover:bg-muted/20 transition-colors'
									onClick={() =>
										toast.error('Error', {
											description:
												'No se pudo conectar con el servidor.',
										})
									}>
									Error
								</button>
								<button
									type='button'
									className='px-4 py-2 text-sm rounded-lg border border-border text-on-surface hover:bg-muted/20 transition-colors'
									onClick={() => {
										const id =
											toast.loading('Subiendo archivo…');
										setTimeout(
											() =>
												toast.success(
													'¡Subida completada!',
													{ id },
												),
											2000,
										);
									}}>
									Loading → Success
								</button>
							</div>
						</Demo>
					</Section>

					{/* ── API ───────────────────────────────────────── */}
					<Section title='API — Carousel'>
						<PropTable
							rows={[
								{
									prop: 'slidesPerView',
									type: "number | 'auto'",
									default: '1',
									description:
										'Número de slides visibles a la vez.',
								},
								{
									prop: 'slideGap',
									type: 'number',
									default: '16',
									description:
										'Separación entre diapositivas (px).',
								},
								{
									prop: 'loop',
									type: 'boolean',
									default: 'false',
									description: 'Bucle infinito.',
								},
								{
									prop: 'dragFree',
									type: 'boolean',
									default: 'false',
									description:
										'Arrastrar libremente sin snapping.',
								},
								{
									prop: 'withControls',
									type: 'boolean',
									default: 'true',
									description:
										'Mostrar flechas de navegación.',
								},
								{
									prop: 'withIndicators',
									type: 'boolean',
									default: 'false',
									description: 'Mostrar puntos indicadores.',
								},
								{
									prop: 'autoplay',
									type: 'boolean | { delay: number; pauseOnMouseEnter?: boolean }',
									default: 'false',
									description:
										'Autoplay. true usa delay 3000 ms.',
								},
								{
									prop: 'initialSlide',
									type: 'number',
									default: '0',
									description:
										'Índice de diapositiva inicial.',
								},
								{
									prop: 'slidesToScroll',
									type: 'number',
									default: '1',
									description: 'Slides que avanza cada clic.',
								},
								{
									prop: 'orientation',
									type: "'horizontal' | 'vertical'",
									default: "'horizontal'",
									description: 'Dirección del carrusel.',
								},
								{
									prop: 'onSlideChange',
									type: '(index: number) => void',
									description:
										'Callback al cambiar de diapositiva.',
								},
								{
									prop: 'swiperProps',
									type: 'Partial<SwiperProps>',
									description:
										'Escape hatch: props extra pasadas a <Swiper>.',
								},
							]}
						/>
					</Section>

					<Section title='API — Dropzone'>
						<PropTable
							rows={[
								{
									prop: 'onDrop',
									type: '(files: File[]) => void',
									description:
										'Callback al soltar archivos aceptados.',
								},
								{
									prop: 'accept',
									type: 'Record<string, string[]> | string[]',
									description: 'Tipos MIME aceptados.',
								},
								{
									prop: 'multiple',
									type: 'boolean',
									default: 'true',
									description: 'Permitir múltiples archivos.',
								},
								{
									prop: 'maxSize',
									type: 'number',
									description:
										'Tamaño máximo por archivo (bytes).',
								},
								{
									prop: 'disabled',
									type: 'boolean',
									default: 'false',
									description: 'Desactivar la zona.',
								},
								{
									prop: 'loading',
									type: 'boolean',
									default: 'false',
									description: 'Estado de carga.',
								},
								{
									prop: 'children',
									type: 'ReactNode | ((status: DropzoneStatus) => ReactNode)',
									description:
										'Contenido o render-prop con estado actual.',
								},
							]}
						/>
					</Section>
				</div>
			</SpotlightProvider>
		</ModalsProvider>
	);
}
