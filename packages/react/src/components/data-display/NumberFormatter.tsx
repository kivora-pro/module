'use client';

import React from 'react';

export interface NumberFormatterProps {
	value?: number;
	thousandSeparator?: string | boolean;
	decimalSeparator?: string;
	decimalScale?: number;
	fixedDecimalScale?: boolean;
	prefix?: string;
	suffix?: string;
	style?: 'decimal' | 'currency' | 'percent' | 'unit';
	currency?: string;
	locale?: string;
	children?: never;
}

export function NumberFormatter({
	value = 0,
	thousandSeparator,
	decimalSeparator,
	decimalScale,
	fixedDecimalScale,
	prefix = '',
	suffix = '',
	style = 'decimal',
	currency,
	locale,
}: NumberFormatterProps) {
	const formatted = React.useMemo(() => {
		try {
			const opts: Intl.NumberFormatOptions = {
				style,
				currency:
					style === 'currency' ? (currency ?? 'USD') : undefined,
				minimumFractionDigits: fixedDecimalScale
					? (decimalScale ?? 0)
					: undefined,
				maximumFractionDigits: decimalScale,
				useGrouping: thousandSeparator !== false,
			};
			return new Intl.NumberFormat(locale, opts).format(value);
		} catch {
			return String(value);
		}
	}, [
		value,
		style,
		currency,
		decimalScale,
		fixedDecimalScale,
		thousandSeparator,
		locale,
	]);

	return (
		<span>
			{prefix}
			{formatted}
			{suffix}
		</span>
	);
}
