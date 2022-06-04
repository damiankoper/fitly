import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Themes } from './themes';

export interface LinearGradientCardProps {
	x?: number;
	y?: number;
	style?: StyleProp<ViewStyle>;
	theme?: Themes;
}

const LinearGradientCard: React.FC<LinearGradientCardProps> = ({
	x,
	y,
	style,
	children,
	theme,
}) => {
	let locations = [0, 1];
	let colors;
	switch (theme) {
		case 'danger':
			colors = ['#FFFDFD', '#FFE7E8'];
			break;
		case 'success':
			locations = [0, 0.6, 1];
			colors = ['#FFFFFF', '#EAFFF2', '#E0FFEC'];
			break;
		case 'basic':
			locations = [0, 1];
			colors = ['#FFFFFF', '#EDEDED'];
			break;
		case 'primary':
		default:
			colors = ['#FFFFFF', '#EAF0FF'];
			break;
	}

	return (
		<LinearGradient
			locations={locations}
			colors={colors}
			start={{ x: x || 0.45, y: y || 0.5 }}
			style={[style, { overflow: 'visible' }]}
		>
			{children}
		</LinearGradient>
	);
};

export default LinearGradientCard;
