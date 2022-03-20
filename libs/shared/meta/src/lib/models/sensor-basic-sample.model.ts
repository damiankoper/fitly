import { ApiProperty } from '@nestjs/swagger';
import { AxesData } from './axes-data.model';
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';

export class SensorBasicSample {
  @ApiProperty({
    type: AxesData,
    description: 'Acceleration',
  })
  @ValidateNested()
  @Type(() => AxesData)
  acceleration: AxesData;

  @ApiProperty({
    type: AxesData,
    description: 'Angular velocity',
  })
  @ValidateNested()
  @Type(() => AxesData)
  angularVelocity: AxesData;

  @ApiProperty({
    type: AxesData,
    description: 'Magnetic field',
  })
  @ValidateNested()
  @Type(() => AxesData)
  magneticField: AxesData;

  constructor(
    acceleration: AxesData,
    angularVelocity: AxesData,
    magneticField: AxesData
  ) {
    this.acceleration = acceleration;
    this.angularVelocity = angularVelocity;
    this.magneticField = magneticField;
  }
}
