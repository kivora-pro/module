'use client';

import React from 'react';
import { type InputSize, type InputWrapperProps } from './Input';

export interface SliderProps extends Pick<
	InputWrapperProps,
	'description' | 'error'
> {
	value?: number;
	defaultValue?: number;
	onChange?: (value: number) => void;
	onChangeEnd?: (value: number) => void;
	min?: number;
	max?: number;
	step?: number;
	size?: InputSize;
	color?: string;
	radius?: string;
	marks?: { value: number; label?: React.ReactNode }[];
	label?: React.ReactNode | ((value: number) => React.ReactNode);
	labelAlwaysOn?: boolean;
	thumbLabel?: string;
	showLabelOnHover?: boolean;
	disabled?: boolean;
	inverted?: boolean;
	id?: string;
}

const trackH: Record<InputSize, number> = {
	xs: 4,
	sm: 6,
	md: 8,
	lg: 10,
	xl: 12,
};

export function Slider({
	value: controlled,
	defaultValue = 0,
	onChange,
	onChangeEnd,
	min = 0,
	max = 100,
	step = 1,
	size = 'md',
	disabled = false,
	marks,
	id,
	label: labelProp,
	labelAlwaysOn = false,
}: SliderProps) {
	const [internal, setInternal] = React.useState(defaultValue);
	const value = controlled !== undefined ? controlled : internal;
	const h = trackH[size];

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const v = parseFloat(e.target.value);
		if (controlled === undefined) setInternal(v);
		onChange?.(v);
	};

	const pct = ((value - min) / (max - min)) * 100;
	const labelContent =
		typeof labelProp === 'function' ? labelProp(value) : labelProp;

	return (
		<div className='flex flex-col gap-1 w-full'>
			<div
				className='relative flex items-center'
				style={{ height: h + 16 }}>
				{/* Input cubre todo el contenedor para capturar clicks en el thumb y la barra */}
				<input
					id={id}
					type='range'
					min={min}
					max={max}
					step={step}
					value={value}
					disabled={disabled}
					onChange={handleChange}
					onMouseUp={() => onChangeEnd?.(value)}
					onTouchEnd={() => onChangeEnd?.(value)}
					className='absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed z-10'
				/>
				<div
					className='relative w-full'
					style={{ height: h, borderRadius: h / 2 }}>
					<div className='absolute inset-0 rounded-full bg-muted/30' />
					<div
						className='absolute left-0 top-0 bottom-0 rounded-full bg-brand'
						style={{ width: `${pct}%` }}
					/>
					<div
						className='absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-brand border-2 border-white shadow pointer-events-none'
						style={{ left: `calc(${pct}% - 8px)` }}
					/>
					{labelAlwaysOn && labelContent && (
						<div
							className='absolute -top-8 text-xs bg-neutral-800 text-white px-1.5 py-0.5 rounded pointer-events-none -translate-x-1/2'
							style={{ left: `${pct}%` }}>
							{labelContent}
						</div>
					)}
				</div>
			</div>
			{marks && (
				<div className='relative w-full h-4'>
					{marks.map((m) => {
						const mp = ((m.value - min) / (max - min)) * 100;
						return (
							<span
								key={m.value}
								className='absolute flex flex-col items-center text-xs text-muted'
								style={{
									left: `${mp}%`,
									transform: 'translateX(-50%)',
								}}>
								<span className='w-1 h-1 rounded-full bg-muted mb-0.5' />
								{m.label}
							</span>
						);
					})}
				</div>
			)}
		</div>
	);
}
