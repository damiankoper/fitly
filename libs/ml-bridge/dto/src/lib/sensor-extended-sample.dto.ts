import { SensorExtendedSample } from '@fitly/shared/meta';
import { ApiProperty } from '@nestjs/swagger';

export class SensorExtendedSampleDTO extends SensorExtendedSample {
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
    description: 'Illuminance',
  })
  override illuminance?: number;
}
