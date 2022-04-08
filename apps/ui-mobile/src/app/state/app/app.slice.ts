import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DeviceInfo } from '../../events/bluetooth-module.listener';
import { AppState, initialAppState } from './app.state';

const appSlice = createSlice({
	name: 'app',
	initialState: initialAppState,
	reducers: {
		connectedToDevice: (
			state: AppState,
			action: PayloadAction<DeviceInfo>
		) => {
			state.connectedDevice = action.payload;
		},
	},
});

export default appSlice;

export const {} = appSlice.actions;
