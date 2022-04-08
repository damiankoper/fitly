import { DateTime } from 'luxon';
import { ActivityTrackingMeta, ActivityType } from '@fitly/shared/meta';
import { ApiProperty } from '@nestjs/swagger';

export class ActivityTrackingMetaDTO extends ActivityTrackingMeta {
  @ApiProperty({
    enum: ActivityType,
    description: 'Activity type',
  })
  override type!: ActivityType;

  @ApiProperty({
    type: String,
    example: '2007-03-01T13:00:00Z/2008-05-11T15:30:00Z',
    description: 'Tracking interval (ISO)',
  })
  override interval!: Interval;

  @ApiProperty({
    type: Number,
    description: 'Activity property counter (np. steps count, repeats etc.)',
  })
  override repeats!: number;
}
