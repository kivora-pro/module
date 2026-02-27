'use client';

import React, { useState } from 'react';

export interface ImageProps extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'src'> {
	src?: string | null;
	alt?: string;
	h?: number | string;
	w?: number | string;
	radius?: string;
	fit?: React.CSSProperties['objectFit'];
	fallbackSrc?: string;
	onError?: React.ReactEventHandler<HTMLImageElement>;
}

export const Image = React.forwardRef<HTMLImageElement, ImageProps>(
	(
		{
			src,
			alt = '',
			h,
			w,
			radius,
			fit = 'cover',
			fallbackSrc,
			onError,
			className = '',
			style,
			...props
		},
		ref,
	) => {
		const [errored, setErrored] = useState(false);
		const currentSrc =
			errored && fallbackSrc ? fallbackSrc : (src ?? undefined);

		return (
			<img
				ref={ref}
				src={currentSrc}
				alt={alt}
				className={['block', className].filter(Boolean).join(' ')}
				style={{
					height: h,
					width: w,
					borderRadius: radius,
					objectFit: fit,
					...style,
				}}
				onError={(e) => {
					if (fallbackSrc && !errored) setErrored(true);
					onError?.(e);
				}}
				{...props}
			/>
		);
	},
);
Image.displayName = 'Image';
