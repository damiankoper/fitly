import { DeviceEventEmitter } from 'react-native';

export interface AccelerometerModuleEvents {
  onAccelerometerDataEmit: (device: AccelerometerData) => void;
}

export interface AccelerometerData {
  timeStamp: string;
  x: string;
  y: string;
  z: string;
}

export function addEventListenerToAcceleometerModule<
  K extends keyof AccelerometerModuleEvents
>(eventName: K, callback: AccelerometerModuleEvents[K]) {
  DeviceEventEmitter.addListener(eventName, callback);
}
