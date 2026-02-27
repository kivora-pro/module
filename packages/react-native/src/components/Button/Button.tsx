import type { ColorScheme, Size, Variant } from '@kivora/core';
import { colors } from '@kivora/core';
import React from 'react';
import {
	ActivityIndicator,
	Text,
	TouchableOpacity,
	type TextStyle,
	type ViewStyle,
} from 'react-native';

export interface ButtonProps {
	variant?: Variant;
	size?: Size;
	colorScheme?: ColorScheme;
	isLoading?: boolean;
	disabled?: boolean;
	fullWidth?: boolean;
	onPress?: () => void;
	children: React.ReactNode;
	style?: ViewStyle;
	textStyle?: TextStyle;
}

const sizeMap: Record<
	Size,
	{ paddingH: number; paddingV: number; fontSize: number }
> = {
	xs: { paddingH: 8, paddingV: 4, fontSize: 12 },
	sm: { paddingH: 12, paddingV: 6, fontSize: 14 },
	md: { paddingH: 16, paddingV: 10, fontSize: 16 },
	lg: { paddingH: 20, paddingV: 12, fontSize: 18 },
	xl: { paddingH: 24, paddingV: 14, fontSize: 20 },
};

export function Button({
	variant = 'solid',
	size = 'md',
	colorScheme = 'primary',
	isLoading = false,
	disabled = false,
	fullWidth = false,
	onPress,
	children,
	style,
	textStyle,
}: ButtonProps): React.ReactElement {
	const s = sizeMap[size];
	const isDisabled = disabled || isLoading;

	const containerStyle: ViewStyle = {
		paddingHorizontal: s.paddingH,
		paddingVertical: s.paddingV,
		borderRadius: 8,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		alignSelf: fullWidth ? 'stretch' : 'flex-start',
		opacity: isDisabled ? 0.5 : 1,
		...(variant === 'solid' && {
			backgroundColor: colors.primary[600],
		}),
		...(variant === 'outline' && {
			backgroundColor: 'transparent',
			borderWidth: 1.5,
			borderColor: colors.primary[600],
		}),
		...(variant === 'ghost' && {
			backgroundColor: 'transparent',
		}),
	};

	const labelStyle: TextStyle = {
		fontSize: s.fontSize,
		fontWeight: '600',
		color: variant === 'solid' ? '#ffffff' : colors.primary[600],
	};

	return (
		<TouchableOpacity
			style={[containerStyle, style]}
			onPress={onPress}
			disabled={isDisabled}
			activeOpacity={0.7}>
			{isLoading ? (
				<ActivityIndicator
					size='small'
					color={
						variant === 'solid' ? '#ffffff' : colors.primary[600]
					}
				/>
			) : (
				<Text style={[labelStyle, textStyle]}>{children}</Text>
			)}
		</TouchableOpacity>
	);
}
