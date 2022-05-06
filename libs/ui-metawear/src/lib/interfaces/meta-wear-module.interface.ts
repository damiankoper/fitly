export interface IMetaMearModule {
	setupPreviouslyConnectedMetaWear(): Promise<void>;
	connectToMetaWearDevice(mac: string): Promise<boolean>;
	blinkBlueLED(repeats: number): void;
	startMetaWearModules(): void;
	stopMetaWearModules(): void;
}
