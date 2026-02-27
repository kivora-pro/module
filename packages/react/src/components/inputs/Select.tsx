'use client';

import React from 'react';
import ReactSelect, {
	type GroupBase,
	type OptionsOrGroups,
	type Props as ReactSelectProps,
	type SingleValue,
} from 'react-select';
import {
	InputWrapper,
	type InputSize,
	type InputVariant,
	type InputWrapperProps,
} from './Input';

// Bypass @types/react 18 vs 19 incompatibility in react-select
type _RSProps<V, M extends boolean, G extends GroupBase<V>> = ReactSelectProps<
	V,
	M,
	G
> & { children?: React.ReactNode };
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ReactSelectComp = ReactSelect as unknown as <
	V,
	M extends boolean = false,
	G extends GroupBase<V> = GroupBase<V>,
>(
	props: _RSProps<V, M, G>,
) => React.ReactElement | null;

// ── Types ──────────────────────────────────────────────────────────────────

/** Option interna normalizada que entiende react-select */
type OptionType = {
	value: string;
	label: string;
	isDisabled?: boolean;
};

/** Elemento de grupo para react-select */
type GroupType = GroupBase<OptionType> & { label: string };

/** Formato de entrada aceptado por la prop `data` */
type DataItem =
	| string
	| { value: string; label: string; disabled?: boolean; group?: string };

// ── Helpers ────────────────────────────────────────────────────────────────

function cx(...classes: (string | false | null | undefined)[]) {
	return classes.filter(Boolean).join(' ');
}

function normalizeData(
	data: DataItem[],
): OptionsOrGroups<OptionType, GroupType> {
	const groups: Record<string, OptionType[]> = {};
	const ungrouped: OptionType[] = [];

	for (const d of data) {
		if (typeof d === 'string') {
			ungrouped.push({ value: d, label: d });
		} else {
			const opt: OptionType = {
				value: d.value,
				label: d.label,
				isDisabled: d.disabled,
			};
			if (d.group) {
				groups[d.group] = groups[d.group] ?? [];
				groups[d.group].push(opt);
			} else {
				ungrouped.push(opt);
			}
		}
	}

	const groupEntries = Object.entries(groups).map(([label, options]) => ({
		label,
		options,
	}));

	return [...ungrouped, ...groupEntries];
}

// ── Size tokens ────────────────────────────────────────────────────────────

const controlSize: Record<
	InputSize,
	{ min: string; px: string; text: string }
> = {
	xs: { min: 'min-h-7', px: 'px-2', text: 'text-xs' },
	sm: { min: 'min-h-8', px: 'px-3', text: 'text-sm' },
	md: { min: 'min-h-9', px: 'px-3', text: 'text-sm' },
	lg: { min: 'min-h-11', px: 'px-4', text: 'text-base' },
	xl: { min: 'min-h-13', px: 'px-4', text: 'text-lg' },
};

// ── Props ──────────────────────────────────────────────────────────────────

export interface SelectProps extends Pick<
	InputWrapperProps,
	'label' | 'description' | 'error' | 'required' | 'withAsterisk'
> {
	/** Items del select. Acepta strings, objetos o ítems con grupo. */
	data: DataItem[];
	/** Valor seleccionado (modo controlado). */
	value?: string | null;
	/** Valor inicial (modo no controlado). */
	defaultValue?: string;
	/** Callback con el valor `string` seleccionado, o `null` si se limpia. */
	onChange?: (value: string | null) => void;
	placeholder?: string;
	/** Permite borrar la selección con el botón ×. @default false */
	clearable?: boolean;
	/** Permite buscar/filtrar opciones. @default true */
	searchable?: boolean;
	/** Texto cuando no hay resultados. @default 'Sin resultados' */
	nothingFoundMessage?: React.ReactNode;
	disabled?: boolean;
	size?: InputSize;
	variant?: InputVariant;
	id?: string;
	name?: string;
	/** Props extra pasadas directamente a react-select (escapa de la API simplificada). */
	selectProps?: Omit<
		ReactSelectProps<OptionType, false, GroupType>,
		| 'options'
		| 'value'
		| 'defaultValue'
		| 'onChange'
		| 'placeholder'
		| 'isClearable'
		| 'isSearchable'
		| 'isDisabled'
		| 'noOptionsMessage'
		| 'inputId'
		| 'name'
		| 'unstyled'
		| 'classNames'
	>;
}

// ── Component ──────────────────────────────────────────────────────────────

export function Select({
	label,
	description,
	error,
	required,
	withAsterisk,
	id,
	data,
	value,
	defaultValue,
	onChange,
	placeholder,
	clearable = false,
	searchable = true,
	nothingFoundMessage = 'Sin resultados',
	disabled = false,
	size = 'md',
	variant = 'default',
	name,
	selectProps,
}: SelectProps) {
	const options = normalizeData(data);
	const sz = controlSize[size];

	// Resuelve las opciones planas ignorando grupos para búsqueda por valor
	const flatOptions = (options as Array<OptionType | GroupType>).flatMap(
		(o) => ('options' in o ? o.options : [o as OptionType]),
	);

	const selectedOption: OptionType | null | undefined =
		value !== undefined
			? (flatOptions.find((o) => o.value === value) ?? null)
			: undefined;

	const defaultOption: OptionType | undefined = defaultValue
		? flatOptions.find((o) => o.value === defaultValue)
		: undefined;

	const variantCls =
		variant === 'filled'
			? 'border border-transparent bg-muted/30 text-on-surface'
			: variant === 'unstyled'
				? 'border-none bg-transparent'
				: 'border border-border bg-surface text-on-surface';

	return (
		<InputWrapper
			label={label}
			description={description}
			error={error}
			required={required}
			withAsterisk={withAsterisk}
			id={id}>
			<ReactSelectComp<OptionType, false, GroupType>
				inputId={id}
				name={name}
				options={options}
				value={selectedOption}
				defaultValue={defaultOption}
				onChange={(opt: SingleValue<OptionType>) =>
					onChange?.(opt ? opt.value : null)
				}
				placeholder={placeholder ?? ''}
				isClearable={clearable}
				isSearchable={searchable}
				isDisabled={disabled}
				noOptionsMessage={() => nothingFoundMessage}
				unstyled
				classNames={{
					control: ({
						isFocused,
						isDisabled: dis,
					}: {
						isFocused: boolean;
						isDisabled: boolean;
					}) =>
						cx(
							'w-full rounded transition-colors cursor-pointer',
							sz.min,
							sz.text,
							variantCls,
							isFocused &&
								'ring-2 ring-brand ring-offset-1 border-brand',
							!!error && 'border-red-500',
							dis && 'opacity-50 pointer-events-none',
						),
					valueContainer: () =>
						cx('flex items-center gap-1', sz.px, 'py-0'),
					input: () => cx(sz.text, 'text-on-surface m-0 p-0'),
					placeholder: () => cx(sz.text, 'text-muted'),
					singleValue: () => cx(sz.text, 'text-on-surface'),
					indicatorsContainer: () => 'flex items-center px-2 gap-1',
					dropdownIndicator: ({
						isFocused,
					}: {
						isFocused: boolean;
					}) =>
						cx(
							'transition-colors',
							isFocused ? 'text-on-surface' : 'text-muted',
						),
					clearIndicator: () =>
						'text-muted hover:text-red-500 transition-colors cursor-pointer',
					indicatorSeparator: () => 'bg-border mx-1',
					menu: () =>
						'mt-1 rounded border border-border bg-surface shadow-lg z-50 overflow-hidden',
					menuList: () => 'py-1',
					option: ({
						isSelected,
						isFocused,
					}: {
						isSelected: boolean;
						isFocused: boolean;
					}) =>
						cx(
							'px-3 py-2 cursor-pointer transition-colors',
							sz.text,
							isSelected
								? 'bg-brand text-white'
								: isFocused
									? 'bg-muted/30 text-on-surface'
									: 'text-on-surface',
						),
					group: () => 'pt-2',
					groupHeading: () =>
						'px-3 pb-1 text-xs font-semibold uppercase tracking-wide text-muted',
					noOptionsMessage: () => cx('px-3 py-2 text-muted', sz.text),
					loadingMessage: () => cx('px-3 py-2 text-muted', sz.text),
				}}
				{...selectProps}
			/>
		</InputWrapper>
	);
}

Select.displayName = 'Select';
