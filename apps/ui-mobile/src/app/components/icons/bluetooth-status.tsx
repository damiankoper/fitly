import { Icon, Text } from '@ui-kitten/components';
import React from 'react';
import { TouchableOpacity, StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';
import { commonStyles } from '../../assets/common/styles';
import { RootState } from '../../state/root.reducer';
import DropShadowWrapper from '../gradients/drop-shadow';
import LinearGradientCard from '../gradients/linear-gradient-card';
import { Themes } from '../gradients/themes';
import * as RootNavigation from '../navigation/root-navigation';

interface Props {
	iconSize?: 'large' | 'medium' | 'small';
	touchable?: boolean;
	renderOverlay?: boolean;
	renderSubText?: boolean;
	touchableStyles?: any;
}

export const BluetoothStatus: React.FC<Props> = ({
	touchable,
	touchableStyles,
	renderSubText,
	iconSize,
	renderOverlay,
}) => {
	const isConnectedWithDevice = useSelector((state: RootState) =>
		Boolean(state.app.connectedDevice)
	);

	const theme: Themes = isConnectedWithDevice ? 'success' : 'danger';

	const handleBluetoothStatusPress = () =>
		RootNavigation.navigate('BluetoothConnection');

	let Body = (
		<>
			<Icon
				name="bluetooth-outline"
				style={iconStyles[iconSize || 'medium']}
				fill={isConnectedWithDevice ? 'green' : 'red'}
			/>
			{renderSubText && (
				<Text style={styles.smallText}>
					{isConnectedWithDevice
						? 'Connected with device'
						: 'No device connected'}
				</Text>
			)}
		</>
	);

	if (renderOverlay) {
		Body = (
			<DropShadowWrapper
				style={{ height: 80, padding: 0 }}
				shadowColorTheme={theme}
			>
				<LinearGradientCard
					style={[
						styles.container,
						commonStyles.defaultBorder,
						{ padding: 0 },
					]}
					theme={theme}
				>
					<View
						style={[styles.container, commonStyles.defaultBorder]}
					>
						{Body}
					</View>
				</LinearGradientCard>
			</DropShadowWrapper>
		);
	}

	if (touchable) {
		Body = (
			<TouchableOpacity
				style={touchableStyles}
				onPress={handleBluetoothStatusPress}
			>
				{Body}
			</TouchableOpacity>
		);
	}

	return Body;
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 9,
		justifyContent: 'center',
		alignItems: 'center',
	},
	smallText: {
		fontSize: 12,
		textAlign: 'center',
	},
});

const iconStyles = StyleSheet.create({
	large: {
		height: 28,
		width: 28,
	},
	medium: {
		height: 24,
		width: 24,
	},
	small: {
		height: 21,
		width: 21,
	},
});
