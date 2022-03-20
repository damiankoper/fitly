import { ApiProperty } from '@nestjs/swagger';
import { ActivityType } from '../enums';
import { DateTime } from 'luxon';
import { Transform, Type } from 'class-transformer';
import { IsEnum, IsISO8601, IsNumber, IsObject } from 'class-validator';

export class ActivityTrackingMeta {
  @ApiProperty({
    enum: ActivityType,
    description: 'Activity type',
  })
  @IsEnum(ActivityType)
  type: ActivityType = ActivityType.UNKNOWN;

  @ApiProperty({
    type: DateTime,
    example: '2007-03-01T13:00:00Z',
    description: 'Timestamp measurements were taken (ISO)',
  })
  @Transform(({ value }) => DateTime.fromISO(value), { toClassOnly: true })
  @Transform(({ value }) => value.toISO(), { toPlainOnly: true })
  @IsObject()
  timestamp: DateTime = DateTime.now();

  @ApiProperty({
    type: Number,
    description: 'Activity property counter (np. steps count, repeats etc.)',
  })
  @IsNumber()
  repeats = 0;

  constructor(type?: ActivityType, repeats?: number, timestamp?: DateTime) {
    if (type) this.type = type;
    if (repeats) this.repeats = repeats;
    if (timestamp) this.timestamp = timestamp;
  }
}
