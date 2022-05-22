import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import DropShadow from 'react-native-drop-shadow';
import { Themes } from './themes';

export interface DropShadowWrapperProps {
	shadowColorTheme?: Themes;
	style?: StyleProp<ViewStyle>;
}

const DropShadowWrapper: React.FC<DropShadowWrapperProps> = ({
	shadowColorTheme,
	children,
	style,
}) => {
	let shadowColor;
	switch (shadowColorTheme) {
		case 'danger':
			shadowColor = '#743A3A';
			break;
		case 'basic':
			shadowColor = '#55555e';
			break;
		case 'success':
			shadowColor = '#C6FFDD';
			break;
		case 'primary':
		default:
			shadowColor = '#1549E2';
			break;
	}

	return (
		<DropShadow
			style={[
				{
					shadowColor,
					shadowOffset: {
						width: 0,
						height: 3,
					},
					shadowOpacity: 0.25,
					shadowRadius: 3,
					overflow: 'visible',
				},
				style,
			]}
		>
			{children}
		</DropShadow>
	);
};

export default DropShadowWrapper;
