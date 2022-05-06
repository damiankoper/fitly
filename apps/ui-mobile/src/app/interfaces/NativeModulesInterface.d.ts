export interface NativeModulesInterface {
	MetaWearModule: {
		connectToMetaWearDevice: (deviceAddress: string) => Promise<void>;
		blinkBlueLED: (repeat: number) => void;
		startMetaWearModules: () => void;
		stopMetaWearModules: () => void;
	};
	BluetoothModule: {
		startSearchingForBluetoothDevices: () => Promise<boolean>;
		cancelSearchingForBluetoothDevices: () => void;
		saveConnectedBluetoothDevice: (deviceAddress: string) => void;
		getSavedConnectedBluetoothDevice: () => Promise<string | null>;
		checkConnectionWithMetaWearDevice: () => Promise<boolean>;
	};
}
