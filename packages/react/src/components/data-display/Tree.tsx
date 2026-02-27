'use client';

import React, { useState } from 'react';

export interface TreeNodeData {
	value: string;
	label: React.ReactNode;
	children?: TreeNodeData[];
	nodeProps?: Record<string, unknown>;
}

export interface TreeProps {
	data: TreeNodeData[];
	renderNode?: (payload: {
		node: TreeNodeData;
		expanded: boolean;
		hasChildren: boolean;
		elementProps: React.HTMLAttributes<HTMLLIElement>;
	}) => React.ReactNode;
	levelOffset?: number;
	expandedState?: Record<string, boolean>;
	onNodeCollapse?: (node: TreeNodeData) => void;
	onNodeExpand?: (node: TreeNodeData) => void;
	selectOnClick?: boolean;
	clearSelectionOnOutsideClick?: boolean;
	checkOnSpace?: boolean;
	allowRangeSelection?: boolean;
}

export function Tree({
	data,
	renderNode,
	levelOffset = 16,
	expandedState: controlled,
	onNodeExpand,
	onNodeCollapse,
}: TreeProps) {
	const [internal, setInternal] = useState<Record<string, boolean>>({});
	const expanded = controlled ?? internal;

	const toggle = (node: TreeNodeData) => {
		const next = { ...expanded, [node.value]: !expanded[node.value] };
		setInternal(next);
		if (expanded[node.value]) onNodeCollapse?.(node);
		else onNodeExpand?.(node);
	};

	function renderLevel(nodes: TreeNodeData[], level = 0) {
		return (
			<ul
				role='tree'
				className='list-none m-0 p-0'
				style={{ paddingLeft: level > 0 ? levelOffset : 0 }}>
				{nodes.map((node) => {
					const hasChildren = !!node.children?.length;
					const isExpanded = !!expanded[node.value];
					const elementProps: React.HTMLAttributes<HTMLLIElement> = {
						role: 'treeitem',
						'aria-expanded': hasChildren ? isExpanded : undefined,
					};
					return (
						<li
							key={node.value}
							{...elementProps}>
							{renderNode ? (
								renderNode({
									node,
									expanded: isExpanded,
									hasChildren,
									elementProps,
								})
							) : (
								<div
									className='flex items-center gap-1.5 py-1 px-2 rounded hover:bg-muted/20 cursor-pointer select-none text-sm'
									onClick={() => hasChildren && toggle(node)}>
									{hasChildren && (
										<svg
											className={[
												'w-3.5 h-3.5 flex-shrink-0 transition-transform text-muted',
												isExpanded ? 'rotate-90' : '',
											]
												.filter(Boolean)
												.join(' ')}
											viewBox='0 0 20 20'
											fill='currentColor'>
											<path
												fillRule='evenodd'
												d='M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z'
												clipRule='evenodd'
											/>
										</svg>
									)}
									{!hasChildren && <span className='w-3.5' />}
									<span>{node.label}</span>
								</div>
							)}
							{hasChildren &&
								isExpanded &&
								renderLevel(node.children!, level + 1)}
						</li>
					);
				})}
			</ul>
		);
	}

	return renderLevel(data);
}
