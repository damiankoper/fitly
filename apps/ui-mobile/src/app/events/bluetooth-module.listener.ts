import { DeviceEventEmitter } from 'react-native';

export interface BluetoothModuleEvents {
  onBluetoothFoundNewDevice: (device: DeviceInfo) => void;
}

export interface DeviceInfo {
  deviceName: string;
  deviceAddress: string;
}

export function addEventListenerToBluetoothModule<
  K extends keyof BluetoothModuleEvents
>(eventName: K, callback: BluetoothModuleEvents[K]) {
  DeviceEventEmitter.addListener(eventName, callback);
}
