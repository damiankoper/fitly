import { ApiProperty } from '@nestjs/swagger';
import { ActivityType } from '../enums';
import { DateTime } from 'luxon';
import { Transform } from 'class-transformer';
import { IsEnum, IsNumber, IsObject } from 'class-validator';

export class ActivityTrackingMeta {
  @IsEnum(ActivityType)
  type: ActivityType = ActivityType.UNKNOWN;

  @Transform(({ value }) => DateTime.fromISO(value), { toClassOnly: true })
  @Transform(({ value }) => value.toISO(), { toPlainOnly: true })
  @IsObject()
  timestamp: DateTime = DateTime.now();

  @IsNumber()
  repeats = 0;

  constructor(type?: ActivityType, repeats?: number, timestamp?: DateTime) {
    if (type) this.type = type;
    if (repeats) this.repeats = repeats;
    if (timestamp) this.timestamp = timestamp;
  }
}
