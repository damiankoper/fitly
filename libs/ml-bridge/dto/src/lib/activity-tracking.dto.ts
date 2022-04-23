import { ActivityTracking } from '@fitly/shared/meta';
import { ApiProperty } from '@nestjs/swagger';
import { ActivityTrackingMetaDTO } from './activity-tracking-meta.dto';
import { SensorAsyncSampleDTO } from './sensor-async-sample.dto';

export class ActivityTrackingDTO extends ActivityTracking {
  @ApiProperty({
    type: ActivityTrackingMetaDTO,
    description: 'Activity tracking metadata',
  })
  override meta!: ActivityTrackingMetaDTO;

  @ApiProperty({
    type: SensorAsyncSampleDTO,
    description: 'Samples from accelerometer sensor',
  })
  override accelerometer!: SensorAsyncSampleDTO[];

  @ApiProperty({
    type: SensorAsyncSampleDTO,
    description: 'Samples from gyroscope sensor',
  })
  override gyroscope!: SensorAsyncSampleDTO[];

  @ApiProperty({
    type: SensorAsyncSampleDTO,
    description: 'Samples from magnetometer sensor',
  })
  override magnetometer!: SensorAsyncSampleDTO[];
}
