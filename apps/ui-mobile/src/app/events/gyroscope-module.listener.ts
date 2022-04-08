import { DeviceEventEmitter } from 'react-native';

export interface GyroscopeModuleEvents {
	onGyroscopeDataEmit: (device: GyroscopeData) => void;
}

export interface GyroscopeData {
	timeStamp: string;
    x: string;
	y: string;
    z: string;
}

export function addEventListenerToGyroModule<
	K extends keyof GyroscopeModuleEvents
>(eventName: K, callback: GyroscopeModuleEvents[K]) {
	DeviceEventEmitter.addListener(eventName, callback);
}
