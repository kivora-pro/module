'use client';

import React from 'react';

export interface ListProps extends React.HTMLAttributes<
	HTMLUListElement | HTMLOListElement
> {
	type?: 'ordered' | 'unordered';
	withPadding?: boolean;
	size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
	spacing?: number | string;
	center?: boolean;
	icon?: React.ReactNode;
	listStyleType?: React.CSSProperties['listStyleType'];
	children: React.ReactNode;
}

export interface ListItemProps extends React.HTMLAttributes<HTMLLIElement> {
	icon?: React.ReactNode;
	children?: React.ReactNode;
}

const sizeMap = {
	xs: 'text-xs',
	sm: 'text-sm',
	md: 'text-base',
	lg: 'text-lg',
	xl: 'text-xl',
};

const ListCtx = React.createContext<{
	icon?: React.ReactNode;
	center?: boolean;
}>({});

export const List = React.forwardRef<HTMLElement, ListProps>(
	(
		{
			type = 'unordered',
			withPadding = false,
			size = 'md',
			spacing,
			center = false,
			icon,
			listStyleType,
			children,
			className = '',
			style,
			...props
		},
		ref,
	) => {
		const Comp = (type === 'ordered' ? 'ol' : 'ul') as React.ElementType;
		return (
			<ListCtx.Provider value={{ icon, center }}>
				<Comp
					ref={ref}
					className={[
						sizeMap[size],
						withPadding ? 'pl-6' : 'pl-0',
						icon
							? 'list-none'
							: type === 'ordered'
								? 'list-decimal'
								: 'list-disc',
						className,
					]
						.filter(Boolean)
						.join(' ')}
					style={{ listStyleType, ...style }}
					{...props}>
					{children}
				</Comp>
			</ListCtx.Provider>
		);
	},
);
List.displayName = 'List';

function ListItem({
	icon: itemIcon,
	children,
	className = '',
	...props
}: ListItemProps) {
	const { icon, center } = React.useContext(ListCtx);
	const ic = itemIcon ?? icon;
	return (
		<li
			className={[
				ic ? 'flex gap-2' : '',
				center && ic ? 'items-center' : ic ? 'items-start' : '',
				className,
			]
				.filter(Boolean)
				.join(' ')}
			{...props}>
			{ic && <span className='flex-shrink-0'>{ic}</span>}
			{children}
		</li>
	);
}
ListItem.displayName = 'List.Item';
(List as typeof List & { Item: typeof ListItem }).Item = ListItem;
export { ListItem };
