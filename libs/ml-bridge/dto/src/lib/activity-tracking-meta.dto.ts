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
    type: DateTime,
    example: '2007-03-01T13:00:00Z',
    description: 'Timestamp measurements were taken (ISO)',
  })
  override timestamp!: DateTime;

  @ApiProperty({
    type: Number,
    description: 'Activity property counter (np. steps count, repeats etc.)',
  })
  override repeats!: number;
}
