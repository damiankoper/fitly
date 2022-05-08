import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DeviceInfo } from '../../events/bluetooth-module.listener';
import { AppState, initialAppState } from './app.state';

const appSlice = createSlice({
	name: 'app',
	initialState: initialAppState,
	reducers: {
		setConnectedDevice: (
			state: AppState,
			action: PayloadAction<DeviceInfo>
		) => {
			state.connectedDevice = action.payload;
		},

		clearConnectedDevice: (state: AppState) => {
			state.connectedDevice = null;
		},

		restoreConnectionStart: (state: AppState) => {
			state.status.isRestoringConnection = true;
		},
		restoreConnectionStop: (state: AppState) => {
			state.status.isRestoringConnection = false;
		},
	},
});

export default appSlice;

export const {
	setConnectedDevice,
	restoreConnectionStart,
	restoreConnectionStop,
	clearConnectedDevice,
} = appSlice.actions;
