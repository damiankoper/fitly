export interface IMetaMearModule {
  setupPreviouslyConnectedMetaWear(): Promise<void>;
  connectToMetaWearDevice(mac: string): Promise<void>;
  blinkBlueLED(repeats: number): void;
  startMetaWearModules(): void;
  stopMetaWearModules(): void;
}
