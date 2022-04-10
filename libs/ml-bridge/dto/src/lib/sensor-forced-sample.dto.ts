import { SensorForcedSample } from '@fitly/shared/meta';
import { ApiProperty } from '@nestjs/swagger';

export class SensorForcedSampleDTO extends SensorForcedSample {
  @ApiProperty({
    type: Number,
    description: 'Altitude',
  })
  override altitude?: number;

  @ApiProperty({
    type: Number,
    description: 'Pressure',
  })
  override pressure?: number;

  @ApiProperty({
    type: Number,
    description: 'Temperature',
  })
  override temperature?: number;

  @ApiProperty({
    type: Number,
    description: 'Illuminance',
  })
  override illuminance?: number;
}
