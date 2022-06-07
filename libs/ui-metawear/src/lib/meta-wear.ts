import { IMetaMearModule } from './interfaces/meta-wear-module.interface';
import { DeviceEventEmitter, EmitterSubscription } from 'react-native';
import { SimpleEventDispatcher } from 'strongly-typed-events';
import { AxesData } from '@fitly/shared/meta';

export class MetaWear {
  private moduleSubscriptions: EmitterSubscription[] = [];
  private started = false;

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
    const response = await this.module.connectToMetaWearDevice(mac);
    this.initEvents();
    return response;
  }

  public async disconnect() {
    console.log('Implement meta-wear disconnect method');
    this.destroyEvents();
  }

  public start() {
    if (!this.started) this.module.startMetaWearModules();
    this.started = true;
  }

  public stop() {
    if (this.started) this.module.stopMetaWearModules();
    this.started = false;
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
