import { Transform, Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { Interval } from 'luxon';
import { ActivityTrackingMeta } from './activity-tracking-meta.model';
import { SensorBasicSample } from './sensor-basic-sample.model';

export class ActivityTracking {
  @ValidateNested()
  @Type(() => ActivityTrackingMeta)
  meta: ActivityTrackingMeta;

  @Transform(({ value }) => Interval.fromISO(value), { toClassOnly: true })
  @Transform(({ value }) => value.toISO(), { toPlainOnly: true })
  interval: Interval;

  @ValidateNested({ each: true })
  @Type(() => SensorBasicSample)
  data: SensorBasicSample[];

  constructor(
    meta: ActivityTrackingMeta,
    interval: Interval,
    data: SensorBasicSample[] = []
  ) {
    this.meta = meta;
    this.interval = interval;
    this.data = data;
  }
}
