import { DeviceEventEmitter } from 'react-native';

export interface MagnetometerModuleEvents {
	onMagnetometerDataEmit: (device: MagnetometerData) => void;
}

export interface MagnetometerData {
	timeStamp: string;
    x: string;
	y: string;
    z: string;
}

export function addEventListenerToMagnetometerModule<
	K extends keyof MagnetometerModuleEvents
>(eventName: K, callback: MagnetometerModuleEvents[K]) {
	DeviceEventEmitter.addListener(eventName, callback);
}
