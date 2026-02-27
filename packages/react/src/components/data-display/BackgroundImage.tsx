'use client';

import React from 'react';

export interface BackgroundImageProps extends React.HTMLAttributes<HTMLDivElement> {
	src: string;
	radius?: string;
	component?: React.ElementType;
	children?: React.ReactNode;
}

export const BackgroundImage = React.forwardRef<
	HTMLDivElement,
	BackgroundImageProps
>(
	(
		{ src, radius, children, className = '', style, component, ...props },
		ref,
	) => {
		const Comp = (component ?? 'div') as React.ElementType;
		return (
			<Comp
				ref={ref}
				className={['bg-cover bg-center bg-no-repeat', className]
					.filter(Boolean)
					.join(' ')}
				style={{
					backgroundImage: `url(${src})`,
					borderRadius: radius,
					...style,
				}}
				{...props}>
				{children}
			</Comp>
		);
	},
);
BackgroundImage.displayName = 'BackgroundImage';
