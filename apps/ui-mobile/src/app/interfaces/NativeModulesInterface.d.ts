export interface NativeModulesInterface {
	MetaWearModule: {
		setupPreviouslyConnectedMetaWear: () => Promise<void>;
		connectToMetaWearDevice: (deviceAddress: string) => Promise<void>;
		blinkBlueLED: (repeat: number) => void;
		startMetaWearModules: () => void;
		stopMetaWearModules: () => void;
	};
	BluetoothModule: {
		startSearchingForBluetoothDevices: () => Promise<boolean>;
		cancelSearchingForBluetoothDevices: () => void;
		saveConnectedBluetoothDevice: (deviceAddress: string) => void;
	};
}
