import { ToastAndroid } from 'react-native';

export const showToast = (message: string): void =>
	ToastAndroid.showWithGravity(
		message,
		ToastAndroid.SHORT,
		ToastAndroid.CENTER
	);
