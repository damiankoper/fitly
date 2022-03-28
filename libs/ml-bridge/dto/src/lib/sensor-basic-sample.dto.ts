import { ApiProperty } from '@nestjs/swagger';
import { SensorBasicSample } from '@fitly/shared/meta';
import { AxesDataDTO } from './axes-data.dto';

export class SensorBasicSampleDTO extends SensorBasicSample {
  @ApiProperty({
    type: AxesDataDTO,
    description: 'Acceleration',
  })
  override acceleration!: AxesDataDTO;

  @ApiProperty({
    type: AxesDataDTO,
    description: 'Angular velocity',
  })
  override angularVelocity!: AxesDataDTO;

  @ApiProperty({
    type: AxesDataDTO,
    description: 'Magnetic field',
  })
  override magneticField!: AxesDataDTO;
}
