'use client';

import React from 'react';

export interface TableProps extends React.TableHTMLAttributes<HTMLTableElement> {
	captionSide?: 'top' | 'bottom';
	striped?: boolean | 'odd' | 'even';
	highlightOnHover?: boolean;
	withTableBorder?: boolean;
	withColumnBorders?: boolean;
	withRowBorders?: boolean;
	stickyHeader?: boolean;
	stickyHeaderOffset?: number;
	horizontalSpacing?: number | string;
	verticalSpacing?: number | string;
	fz?: string;
	children: React.ReactNode;
}

const TableCtx = React.createContext<
	Pick<
		TableProps,
		| 'horizontalSpacing'
		| 'verticalSpacing'
		| 'withColumnBorders'
		| 'striped'
		| 'highlightOnHover'
		| 'withRowBorders'
	>
>({});

export const Table = React.forwardRef<HTMLTableElement, TableProps>(
	(
		{
			captionSide = 'bottom',
			striped = false,
			highlightOnHover = false,
			withTableBorder = false,
			withColumnBorders = false,
			withRowBorders = true,
			stickyHeader = false,
			horizontalSpacing = '0.5rem',
			verticalSpacing = '0.5rem',
			fz,
			children,
			className = '',
			...props
		},
		ref,
	) => {
		return (
			<TableCtx.Provider
				value={{
					horizontalSpacing,
					verticalSpacing,
					withColumnBorders,
					striped,
					highlightOnHover,
					withRowBorders,
				}}>
				<div className='w-full overflow-auto'>
					<table
						ref={ref}
						className={[
							'w-full text-left text-sm text-on-surface',
							withTableBorder ? 'border border-border' : '',
							className,
						]
							.filter(Boolean)
							.join(' ')}
						style={{ fontSize: fz }}
						{...props}>
						{children}
					</table>
				</div>
			</TableCtx.Provider>
		);
	},
);
Table.displayName = 'Table';

function Th({
	children,
	className = '',
	style,
	...props
}: React.ThHTMLAttributes<HTMLTableCellElement>) {
	const { horizontalSpacing, verticalSpacing, withColumnBorders } =
		React.useContext(TableCtx);
	return (
		<th
			className={[
				'font-semibold text-on-surface bg-surface',
				withColumnBorders
					? 'border-r border-border last:border-r-0'
					: '',
				className,
			]
				.filter(Boolean)
				.join(' ')}
			style={{
				padding: `${verticalSpacing} ${horizontalSpacing}`,
				...style,
			}}
			{...props}>
			{children}
		</th>
	);
}

function Td({
	children,
	className = '',
	style,
	...props
}: React.TdHTMLAttributes<HTMLTableCellElement>) {
	const { horizontalSpacing, verticalSpacing, withColumnBorders } =
		React.useContext(TableCtx);
	return (
		<td
			className={[
				withColumnBorders
					? 'border-r border-border last:border-r-0'
					: '',
				className,
			]
				.filter(Boolean)
				.join(' ')}
			style={{
				padding: `${verticalSpacing} ${horizontalSpacing}`,
				...style,
			}}
			{...props}>
			{children}
		</td>
	);
}

function Tr({
	children,
	className = '',
	...props
}: React.HTMLAttributes<HTMLTableRowElement>) {
	const { highlightOnHover, withRowBorders, striped } =
		React.useContext(TableCtx);
	return (
		<tr
			className={[
				withRowBorders ? 'border-b border-border last:border-b-0' : '',
				highlightOnHover ? 'hover:bg-muted/20 transition-colors' : '',
				striped === true || striped === 'odd'
					? 'odd:bg-muted/10'
					: striped === 'even'
						? 'even:bg-muted/10'
						: '',
				className,
			]
				.filter(Boolean)
				.join(' ')}
			{...props}>
			{children}
		</tr>
	);
}

function Thead({
	children,
	className = '',
	...props
}: React.HTMLAttributes<HTMLTableSectionElement>) {
	return (
		<thead
			className={['border-b border-border', className]
				.filter(Boolean)
				.join(' ')}
			{...props}>
			{children}
		</thead>
	);
}

function Tbody({
	children,
	...props
}: React.HTMLAttributes<HTMLTableSectionElement>) {
	return <tbody {...props}>{children}</tbody>;
}

function Tfoot({
	children,
	className = '',
	...props
}: React.HTMLAttributes<HTMLTableSectionElement>) {
	return (
		<tfoot
			className={['border-t border-border', className]
				.filter(Boolean)
				.join(' ')}
			{...props}>
			{children}
		</tfoot>
	);
}

function Caption({
	children,
	className = '',
	...props
}: React.HTMLAttributes<HTMLTableCaptionElement>) {
	return (
		<caption
			className={['text-xs text-muted py-2', className]
				.filter(Boolean)
				.join(' ')}
			{...props}>
			{children}
		</caption>
	);
}

Th.displayName = 'Table.Th';
Td.displayName = 'Table.Td';
Tr.displayName = 'Table.Tr';
Thead.displayName = 'Table.Thead';
Tbody.displayName = 'Table.Tbody';
Tfoot.displayName = 'Table.Tfoot';
Caption.displayName = 'Table.Caption';

// Attach sub-components to the exported Table so compound syntax works
(Table as unknown as { Th: typeof Th }).Th = Th;
(Table as unknown as { Td: typeof Td }).Td = Td;
(Table as unknown as { Tr: typeof Tr }).Tr = Tr;
(Table as unknown as { Thead: typeof Thead }).Thead = Thead;
(Table as unknown as { Tbody: typeof Tbody }).Tbody = Tbody;
(Table as unknown as { Tfoot: typeof Tfoot }).Tfoot = Tfoot;
(Table as unknown as { Caption: typeof Caption }).Caption = Caption;

export { Caption, Tbody, Td, Tfoot, Th, Thead, Tr };
