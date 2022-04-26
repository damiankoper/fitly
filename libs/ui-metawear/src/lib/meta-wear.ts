import { IMetaMearModule } from './interfaces/meta-wear-module.interface';
import { DeviceEventEmitter, EmitterSubscription } from 'react-native';
import { SimpleEventDispatcher } from 'strongly-typed-events';
import { AxesData } from '@fitly/shared/meta';

export class MetaWear {
  private moduleSubscriptions: EmitterSubscription[] = [];

  private _magnetometerData = new SimpleEventDispatcher<AxesData>();
  public get magnetometerData() {
    return this._magnetometerData.asEvent();
  }

  private _accelerometerData = new SimpleEventDispatcher<AxesData>();
  public get accelerometerData() {
    return this._accelerometerData.asEvent();
  }

  private _gyroscopeData = new SimpleEventDispatcher<AxesData>();
  public get gyroscopeData() {
    return this._gyroscopeData.asEvent();
  }

  constructor(private module: IMetaMearModule) {}

  public async connect(mac: string) {
    await this.module.connectToMetaWearDevice(mac);
    this.initEvents();
  }

  public async disconnect() {
    // TODO
    console.warn('Implement meta-wear disconnect method');
    this.destroyEvents();
  }

  public start() {
    this.module.startMetaWearModules();
  }

  public stop() {
    this.module.stopMetaWearModules();
  }

  public blinkLED(times: number) {
    this.module.blinkBlueLED(times);
  }

  private initEvents() {
    this.moduleSubscriptions.push(
      DeviceEventEmitter.addListener('onMagnetometerDataEmit', (data) => {
        this._magnetometerData.dispatch(new AxesData(data.x, data.y, data.z));
      }),
      DeviceEventEmitter.addListener('onGyroscopeDataEmit', (data) => {
        this._gyroscopeData.dispatch(new AxesData(data.x, data.y, data.z));
      }),
      DeviceEventEmitter.addListener('onAccelerometerDataEmit', (data) => {
        this._accelerometerData.dispatch(new AxesData(data.x, data.y, data.z));
      })
    );
  }

  private destroyEvents() {
    this.moduleSubscriptions.forEach((s) => s.remove());
  }
}