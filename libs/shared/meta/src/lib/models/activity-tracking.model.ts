import { Transform, Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { Interval } from 'luxon';
import { ActivityTrackingMeta } from './activity-tracking-meta.model';
import { SensorAsyncSample } from './sensor-async-sample.model';

export class ActivityTracking {
  @ValidateNested()
  @Type(() => ActivityTrackingMeta)
  meta: ActivityTrackingMeta;

  @ValidateNested({ each: true })
  @Type(() => SensorAsyncSample)
  accelerometer: SensorAsyncSample[];

  @ValidateNested({ each: true })
  @Type(() => SensorAsyncSample)
  gyroscope: SensorAsyncSample[];

  @ValidateNested({ each: true })
  @Type(() => SensorAsyncSample)
  magnetometer: SensorAsyncSample[];

  constructor(
    meta: ActivityTrackingMeta,
    accelerometer: SensorAsyncSample[] = [],
    gyroscope: SensorAsyncSample[] = [],
    magnetometer: SensorAsyncSample[] = []
  ) {
    this.meta = meta;
    this.accelerometer = accelerometer;
    this.gyroscope = gyroscope;
    this.magnetometer = magnetometer;
  }
}
