import { ApiProperty } from '@nestjs/swagger';
import { SensorBasicSample } from './sensor-basic-sample.model';

export class SensorExtendedSample extends SensorBasicSample {
  @ApiProperty({
    type: Number,
    description: 'Altitude',
  })
  altitude?: number;

  @ApiProperty({
    type: Number,
    description: 'Pressure',
  })
  pressure?: number;

  @ApiProperty({
    type: Number,
    description: 'Illuminance',
  })
  illuminance?: number;
}
