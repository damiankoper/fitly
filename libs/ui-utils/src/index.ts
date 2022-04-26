import { ToastAndroid } from 'react-native';

export function showNotification(message: string) {
  ToastAndroid.show(message, ToastAndroid.SHORT);
}
