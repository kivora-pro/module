'use client';

export interface SpaceProps {
	h?: number | string;
	w?: number | string;
}

export function Space({ h, w }: SpaceProps) {
	return (
		<div
			style={{
				height: h,
				width: w,
				minHeight: h ? 1 : undefined,
				minWidth: w ? 1 : undefined,
			}}
			aria-hidden='true'
		/>
	);
}
