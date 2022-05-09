import { ActivityType } from '../enums';
import { Interval } from 'luxon';
import { Transform } from 'class-transformer';
import { IsEnum, IsNumber, IsObject } from 'class-validator';

export class ActivityTrackingMeta {
  @IsEnum(ActivityType)
  type: ActivityType = ActivityType.UNKNOWN;

  @Transform(({ value }) => Interval.fromISO(value), { toClassOnly: true })
  @Transform(({ value }) => value.toISO(), { toPlainOnly: true })
  interval!: Interval;

  @IsNumber()
  repeats = 0;

  constructor(type?: ActivityType, interval?: Interval, repeats?: number) {
    if (type) this.type = type;
    if (repeats) this.repeats = repeats;
    if (interval) this.interval = interval;
  }
}
