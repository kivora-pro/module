'use client';

export type LoaderType = 'oval' | 'bars' | 'dots';
export type LoaderSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface LoaderProps {
	type?: LoaderType;
	size?: LoaderSize | number;
	color?: string;
	'aria-label'?: string;
}

const sizeMap: Record<LoaderSize, number> = {
	xs: 18,
	sm: 22,
	md: 36,
	lg: 44,
	xl: 58,
};

export function Loader({
	type = 'oval',
	size = 'md',
	'aria-label': ariaLabel = 'Loading',
}: LoaderProps) {
	const px = typeof size === 'number' ? size : sizeMap[size];
	if (type === 'bars') {
		return (
			<span
				role='status'
				aria-label={ariaLabel}
				className='inline-flex gap-[3px] items-end'
				style={{ height: px, width: px }}>
				{[0, 1, 2].map((i) => (
					<span
						key={i}
						className='w-1 rounded-sm bg-brand animate-bounce'
						style={{
							animationDelay: `${i * 0.15}s`,
							height: '60%',
						}}
					/>
				))}
			</span>
		);
	}
	if (type === 'dots') {
		return (
			<span
				role='status'
				aria-label={ariaLabel}
				className='inline-flex gap-1 items-center'>
				{[0, 1, 2].map((i) => (
					<span
						key={i}
						className='rounded-full bg-brand animate-bounce'
						style={{
							width: px * 0.22,
							height: px * 0.22,
							animationDelay: `${i * 0.15}s`,
						}}
					/>
				))}
			</span>
		);
	}
	// oval (default)
	return (
		<svg
			role='status'
			aria-label={ariaLabel}
			width={px}
			height={px}
			viewBox='0 0 38 38'
			xmlns='http://www.w3.org/2000/svg'
			className='animate-spin text-brand'>
			<g
				fill='none'
				fillRule='evenodd'>
				<g transform='translate(1 1)'>
					<path
						d='M36 18c0-9.94-8.06-18-18-18'
						stroke='currentColor'
						strokeWidth='3'
						strokeLinecap='round'
					/>
					<circle
						cx='36'
						cy='18'
						r='1'
						fill='currentColor'
					/>
				</g>
			</g>
		</svg>
	);
}
