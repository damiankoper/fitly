import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { Interval } from 'luxon';
import { ActivityTrackingMeta } from '../models/activity-tracking-meta.model';
import { SensorBasicSample } from '../models/sensor-basic-sample.model';

export class ActivityTrackingDTO {
  @ApiProperty({
    type: ActivityTrackingMeta,
    description: 'Activity tracking metadata',
  })
  @ValidateNested()
  @Type(() => ActivityTrackingMeta)
  meta: ActivityTrackingMeta;

  @ApiProperty({
    type: String,
    example: '2007-03-01T13:00:00Z/2008-05-11T15:30:00Z',
    description: 'Tracking interval (ISO)',
  })
  @Transform(({ value }) => Interval.fromISO(value), { toClassOnly: true })
  @Transform(({ value }) => value.toISO(), { toPlainOnly: true })
  interval: Interval;

  @ApiProperty({
    type: SensorBasicSample,
    description: 'Samples from sensor',
  })
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
