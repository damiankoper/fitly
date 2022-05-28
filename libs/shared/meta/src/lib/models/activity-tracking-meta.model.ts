import { ActivityType } from '../enums';
import { Interval } from 'luxon';
import { Transform, Type } from 'class-transformer';
import { IsEnum, IsNumber, IsUUID } from 'class-validator';

export class ActivityTrackingMeta {
  @IsUUID()
  uuid: string;

  @IsEnum(ActivityType)
  type: ActivityType = ActivityType.UNKNOWN;

  @Transform(({ value }) => Interval.fromISO(value), { toClassOnly: true })
  @Transform(({ value }) => value.toISO(), { toPlainOnly: true })
  @Type(() => Interval)
  interval!: Interval;

  @IsNumber()
  repeats = 0;

  constructor(
    uuid: string,
    interval: Interval,
    type?: ActivityType,
    repeats?: number
  ) {
    if (type) this.type = type;
    if (repeats) this.repeats = repeats;
    this.interval = interval;
    this.uuid = uuid;
  }
}
