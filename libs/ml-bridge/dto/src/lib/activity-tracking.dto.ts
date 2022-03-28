import { ActivityTracking } from '@fitly/shared/meta';
import { ApiProperty } from '@nestjs/swagger';
import { Interval } from 'luxon';
import { ActivityTrackingMetaDTO } from './activity-tracking-meta.dto';
import { SensorBasicSampleDTO } from './sensor-basic-sample.dto';

export class ActivityTrackingDTO extends ActivityTracking {
  @ApiProperty({
    type: ActivityTrackingMetaDTO,
    description: 'Activity tracking metadata',
  })
  override meta!: ActivityTrackingMetaDTO;

  @ApiProperty({
    type: String,
    example: '2007-03-01T13:00:00Z/2008-05-11T15:30:00Z',
    description: 'Tracking interval (ISO)',
  })
  override interval!: Interval;

  @ApiProperty({
    type: SensorBasicSampleDTO,
    description: 'Samples from sensor',
  })
  override data!: SensorBasicSampleDTO[];
}
