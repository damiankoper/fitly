export interface NativeModulesInterface {
	MetaWearModule: {
		connectToMetaWearDevice: (deviceAddress: string) => Promise<void>;
		blinkBlueLED: (repeat: number) => void;
	};
	BluetoothModule: {
		startSearchingForBluetoothDevices: () => Promise<boolean>;
		cancelSearchingForBluetoothDevices: () => void;
	};
}
