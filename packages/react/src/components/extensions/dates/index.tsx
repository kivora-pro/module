'use client';

/**
 * @kivora/react – DatePicker extension
 *
 * Componentes de selección de fecha de calidad design-system.
 * Motor: react-day-picker v9 | Formato: date-fns | Estilos: Tailwind + tokens Kivora
 *
 * Exports:
 *   DatePickerInput   – selección single con input + popover
 *   DateRangePickerInput – selección de rango con input + popover
 *   MonthPickerInput  – selección de mes/año
 *   InlineCalendar    – calendario embebido (sin popover)
 *   DatePicker        – alias de DatePickerInput
 *   TimePicker        – selector de hora independiente
 *
 * Tipos:
 *   DateRange, DatePickerInputProps, DateRangePickerInputProps,
 *   MonthPickerInputProps, InlineCalendarProps, TimeValue
 */

import {
	format as dateFnsFormat,
	differenceInCalendarDays,
	isSameDay,
	isValid,
} from 'date-fns';
import React, {
	useCallback,
	useEffect,
	useId,
	useMemo,
	useRef,
	useState,
} from 'react';
import { DayPicker, type Matcher } from 'react-day-picker';
import {
	InputWrapper,
	type InputSize,
	type InputWrapperProps,
} from '../../inputs/Input';

/**
 * Layout del caption del calendario. En react-day-picker v9 es una string union.
 * @see https://daypicker.dev/api/type-aliases/CaptionLayout
 */
export type CaptionLayout =
	| 'label'
	| 'dropdown'
	| 'dropdown-months'
	| 'dropdown-years';

// ─────────────────────────────────────────────────────────────────────────────
// ── TIPOS PÚBLICOS
// ─────────────────────────────────────────────────────────────────────────────

export interface DateRange {
	from: Date | null;
	to: Date | null;
}

export interface TimeValue {
	hours: number;
	minutes: number;
}

/** Mapa de classNames para sobreescribir slots del calendario */
export interface DatePickerClassNames {
	root?: string;
	trigger?: string;
	popover?: string;
	calendar?: string;
	navButton?: string;
	day?: string;
	daySelected?: string;
	dayToday?: string;
	dayDisabled?: string;
	dayRangeStart?: string;
	dayRangeEnd?: string;
	dayRangeMiddle?: string;
	footer?: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// ── UTILIDADES INTERNAS
// ─────────────────────────────────────────────────────────────────────────────

function cn(...classes: (string | false | null | undefined)[]): string {
	return classes.filter(Boolean).join(' ');
}

function formatDate(date: Date | null | undefined, fmt = 'dd/MM/yyyy'): string {
	if (!date || !isValid(date)) return '';
	return dateFnsFormat(date, fmt);
}

function formatRange(
	range: DateRange | null | undefined,
	fmt = 'dd/MM/yyyy',
	sep = ' – ',
): string {
	if (!range) return '';
	const parts: string[] = [];
	if (range.from) parts.push(formatDate(range.from, fmt));
	if (range.to) parts.push(formatDate(range.to, fmt));
	return parts.join(sep);
}

function stripTime(date: Date): Date {
	return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function buildDisabledMatcher(opts: {
	minDate?: Date;
	maxDate?: Date;
	disabledDates?: Date[];
	enabledDates?: Date[];
	isDateDisabled?: (d: Date) => boolean;
}): (date: Date) => boolean {
	const {
		minDate,
		maxDate,
		disabledDates = [],
		enabledDates,
		isDateDisabled,
	} = opts;
	return (date: Date) => {
		if (enabledDates && enabledDates.length > 0) {
			return !enabledDates.some((d) => isSameDay(d, date));
		}
		if (minDate && date < stripTime(minDate)) return true;
		if (maxDate && date > stripTime(maxDate)) return true;
		if (disabledDates.some((d) => isSameDay(d, date))) return true;
		if (isDateDisabled?.(date)) return true;
		return false;
	};
}

function normalizeRange(from: Date | null, to: Date | null): DateRange {
	if (!from || !to) return { from, to };
	return from <= to ? { from, to } : { from: to, to: from };
}

// ─────────────────────────────────────────────────────────────────────────────
// ── ICONS (inline SVG – sin dependencia de iconos)
// ─────────────────────────────────────────────────────────────────────────────

function IconCalendar({ className }: { className?: string }) {
	return (
		<svg
			className={className}
			viewBox='0 0 24 24'
			fill='none'
			stroke='currentColor'
			strokeWidth={2}
			strokeLinecap='round'
			strokeLinejoin='round'
			aria-hidden='true'>
			<rect
				x='3'
				y='4'
				width='18'
				height='18'
				rx='2'
			/>
			<line
				x1='16'
				y1='2'
				x2='16'
				y2='6'
			/>
			<line
				x1='8'
				y1='2'
				x2='8'
				y2='6'
			/>
			<line
				x1='3'
				y1='10'
				x2='21'
				y2='10'
			/>
		</svg>
	);
}
function IconX({ className }: { className?: string }) {
	return (
		<svg
			className={className}
			viewBox='0 0 24 24'
			fill='none'
			stroke='currentColor'
			strokeWidth={2}
			strokeLinecap='round'
			strokeLinejoin='round'
			aria-hidden='true'>
			<line
				x1='18'
				y1='6'
				x2='6'
				y2='18'
			/>
			<line
				x1='6'
				y1='6'
				x2='18'
				y2='18'
			/>
		</svg>
	);
}
function IconChevronLeft({ className }: { className?: string }) {
	return (
		<svg
			className={className}
			viewBox='0 0 24 24'
			fill='none'
			stroke='currentColor'
			strokeWidth={2}
			strokeLinecap='round'
			strokeLinejoin='round'
			aria-hidden='true'>
			<polyline points='15 18 9 12 15 6' />
		</svg>
	);
}
function IconChevronRight({ className }: { className?: string }) {
	return (
		<svg
			className={className}
			viewBox='0 0 24 24'
			fill='none'
			stroke='currentColor'
			strokeWidth={2}
			strokeLinecap='round'
			strokeLinejoin='round'
			aria-hidden='true'>
			<polyline points='9 18 15 12 9 6' />
		</svg>
	);
}
function IconClock({ className }: { className?: string }) {
	return (
		<svg
			className={className}
			viewBox='0 0 24 24'
			fill='none'
			stroke='currentColor'
			strokeWidth={2}
			strokeLinecap='round'
			strokeLinejoin='round'
			aria-hidden='true'>
			<circle
				cx='12'
				cy='12'
				r='10'
			/>
			<polyline points='12 6 12 12 16 14' />
		</svg>
	);
}

// ─────────────────────────────────────────────────────────────────────────────
// ── ESTILOS CENTRALIZADOS (react-day-picker classNames)
// ─────────────────────────────────────────────────────────────────────────────

const RDP_CLASS_NAMES = {
	root: 'kivora-rdp',
	months: 'flex gap-6',
	month: 'w-[252px]',

	// ── Caption ──────────────────────────────────────────────────────────────
	// month_caption es el header de cada mes: contiene caption_label (o dropdowns)
	// y nav (botones prev/next). La nav está en el flujo normal para evitar overflow.
	month_caption: 'relative flex h-10 items-center justify-between mb-1',
	caption_label:
		'flex-1 text-center text-sm font-semibold text-on-surface select-none',
	// nav contiene los dos botones prev/next; es hermano del label/dropdowns
	nav: 'absolute inset-x-0 top-0 flex h-10 items-center justify-between pointer-events-none',
	button_previous: cn(
		'pointer-events-auto flex h-7 w-7 items-center justify-center rounded-md',
		'border border-border bg-surface text-on-surface',
		'hover:bg-muted/20 active:scale-95 transition-all',
		'disabled:opacity-30 disabled:pointer-events-none',
		'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand',
	),
	button_next: cn(
		'pointer-events-auto flex h-7 w-7 items-center justify-center rounded-md',
		'border border-border bg-surface text-on-surface',
		'hover:bg-muted/20 active:scale-95 transition-all',
		'disabled:opacity-30 disabled:pointer-events-none',
		'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand',
	),

	// ── Dropdowns (captionLayout="dropdown") ─────────────────────────────────
	// mx-8 reserva espacio para los botones prev/next (≈28px cada lado)
	dropdowns: 'flex-1 mx-8 flex items-center justify-center gap-1',
	dropdown_root: 'relative',
	dropdown: cn(
		'bg-surface border border-border rounded-md',
		'pl-2.5 pr-1 py-1 text-sm text-on-surface',
		'focus:outline-none focus:ring-2 focus:ring-brand cursor-pointer',
	),
	dropdown_month: 'w-[7.5rem]',
	dropdown_year: 'w-[5rem]',

	// ── Grid — NO usar flex en tr; dejar que la tabla maneje el layout ────────
	month_grid: 'w-full table-fixed border-collapse',
	weekdays: '', // <thead><tr>
	weekday:
		'w-9 h-8 pb-1 text-[0.7rem] font-medium text-muted text-center align-middle select-none',
	week: '', // <tbody><tr>
	day: 'p-[3px] text-center align-middle', // <td>
	day_button: cn(
		'mx-auto flex h-9 w-9 items-center justify-center rounded-md text-sm',
		'transition-colors hover:bg-muted/20 text-on-surface',
		'disabled:opacity-30 disabled:pointer-events-none disabled:cursor-not-allowed',
		'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-1',
	),

	// ── Estados día ──────────────────────────────────────────────────────────
	selected:
		'[&>button]:!bg-brand [&>button]:!text-white [&>button]:hover:!bg-brand/90',
	// today: anillo sutil, sin borde que pise el bg de selected
	today: '[&>button]:font-bold [&>button]:text-brand [&>button]:ring-1 [&>button]:ring-brand [&>button]:ring-offset-0',
	outside: '[&>button]:!text-muted [&>button]:!opacity-40',
	disabled: '[&>button]:!opacity-25 [&>button]:!pointer-events-none',
	hidden: 'invisible',

	// ── Rango ─────────────────────────────────────────────────────────────────
	// El bg se aplica al <td> entero para crear la banda continua
	range_start: cn(
		'bg-gradient-to-r from-transparent to-brand/15',
		'[&>button]:!bg-brand [&>button]:!text-white [&>button]:!rounded-md',
	),
	range_end: cn(
		'bg-gradient-to-l from-transparent to-brand/15',
		'[&>button]:!bg-brand [&>button]:!text-white [&>button]:!rounded-md',
	),
	range_middle: cn(
		'bg-brand/15',
		'[&>button]:!rounded-none [&>button]:hover:!bg-brand/25',
	),
} satisfies Partial<Record<string, string>>;

// ─────────────────────────────────────────────────────────────────────────────
// ── NAV BUTTONS (override de react-day-picker)
// ─────────────────────────────────────────────────────────────────────────────

function NavPrevButton(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
	return (
		<button
			{...props}
			aria-label='Previous month'
			className={RDP_CLASS_NAMES.button_previous}>
			<IconChevronLeft className='h-4 w-4' />
		</button>
	);
}
function NavNextButton(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
	return (
		<button
			{...props}
			aria-label='Next month'
			className={RDP_CLASS_NAMES.button_next}>
			<IconChevronRight className='h-4 w-4' />
		</button>
	);
}

// Dropdown con ancho fijo para evitar que el select cambie de tamaño al seleccionar
// un mes con nombre más corto o largo.
function CustomDropdown(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
	const isMonth = props.name === 'months';
	return (
		<select
			{...props}
			className={cn(
				RDP_CLASS_NAMES.dropdown,
				isMonth
					? RDP_CLASS_NAMES.dropdown_month
					: RDP_CLASS_NAMES.dropdown_year,
			)}
		/>
	);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const RDP_COMPONENTS: any = {
	PreviousMonthButton: NavPrevButton,
	NextMonthButton: NavNextButton,
	Dropdown: CustomDropdown,
};

// Rango de años disponibles para los dropdowns de mes/año
const _now = new Date();
const DROPDOWN_START = new Date(_now.getFullYear() - 100, 0, 1);
const DROPDOWN_END = new Date(_now.getFullYear() + 10, 11, 31);

// ─────────────────────────────────────────────────────────────────────────────
// ── HOOK: usePopover
// ─────────────────────────────────────────────────────────────────────────────

function usePopover(opts: {
	open?: boolean;
	defaultOpen?: boolean;
	onOpenChange?: (open: boolean) => void;
	disabled?: boolean;
}) {
	const isControlled = opts.open !== undefined;
	const [internal, setInternal] = useState(opts.defaultOpen ?? false);
	const open = isControlled ? opts.open! : internal;

	const setOpen = useCallback(
		(next: boolean) => {
			if (opts.disabled) return;
			if (!isControlled) setInternal(next);
			opts.onOpenChange?.(next);
		},
		[isControlled, opts.disabled, opts.onOpenChange],
	);

	return {
		open,
		toggle: () => setOpen(!open),
		close: () => setOpen(false),
		openIt: () => setOpen(true),
	};
}

// ─────────────────────────────────────────────────────────────────────────────
// ── POPOVER CONTAINER (gestiona click-fuera, Escape, foco)
// ─────────────────────────────────────────────────────────────────────────────

interface PopoverContainerProps {
	open: boolean;
	onClose: () => void;
	triggerRef: React.RefObject<HTMLElement | null>;
	children: React.ReactNode;
	className?: string;
	id?: string;
	ariaLabel?: string;
}

function PopoverContainer({
	open,
	onClose,
	triggerRef,
	children,
	className,
	id,
	ariaLabel,
}: PopoverContainerProps) {
	const ref = useRef<HTMLDivElement>(null);

	// Click fuera
	useEffect(() => {
		if (!open) return;
		const handler = (e: MouseEvent | TouchEvent) => {
			const target = e.target as Node;
			if (
				!ref.current?.contains(target) &&
				!triggerRef.current?.contains(target)
			) {
				onClose();
			}
		};
		document.addEventListener('mousedown', handler);
		document.addEventListener('touchstart', handler);
		return () => {
			document.removeEventListener('mousedown', handler);
			document.removeEventListener('touchstart', handler);
		};
	}, [open, onClose, triggerRef]);

	// Escape
	useEffect(() => {
		if (!open) return;
		const handler = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				onClose();
				// Devolver foco al trigger
				const t =
					triggerRef.current?.querySelector<HTMLElement>(
						'[tabindex], button',
					);
				(t ?? (triggerRef.current as HTMLElement | null))?.focus();
			}
		};
		document.addEventListener('keydown', handler);
		return () => document.removeEventListener('keydown', handler);
	}, [open, onClose, triggerRef]);

	// Mover foco dentro al abrir
	useEffect(() => {
		if (open && ref.current) {
			const first = ref.current.querySelector<HTMLElement>(
				'button:not([disabled]), [tabindex="0"]',
			);
			first?.focus();
		}
	}, [open]);

	if (!open) return null;

	return (
		<div
			ref={ref}
			id={id}
			role='dialog'
			aria-modal='true'
			aria-label={ariaLabel}
			className={cn(
				'absolute left-0 top-full z-50 mt-1',
				'rounded-xl border border-border bg-surface shadow-xl',
				'p-3 transition-all',
				className,
			)}>
			{children}
		</div>
	);
}

// ─────────────────────────────────────────────────────────────────────────────
// ── TRIGGER (botón del input del datepicker)
// ─────────────────────────────────────────────────────────────────────────────

interface TriggerProps {
	id?: string;
	value: string;
	placeholder: string;
	disabled?: boolean;
	readOnly?: boolean;
	clearable?: boolean;
	hasError?: boolean;
	open: boolean;
	popoverId?: string;
	onToggle: () => void;
	onClear: () => void;
	className?: string;
	ariaLabel?: string;
}

const Trigger = React.forwardRef<HTMLDivElement, TriggerProps>(function Trigger(
	{
		id,
		value,
		placeholder,
		disabled,
		readOnly,
		clearable,
		hasError,
		open,
		popoverId,
		onToggle,
		onClear,
		className,
		ariaLabel,
	},
	ref,
) {
	return (
		<div
			ref={ref}
			id={id}
			role='button'
			tabIndex={disabled ? -1 : 0}
			aria-haspopup='dialog'
			aria-expanded={open}
			aria-controls={open ? popoverId : undefined}
			aria-label={ariaLabel}
			aria-disabled={disabled}
			aria-invalid={hasError}
			onClick={() => !readOnly && !disabled && onToggle()}
			onKeyDown={(e) => {
				if (e.key === 'Enter' || e.key === ' ') {
					e.preventDefault();
					if (!readOnly && !disabled) onToggle();
				}
			}}
			className={cn(
				'flex h-9 w-full items-center gap-2 rounded-md border bg-surface px-3 text-sm',
				'cursor-pointer transition-colors select-none',
				'hover:border-brand/60',
				'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-1',
				hasError ? 'border-red-500' : 'border-border',
				disabled
					? 'pointer-events-none opacity-50 cursor-not-allowed'
					: '',
				className,
			)}>
			<IconCalendar className='h-4 w-4 shrink-0 text-muted' />
			<span
				className={cn(
					'flex-1 truncate text-left',
					!value && 'text-muted',
				)}>
				{value || placeholder}
			</span>
			{clearable && value && !readOnly && !disabled && (
				<button
					type='button'
					tabIndex={-1}
					aria-label='Clear'
					onClick={(e) => {
						e.stopPropagation();
						onClear();
					}}
					className='flex h-4 w-4 shrink-0 items-center justify-center rounded text-muted hover:text-on-surface transition-colors'>
					<IconX className='h-3.5 w-3.5' />
				</button>
			)}
		</div>
	);
});

// ─────────────────────────────────────────────────────────────────────────────
// ── CALENDAR FOOTER
// ─────────────────────────────────────────────────────────────────────────────

interface CalendarFooterProps {
	onToday?: () => void;
	onClear?: () => void;
	onApply?: () => void;
	labels?: { today?: string; clear?: string; apply?: string };
}

function CalendarFooter({
	onToday,
	onClear,
	onApply,
	labels,
}: CalendarFooterProps) {
	return (
		<div className='mt-2 flex items-center justify-end gap-2 border-t border-border pt-2'>
			{onToday && (
				<button
					type='button'
					onClick={onToday}
					className='rounded border border-border bg-surface px-2.5 py-1.5 text-xs text-on-surface transition-colors hover:bg-muted/20'>
					{labels?.today ?? 'Today'}
				</button>
			)}
			{onClear && (
				<button
					type='button'
					onClick={onClear}
					className='rounded border border-border bg-surface px-2.5 py-1.5 text-xs text-on-surface transition-colors hover:bg-muted/20'>
					{labels?.clear ?? 'Clear'}
				</button>
			)}
			{onApply && (
				<button
					type='button'
					onClick={onApply}
					className='rounded bg-brand px-2.5 py-1.5 text-xs text-white transition-colors hover:bg-brand/90'>
					{labels?.apply ?? 'Apply'}
				</button>
			)}
		</div>
	);
}

// ─────────────────────────────────────────────────────────────────────────────
// ── TimePicker
// ─────────────────────────────────────────────────────────────────────────────

export interface TimePickerProps {
	value?: TimeValue;
	defaultValue?: TimeValue;
	onChange?: (v: TimeValue) => void;
	stepMinutes?: number;
	disabled?: boolean;
	label?: string;
	className?: string;
}

export function TimePicker({
	value: controlled,
	defaultValue = { hours: 0, minutes: 0 },
	onChange,
	stepMinutes = 30,
	disabled = false,
	label = 'Time',
	className,
}: TimePickerProps) {
	const [internal, setInternal] = useState<TimeValue>(defaultValue);
	const isControlled = controlled !== undefined;
	const v = isControlled ? controlled! : internal;
	const id = useId();

	const update = (next: TimeValue) => {
		if (!isControlled) setInternal(next);
		onChange?.(next);
	};

	const minuteOpts: number[] = [];
	for (let m = 0; m < 60; m += stepMinutes) minuteOpts.push(m);

	return (
		<div
			role='group'
			aria-label={label}
			className={cn(
				'flex items-center gap-2',
				disabled && 'pointer-events-none opacity-50',
				className,
			)}>
			<IconClock className='h-4 w-4 shrink-0 text-muted' />
			{/* Horas */}
			<div className='flex flex-col items-center gap-0.5'>
				<label
					htmlFor={`${id}-h`}
					className='text-[10px] text-muted'>
					HH
				</label>
				<input
					id={`${id}-h`}
					type='number'
					min={0}
					max={23}
					value={String(v.hours).padStart(2, '0')}
					onChange={(e) => {
						const n = parseInt(e.target.value, 10);
						if (!isNaN(n) && n >= 0 && n <= 23)
							update({ ...v, hours: n });
					}}
					className='h-8 w-14 rounded border border-border bg-surface text-center text-sm text-on-surface [appearance:textfield] focus:outline-none focus:ring-2 focus:ring-brand [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none'
				/>
			</div>
			<span className='pb-px font-semibold text-on-surface'>:</span>
			{/* Minutos */}
			<div className='flex flex-col items-center gap-0.5'>
				<label
					htmlFor={`${id}-m`}
					className='text-[10px] text-muted'>
					MM
				</label>
				<select
					id={`${id}-m`}
					value={v.minutes}
					onChange={(e) =>
						update({ ...v, minutes: parseInt(e.target.value, 10) })
					}
					className='h-8 w-16 cursor-pointer appearance-none rounded border border-border bg-surface text-center text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-brand'>
					{minuteOpts.map((m) => (
						<option
							key={m}
							value={m}>
							{String(m).padStart(2, '0')}
						</option>
					))}
				</select>
			</div>
			<span
				aria-live='polite'
				aria-atomic='true'
				className='font-mono tabular-nums text-sm text-on-surface'>
				{`${String(v.hours).padStart(2, '0')}:${String(v.minutes).padStart(2, '0')}`}
			</span>
		</div>
	);
}

// ─────────────────────────────────────────────────────────────────────────────
// ── DatePickerInput
// ─────────────────────────────────────────────────────────────────────────────

export interface DatePickerInputProps extends Pick<
	InputWrapperProps,
	'label' | 'description' | 'error' | 'required' | 'withAsterisk'
> {
	// Value
	value?: Date | null;
	defaultValue?: Date | null;
	onChange?: (date: Date | null) => void;
	// Constraints
	minDate?: Date;
	maxDate?: Date;
	disabledDates?: Date[];
	enabledDates?: Date[];
	isDateDisabled?: (date: Date) => boolean;
	// Highlight / modifiers
	highlightDates?: Date[];
	modifiers?: Record<string, Matcher | Matcher[]>;
	modifiersClassNames?: Record<string, string>;
	// Display
	numberOfMonths?: 1 | 2 | 3;
	weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
	showOutsideDays?: boolean;
	fixedWeeks?: boolean;
	captionLayout?: CaptionLayout;
	disableNavigation?: boolean;
	// Format / input
	format?: string;
	placeholder?: string;
	clearable?: boolean;
	readOnly?: boolean;
	disabled?: boolean;
	size?: InputSize;
	id?: string;
	// Popover
	open?: boolean;
	defaultOpen?: boolean;
	onOpenChange?: (open: boolean) => void;
	// Footer acciones
	withActions?: boolean;
	footerLabels?: { today?: string; clear?: string; apply?: string };
	// Time
	showTime?: boolean;
	timeStepMinutes?: number;
	// Callbacks
	onMonthChange?: (month: Date) => void;
	// Classnames override
	classNames?: DatePickerClassNames;
	'aria-label'?: string;
}

export function DatePickerInput({
	// value
	value: controlledValue,
	defaultValue,
	onChange,
	// constraints
	minDate,
	maxDate,
	disabledDates,
	enabledDates,
	isDateDisabled,
	// highlight
	highlightDates,
	modifiers: extraModifiers,
	modifiersClassNames: extraModClassNames,
	// display
	numberOfMonths = 1,
	weekStartsOn = 1,
	showOutsideDays = false,
	fixedWeeks = false,
	captionLayout = 'label',
	disableNavigation = false,
	// format / input
	format = 'dd/MM/yyyy',
	placeholder = 'Pick a date',
	clearable = true,
	readOnly = false,
	disabled = false,
	id: idProp,
	size: _size,
	// wrapper
	label,
	description,
	error,
	required,
	withAsterisk,
	// popover
	open: controlledOpen,
	defaultOpen = false,
	onOpenChange,
	// footer
	withActions = false,
	footerLabels,
	// time
	showTime = false,
	timeStepMinutes = 30,
	// callbacks
	onMonthChange,
	// classNames
	classNames,
	'aria-label': ariaLabel,
}: DatePickerInputProps) {
	const generatedId = useId();
	const id = idProp ?? generatedId;
	const popoverId = `${id}-popover`;

	// State
	const isControlled = controlledValue !== undefined;
	const [internal, setInternal] = useState<Date | null>(defaultValue ?? null);
	const value = isControlled ? (controlledValue ?? null) : internal;
	const [pending, setPending] = useState<Date | null>(null);
	const [timeValue, setTimeValue] = useState<TimeValue>({
		hours: 0,
		minutes: 0,
	});

	const setValue = useCallback(
		(next: Date | null) => {
			if (!isControlled) setInternal(next);
			onChange?.(next);
		},
		[isControlled, onChange],
	);

	// Popover
	const { open, toggle, close } = usePopover({
		open: controlledOpen,
		defaultOpen,
		onOpenChange,
		disabled,
	});

	const triggerRef = useRef<HTMLDivElement>(null);

	// Matchers
	const disabledMatcher = useMemo(
		() =>
			buildDisabledMatcher({
				minDate,
				maxDate,
				disabledDates,
				enabledDates,
				isDateDisabled,
			}) as unknown as Matcher,
		[minDate, maxDate, disabledDates, enabledDates, isDateDisabled],
	);

	const modifiers = useMemo(() => {
		const m: Record<string, Matcher | Matcher[]> = {};
		if (highlightDates?.length)
			m['kivora_highlighted'] = highlightDates as unknown as Matcher[];
		if (extraModifiers) Object.assign(m, extraModifiers);
		return m;
	}, [highlightDates, extraModifiers]);

	const modifiersClassNames = useMemo(() => {
		const base: Record<string, string> = {
			kivora_highlighted:
				'[&>button]:ring-2 [&>button]:ring-amber-400/70 [&>button]:bg-amber-50/80',
		};
		if (extraModClassNames) Object.assign(base, extraModClassNames);
		return base;
	}, [extraModClassNames]);

	// Valor mostrado: pending si withActions y está abierto
	const displayDate = withActions && open ? pending : value;
	const displayValue = displayDate
		? showTime
			? `${formatDate(displayDate, format)} ${String(timeValue.hours).padStart(2, '0')}:${String(timeValue.minutes).padStart(2, '0')}`
			: formatDate(displayDate, format)
		: '';

	// Sincronizar pending al abrir
	useEffect(() => {
		if (open) setPending(value);
	}, [open]);

	// Selección de día
	const handleSelect = (date: Date | undefined) => {
		const d = date ?? null;
		if (!d) return;
		const final = showTime
			? new Date(
					d.getFullYear(),
					d.getMonth(),
					d.getDate(),
					timeValue.hours,
					timeValue.minutes,
				)
			: d;
		if (withActions) {
			setPending(final);
		} else {
			setValue(final);
			if (!showTime) close();
		}
	};

	// Footer actions
	const handleToday = () => {
		const today = new Date();
		if (withActions) setPending(today);
		else {
			setValue(today);
			close();
		}
	};
	const handleClear = () => {
		setValue(null);
		setPending(null);
		if (!withActions) close();
	};
	const handleApply = () => {
		setValue(pending);
		close();
	};

	return (
		<InputWrapper
			label={label}
			description={description}
			error={error}
			required={required}
			withAsterisk={withAsterisk}
			id={id}
			className={classNames?.root}>
			<div className='relative'>
				<Trigger
					ref={triggerRef}
					id={id}
					popoverId={popoverId}
					value={displayValue}
					placeholder={placeholder}
					disabled={disabled || readOnly}
					readOnly={readOnly}
					clearable={clearable}
					hasError={!!error}
					open={open}
					onToggle={toggle}
					onClear={handleClear}
					ariaLabel={
						ariaLabel ??
						(typeof label === 'string' ? label : undefined)
					}
					className={classNames?.trigger}
				/>

				<PopoverContainer
					open={open}
					onClose={close}
					triggerRef={triggerRef}
					id={popoverId}
					ariaLabel={`${typeof label === 'string' ? label : 'Date'} picker`}
					className={classNames?.popover}>
					<DayPicker
						mode='single'
						selected={displayDate ?? undefined}
						onSelect={handleSelect}
						defaultMonth={value ?? undefined}
						numberOfMonths={numberOfMonths}
						weekStartsOn={weekStartsOn}
						showOutsideDays={showOutsideDays}
						fixedWeeks={fixedWeeks}
						captionLayout={captionLayout}
						startMonth={DROPDOWN_START}
						endMonth={DROPDOWN_END}
						disabled={disabledMatcher}
						modifiers={modifiers}
						modifiersClassNames={modifiersClassNames}
						disableNavigation={disableNavigation}
						onMonthChange={onMonthChange}
						classNames={RDP_CLASS_NAMES}
						components={RDP_COMPONENTS}
					/>

					{showTime && (
						<div className='mt-2 border-t border-border pt-2'>
							<TimePicker
								value={timeValue}
								onChange={(t) => {
									setTimeValue(t);
									const base =
										(withActions ? pending : value) ??
										new Date();
									const updated = new Date(
										base.getFullYear(),
										base.getMonth(),
										base.getDate(),
										t.hours,
										t.minutes,
									);
									if (withActions) setPending(updated);
									else setValue(updated);
								}}
								stepMinutes={timeStepMinutes}
							/>
						</div>
					)}

					{withActions && (
						<CalendarFooter
							onToday={handleToday}
							onClear={handleClear}
							onApply={handleApply}
							labels={footerLabels}
						/>
					)}
				</PopoverContainer>
			</div>
		</InputWrapper>
	);
}

// ─────────────────────────────────────────────────────────────────────────────
// ── DateRangePickerInput
// ─────────────────────────────────────────────────────────────────────────────

export interface DateRangePickerInputProps extends Pick<
	InputWrapperProps,
	'label' | 'description' | 'error' | 'required' | 'withAsterisk'
> {
	// Value
	value?: DateRange;
	defaultValue?: DateRange;
	onChange?: (range: DateRange) => void;
	// Range constraints
	minRangeDays?: number;
	maxRangeDays?: number;
	// Constraints
	minDate?: Date;
	maxDate?: Date;
	disabledDates?: Date[];
	enabledDates?: Date[];
	isDateDisabled?: (date: Date) => boolean;
	// Highlight
	highlightDates?: Date[];
	modifiers?: Record<string, Matcher | Matcher[]>;
	modifiersClassNames?: Record<string, string>;
	// Display
	numberOfMonths?: 1 | 2 | 3;
	weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
	showOutsideDays?: boolean;
	fixedWeeks?: boolean;
	captionLayout?: CaptionLayout;
	disableNavigation?: boolean;
	// Format / input
	format?: string;
	placeholder?: string;
	clearable?: boolean;
	readOnly?: boolean;
	disabled?: boolean;
	id?: string;
	// Popover
	open?: boolean;
	defaultOpen?: boolean;
	onOpenChange?: (open: boolean) => void;
	// Footer
	withActions?: boolean;
	footerLabels?: { today?: string; clear?: string; apply?: string };
	// Callbacks
	onMonthChange?: (month: Date) => void;
	onDayHover?: (date: Date | undefined) => void;
	// ClassNames
	classNames?: DatePickerClassNames;
	'aria-label'?: string;
}

const EMPTY_RANGE: DateRange = { from: null, to: null };

export function DateRangePickerInput({
	// value
	value: controlledValue,
	defaultValue,
	onChange,
	// range constraints
	minRangeDays,
	maxRangeDays,
	// constraints
	minDate,
	maxDate,
	disabledDates,
	enabledDates,
	isDateDisabled,
	// highlight
	highlightDates,
	modifiers: extraModifiers,
	modifiersClassNames: extraModClassNames,
	// display
	numberOfMonths = 2,
	weekStartsOn = 1,
	showOutsideDays = false,
	fixedWeeks = false,
	captionLayout = 'label',
	disableNavigation = false,
	// format / input
	format = 'dd/MM/yyyy',
	placeholder = 'Pick a date range',
	clearable = true,
	readOnly = false,
	disabled = false,
	id: idProp,
	// wrapper
	label,
	description,
	error,
	required,
	withAsterisk,
	// popover
	open: controlledOpen,
	defaultOpen = false,
	onOpenChange,
	// footer
	withActions = false,
	footerLabels,
	// callbacks
	onMonthChange,
	onDayHover,
	// classNames
	classNames,
	'aria-label': ariaLabel,
}: DateRangePickerInputProps) {
	const generatedId = useId();
	const id = idProp ?? generatedId;
	const popoverId = `${id}-popover`;

	// Value
	const isControlled = controlledValue !== undefined;
	const [internal, setInternal] = useState<DateRange>(
		defaultValue ?? EMPTY_RANGE,
	);
	const value = isControlled ? (controlledValue ?? EMPTY_RANGE) : internal;
	const [pending, setPending] = useState<DateRange>(EMPTY_RANGE);

	const setValue = useCallback(
		(next: DateRange) => {
			if (!isControlled) setInternal(next);
			onChange?.(next);
		},
		[isControlled, onChange],
	);

	// Hover preview
	const [hoverDate, setHoverDate] = useState<Date | undefined>();

	// Popover
	const { open, toggle, close } = usePopover({
		open: controlledOpen,
		defaultOpen,
		onOpenChange,
		disabled,
	});
	const triggerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (open) setPending(value);
	}, [open]);

	// Matchers
	const disabledMatcher = useMemo(
		() =>
			buildDisabledMatcher({
				minDate,
				maxDate,
				disabledDates,
				enabledDates,
				isDateDisabled,
			}) as unknown as Matcher,
		[minDate, maxDate, disabledDates, enabledDates, isDateDisabled],
	);

	const modifiers = useMemo(() => {
		const m: Record<string, Matcher | Matcher[]> = {};
		if (highlightDates?.length)
			m['kivora_highlighted'] = highlightDates as unknown as Matcher[];
		if (extraModifiers) Object.assign(m, extraModifiers);
		return m;
	}, [highlightDates, extraModifiers]);

	const modifiersClassNames = useMemo(() => {
		const base: Record<string, string> = {
			kivora_highlighted:
				'[&>button]:ring-2 [&>button]:ring-amber-400/70 [&>button]:bg-amber-50/80',
		};
		if (extraModClassNames) Object.assign(base, extraModClassNames);
		return base;
	}, [extraModClassNames]);

	// Rango de display (con hover preview)
	const workingRange = withActions && open ? pending : value;
	const previewRange = useMemo((): DateRange => {
		if (workingRange.from && !workingRange.to && hoverDate) {
			return normalizeRange(workingRange.from, hoverDate);
		}
		return workingRange;
	}, [workingRange, hoverDate]);

	// RDP espera { from?: Date; to?: Date }
	const rdpSelected = {
		from: previewRange.from ?? undefined,
		to: previewRange.to ?? undefined,
	};

	const displayValue = formatRange(workingRange, format);

	const handleSelect = (rdpRange: { from?: Date; to?: Date } | undefined) => {
		const next: DateRange = {
			from: rdpRange?.from ?? null,
			to: rdpRange?.to ?? null,
		};
		const normalized = normalizeRange(next.from, next.to);

		// Validar restricciones de rango solo cuando está completo
		if (normalized.from && normalized.to) {
			const days =
				Math.abs(
					differenceInCalendarDays(normalized.to, normalized.from),
				) + 1;
			if (minRangeDays && days < minRangeDays) return;
			if (maxRangeDays && days > maxRangeDays) return;
		}

		if (withActions) {
			setPending(normalized);
		} else {
			setValue(normalized);
			// Cerrar sólo cuando el usuario ha elegido la fecha final
			// rdpRange.to undefined = primer clic (seleccionando 'from') → no cerrar
			// rdpRange.to definido  = segundo clic (seleccionando 'to')  → cerrar
			if (rdpRange?.to !== undefined) close();
		}
	};

	const handleClear = () => {
		setValue(EMPTY_RANGE);
		setPending(EMPTY_RANGE);
	};
	const handleToday = () => {
		const today = new Date();
		const next = { from: today, to: today };
		if (withActions) setPending(next);
		else {
			setValue(next);
			close();
		}
	};
	const handleApply = () => {
		setValue(pending);
		close();
	};

	return (
		<InputWrapper
			label={label}
			description={description}
			error={error}
			required={required}
			withAsterisk={withAsterisk}
			id={id}
			className={classNames?.root}>
			<div className='relative'>
				<Trigger
					ref={triggerRef}
					id={id}
					popoverId={popoverId}
					value={displayValue}
					placeholder={placeholder}
					disabled={disabled}
					readOnly={readOnly}
					clearable={clearable && !!(value.from || value.to)}
					hasError={!!error}
					open={open}
					onToggle={toggle}
					onClear={handleClear}
					ariaLabel={
						ariaLabel ??
						(typeof label === 'string' ? label : undefined)
					}
					className={classNames?.trigger}
				/>

				<PopoverContainer
					open={open}
					onClose={close}
					triggerRef={triggerRef}
					id={popoverId}
					ariaLabel={`${typeof label === 'string' ? label : 'Date range'} picker`}
					className={classNames?.popover}>
					<DayPicker
						mode='range'
						selected={rdpSelected}
						onSelect={handleSelect}
						defaultMonth={value.from ?? undefined}
						numberOfMonths={numberOfMonths}
						weekStartsOn={weekStartsOn}
						showOutsideDays={showOutsideDays}
						fixedWeeks={fixedWeeks}
						captionLayout={captionLayout}
						startMonth={DROPDOWN_START}
						endMonth={DROPDOWN_END}
						disabled={disabledMatcher}
						modifiers={modifiers}
						modifiersClassNames={modifiersClassNames}
						disableNavigation={disableNavigation}
						onMonthChange={onMonthChange}
						onDayMouseEnter={(date) => {
							setHoverDate(date);
							onDayHover?.(date);
						}}
						onDayMouseLeave={() => {
							setHoverDate(undefined);
							onDayHover?.(undefined);
						}}
						classNames={RDP_CLASS_NAMES}
						components={RDP_COMPONENTS}
					/>

					{withActions && (
						<CalendarFooter
							onToday={handleToday}
							onClear={handleClear}
							onApply={handleApply}
							labels={footerLabels}
						/>
					)}
				</PopoverContainer>
			</div>
		</InputWrapper>
	);
}

// ─────────────────────────────────────────────────────────────────────────────
// ── InlineCalendar
// ─────────────────────────────────────────────────────────────────────────────

export interface InlineCalendarProps {
	mode?: 'single' | 'range' | 'multiple';
	// single
	value?: Date | null;
	defaultValue?: Date | null;
	onChange?: (date: Date | null) => void;
	// range
	rangeValue?: DateRange;
	defaultRangeValue?: DateRange;
	onRangeChange?: (range: DateRange) => void;
	// multiple
	multiValue?: Date[];
	defaultMultiValue?: Date[];
	onMultiChange?: (dates: Date[]) => void;
	// shared constraints
	minDate?: Date;
	maxDate?: Date;
	disabledDates?: Date[];
	enabledDates?: Date[];
	isDateDisabled?: (date: Date) => boolean;
	highlightDates?: Date[];
	modifiers?: Record<string, Matcher | Matcher[]>;
	modifiersClassNames?: Record<string, string>;
	// display
	numberOfMonths?: 1 | 2 | 3;
	weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
	showOutsideDays?: boolean;
	fixedWeeks?: boolean;
	captionLayout?: CaptionLayout;
	disableNavigation?: boolean;
	onMonthChange?: (month: Date) => void;
	className?: string;
}

export function InlineCalendar({
	mode = 'single',
	// single
	value: controlledSingle,
	defaultValue,
	onChange,
	// range
	rangeValue: controlledRange,
	defaultRangeValue,
	onRangeChange,
	// multiple
	multiValue: controlledMulti,
	defaultMultiValue,
	onMultiChange,
	// constraints
	minDate,
	maxDate,
	disabledDates,
	enabledDates,
	isDateDisabled,
	highlightDates,
	modifiers: extraModifiers,
	modifiersClassNames: extraModClassNames,
	// display
	numberOfMonths = 1,
	weekStartsOn = 1,
	showOutsideDays = false,
	fixedWeeks = false,
	captionLayout = 'label',
	disableNavigation = false,
	onMonthChange,
	className,
}: InlineCalendarProps) {
	// Single
	const [singleInternal, setSingleInternal] = useState<Date | null>(
		defaultValue ?? null,
	);
	const singleValue =
		controlledSingle !== undefined
			? (controlledSingle ?? null)
			: singleInternal;

	// Range
	const [rangeInternal, setRangeInternal] = useState<DateRange>(
		defaultRangeValue ?? EMPTY_RANGE,
	);
	const rangeValue =
		controlledRange !== undefined ? controlledRange : rangeInternal;

	// Multiple
	const [multiInternal, setMultiInternal] = useState<Date[]>(
		defaultMultiValue ?? [],
	);
	const multiValue =
		controlledMulti !== undefined ? controlledMulti : multiInternal;

	const disabledMatcher = useMemo(
		() =>
			buildDisabledMatcher({
				minDate,
				maxDate,
				disabledDates,
				enabledDates,
				isDateDisabled,
			}) as unknown as Matcher,
		[minDate, maxDate, disabledDates, enabledDates, isDateDisabled],
	);

	const modifiers = useMemo(() => {
		const m: Record<string, Matcher | Matcher[]> = {};
		if (highlightDates?.length)
			m['kivora_highlighted'] = highlightDates as unknown as Matcher[];
		if (extraModifiers) Object.assign(m, extraModifiers);
		return m;
	}, [highlightDates, extraModifiers]);

	const modifiersClassNames = useMemo(() => {
		const base: Record<string, string> = {
			kivora_highlighted:
				'[&>button]:ring-2 [&>button]:ring-amber-400/70 [&>button]:bg-amber-50/80',
		};
		if (extraModClassNames) Object.assign(base, extraModClassNames);
		return base;
	}, [extraModClassNames]);

	const commonProps = {
		numberOfMonths,
		weekStartsOn,
		showOutsideDays,
		fixedWeeks,
		captionLayout,
		startMonth: DROPDOWN_START,
		endMonth: DROPDOWN_END,
		disabled: disabledMatcher,
		modifiers,
		modifiersClassNames,
		disableNavigation,
		onMonthChange,
		classNames: RDP_CLASS_NAMES,
		components: RDP_COMPONENTS,
	};

	return (
		<div
			className={cn(
				'inline-block rounded-xl border border-border bg-surface p-3',
				className,
			)}>
			{mode === 'range' ? (
				<DayPicker
					mode='range'
					selected={{
						from: rangeValue.from ?? undefined,
						to: rangeValue.to ?? undefined,
					}}
					onSelect={(r) => {
						const next = {
							from: r?.from ?? null,
							to: r?.to ?? null,
						};
						if (controlledRange === undefined)
							setRangeInternal(next);
						onRangeChange?.(next);
					}}
					{...commonProps}
				/>
			) : mode === 'multiple' ? (
				<DayPicker
					mode='multiple'
					selected={multiValue}
					onSelect={(dates) => {
						const next = dates ?? [];
						if (controlledMulti === undefined)
							setMultiInternal(next);
						onMultiChange?.(next);
					}}
					{...commonProps}
				/>
			) : (
				<DayPicker
					mode='single'
					selected={singleValue ?? undefined}
					onSelect={(date) => {
						const next = date ?? null;
						if (controlledSingle === undefined)
							setSingleInternal(next);
						onChange?.(next);
					}}
					{...commonProps}
				/>
			)}
		</div>
	);
}

// ─────────────────────────────────────────────────────────────────────────────
// ── MonthPickerInput (mejorado, mantiene API original)
// ─────────────────────────────────────────────────────────────────────────────

export interface MonthPickerInputProps extends Pick<
	InputWrapperProps,
	'label' | 'description' | 'error'
> {
	value?: { year: number; month: number } | null;
	onChange?: (value: { year: number; month: number } | null) => void;
	placeholder?: string;
	clearable?: boolean;
	disabled?: boolean;
	id?: string;
}

const MONTH_NAMES = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December',
];

export function MonthPickerInput({
	label,
	description,
	error,
	id,
	value,
	onChange,
	placeholder = 'Pick month',
	clearable = false,
	disabled = false,
}: MonthPickerInputProps) {
	const [open, setOpen] = useState(false);
	const [year, setYear] = useState(value?.year ?? new Date().getFullYear());
	const triggerRef = useRef<HTMLDivElement>(null);
	const popoverRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!open) return;
		const handler = (e: MouseEvent) => {
			const t = e.target as Node;
			if (
				!triggerRef.current?.contains(t) &&
				!popoverRef.current?.contains(t)
			)
				setOpen(false);
		};
		document.addEventListener('mousedown', handler);
		return () => document.removeEventListener('mousedown', handler);
	}, [open]);

	useEffect(() => {
		if (!open) return;
		const handler = (e: KeyboardEvent) => {
			if (e.key === 'Escape') setOpen(false);
		};
		document.addEventListener('keydown', handler);
		return () => document.removeEventListener('keydown', handler);
	}, [open]);

	const displayValue = value
		? `${MONTH_NAMES[value.month].slice(0, 3)} ${value.year}`
		: '';

	return (
		<InputWrapper
			label={label}
			description={description}
			error={error}
			id={id}>
			<div className='relative'>
				<Trigger
					ref={triggerRef}
					value={displayValue}
					placeholder={placeholder}
					disabled={disabled}
					clearable={clearable && !!value}
					hasError={!!error}
					open={open}
					onToggle={() => setOpen((v) => !v)}
					onClear={() => onChange?.(null)}
				/>

				{open && (
					<div
						ref={popoverRef}
						role='dialog'
						aria-label='Month picker'
						className='absolute left-0 top-full z-50 mt-1 rounded-xl border border-border bg-surface p-3 shadow-xl'>
						{/* Nav año */}
						<div className='mb-3 flex items-center justify-between'>
							<button
								type='button'
								onClick={() => setYear((y) => y - 1)}
								className='flex h-7 w-7 items-center justify-center rounded-md border border-border bg-surface hover:bg-muted/20 transition-colors'>
								<IconChevronLeft className='h-4 w-4' />
							</button>
							<span className='select-none text-sm font-semibold text-on-surface'>
								{year}
							</span>
							<button
								type='button'
								onClick={() => setYear((y) => y + 1)}
								className='flex h-7 w-7 items-center justify-center rounded-md border border-border bg-surface hover:bg-muted/20 transition-colors'>
								<IconChevronRight className='h-4 w-4' />
							</button>
						</div>
						{/* Meses */}
						<div className='grid grid-cols-3 gap-1'>
							{MONTH_NAMES.map((m, i) => {
								const isSelected =
									value?.year === year && value?.month === i;
								return (
									<button
										key={m}
										type='button'
										onClick={() => {
											onChange?.({ year, month: i });
											setOpen(false);
										}}
										className={cn(
											'rounded-md px-2 py-2 text-xs font-medium transition-colors',
											'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand',
											isSelected
												? 'bg-brand text-white'
												: 'text-on-surface hover:bg-muted/20',
										)}>
										{m.slice(0, 3)}
									</button>
								);
							})}
						</div>
					</div>
				)}
			</div>
		</InputWrapper>
	);
}

// ─────────────────────────────────────────────────────────────────────────────
// ── Aliases (backward compat)
// ─────────────────────────────────────────────────────────────────────────────

/** @alias DatePickerInput */
export { DatePickerInput as DatePicker };
/** @alias DateRangePickerInput */
export { DateRangePickerInput as DateRangePicker };
