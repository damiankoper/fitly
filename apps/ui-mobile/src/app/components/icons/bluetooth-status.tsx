import { Icon, Text } from '@ui-kitten/components';
import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import LinearGradientCard from '../gradients/linear-gradient-card';

interface Props {
	connected: boolean;
	onPress: () => void;
}

export const BluetoothStatus: React.FC<Props> = ({ connected, onPress }) => {
	return (
		<TouchableOpacity style={styles.wrapper} onPress={onPress}>
			<LinearGradientCard style={styles.container}>
				<Icon name="bluetooth-outline" style={styles.icon} fill={connected ? 'green' : 'red'} />
				<Text style={styles.smallText}>{connected ? 'Connected' : 'Not connected'} with device</Text>
			</LinearGradientCard>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	wrapper: {
		padding: 0,
		flex: 1,
	},
	container: {
		flex: 1,
		borderRadius: 4,
		borderColor: 'lightgray',
		borderWidth: 1,
		padding: 9,
		justifyContent: 'center',
		alignItems: 'center',
	},
	icon: {
		height: 28,
		width: 28,
	},
	smallText: {
		fontSize: 12,
		textAlign: 'center',
	},
});
