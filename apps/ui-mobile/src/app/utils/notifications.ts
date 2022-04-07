import { ToastAndroid } from 'react-native';

export const showNotification = (message: string): void =>
	ToastAndroid.showWithGravity(
		message,
		ToastAndroid.SHORT,
		ToastAndroid.CENTER
	);
