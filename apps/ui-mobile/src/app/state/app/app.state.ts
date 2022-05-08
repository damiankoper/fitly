import { DeviceInfo } from '../../events/bluetooth-module.listener';

export interface AppState {
	status: {
		isRestoringConnection: boolean;
	};
	connectedDevice: DeviceInfo | null;
}

export const initialAppState: AppState = {
	connectedDevice: null,
	status: {
		isRestoringConnection: true,
	},
};
