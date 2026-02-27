'use client';

import React from 'react';

export interface NavLinkProps extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'onChange'> {
	label: React.ReactNode;
	description?: React.ReactNode;
	leftSection?: React.ReactNode;
	rightSection?: React.ReactNode;
	active?: boolean;
	disabled?: boolean;
	variant?: 'filled' | 'light' | 'subtle';
	color?: string;
	childrenOffset?: number | string;
	children?: React.ReactNode;
	opened?: boolean;
	defaultOpened?: boolean;
	onChange?: (opened: boolean) => void;
	noWrap?: boolean;
	component?: React.ElementType;
}

const variantMap = {
	filled: 'bg-brand text-white',
	light: 'bg-brand/10 text-brand',
	subtle: 'hover:bg-muted/40 text-on-surface',
};

export const NavLink = React.forwardRef<HTMLAnchorElement, NavLinkProps>(
	(
		{
			label,
			description,
			leftSection,
			rightSection,
			active = false,
			disabled = false,
			variant = 'light',
			children,
			opened: controlledOpened,
			defaultOpened = false,
			onChange,
			childrenOffset = '1rem',
			className = '',
			component,
			...props
		},
		ref,
	) => {
		const [internalOpened, setInternalOpened] =
			React.useState(defaultOpened);
		const hasChildren = !!children;
		const opened =
			controlledOpened !== undefined ? controlledOpened : internalOpened;
		const Comp = (component ?? 'a') as React.ElementType;

		const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
			if (hasChildren) {
				const next = !opened;
				if (controlledOpened === undefined) setInternalOpened(next);
				onChange?.(next);
			}
			props.onClick?.(e);
		};

		return (
			<div>
				<Comp
					ref={ref}
					aria-disabled={disabled}
					aria-expanded={hasChildren ? opened : undefined}
					onClick={handleClick}
					className={[
						'flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors w-full',
						'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-1',
						active
							? variantMap[variant]
							: 'hover:bg-muted/40 text-on-surface',
						disabled
							? 'pointer-events-none opacity-50'
							: 'cursor-pointer',
						className,
					]
						.filter(Boolean)
						.join(' ')}
					{...props}>
					{leftSection && (
						<span className='flex-shrink-0'>{leftSection}</span>
					)}
					<span className='flex-1 min-w-0'>
						<span className='block truncate'>{label}</span>
						{description && (
							<span className='block text-xs text-muted truncate'>
								{description}
							</span>
						)}
					</span>
					{rightSection && (
						<span className='flex-shrink-0 text-muted'>
							{rightSection}
						</span>
					)}
					{hasChildren && (
						<svg
							className={[
								'w-4 h-4 flex-shrink-0 transition-transform',
								opened ? 'rotate-180' : '',
							]
								.filter(Boolean)
								.join(' ')}
							viewBox='0 0 20 20'
							fill='currentColor'>
							<path
								fillRule='evenodd'
								d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
								clipRule='evenodd'
							/>
						</svg>
					)}
				</Comp>
				{hasChildren && opened && (
					<div style={{ paddingLeft: childrenOffset }}>
						{children}
					</div>
				)}
			</div>
		);
	},
);
NavLink.displayName = 'NavLink';
