import { DeviceInfo } from '../../events/bluetooth-module.listener';

export interface AppState {
	connectedDevice: DeviceInfo;
}

export const initialAppState: AppState = {
	connectedDevice: null,
};
