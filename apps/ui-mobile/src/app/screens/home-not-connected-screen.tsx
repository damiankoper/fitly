import React from 'react';
import { Layout, Text, Button } from '@ui-kitten/components';
import { Image, StyleSheet } from 'react-native';

export const NotConnectedScreen = () => {
	return (
		<Layout style={styles.container}>
			<Image source={require('../assets/images/not-connected.png')} />
			<Text category="h1" style={styles.bluetoothTitle}>
				Connect with new device via{' '}
				<Text status="primary" category="h1">
					Bluetooth
				</Text>{' '}
				!
			</Text>
			<Text style={styles.description}>
				Turn on bluetooth connection and search for divices that starts
				with name Metawear. Click on it to pair. The band LED light will
				start blinking.
			</Text>
			<Button style={styles.button} size="large">
				Connect with your wrist Band!
			</Button>
		</Layout>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
	},
	bluetoothTitle: {
		textAlign: 'center',
		marginTop: 16,
	},
	description: {
		textAlign: 'center',
		padding: 16,
	},
	button: {
		marginTop: 16,
	},
});
