import { Icon, Text } from '@ui-kitten/components';
import React from 'react';
import { TouchableOpacity, StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../../state/root.reducer';
import * as RootNavigation from '../navigation/root-navigation';

interface Props {
	iconSize?: 'large' | 'medium' | 'small';
	touchable?: boolean;
	renderOverlay?: boolean;
	renderSubText?: boolean;
	touchableStyles?: Record<string, string | number>;
	colorConnected?: string;
	colorDisconnected?: string;
}

export const BluetoothStatus: React.FC<Props> = ({
	touchable,
	touchableStyles,
	renderSubText,
	iconSize,
	renderOverlay,
	colorConnected,
	colorDisconnected,
}) => {
	const isConnectedWithDevice = useSelector((state: RootState) =>
		Boolean(state.app.connectedDevice)
	);
	const connectedDevice = useSelector(
		(state: RootState) => state.app.connectedDevice
	);

	const handleBluetoothStatusPress = () =>
		RootNavigation.navigate('BluetoothConnection');

	console.log('ConnectedDevice:', connectedDevice);

	let Body = (
		<>
			<Icon
				name="bluetooth-outline"
				style={iconStyles[iconSize || 'medium']}
				fill={isConnectedWithDevice ? 'green' : 'red'}
			/>
			{renderSubText && (
				<Text style={styles.smallText}>
					{isConnectedWithDevice ? 'Connected' : 'Not connected'}
				</Text>
			)}
		</>
	);

	if (renderOverlay) {
		Body = (
			<View
				style={[
					styles.container,
					{
						backgroundColor: isConnectedWithDevice
							? colorConnected
							: colorDisconnected,
					},
				]}
			>
				{Body}
			</View>
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
		borderRadius: 20,
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
