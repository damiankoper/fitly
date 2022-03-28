import { AxesData } from './axes-data.model';
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import 'reflect-metadata';

export class SensorBasicSample {
  @ValidateNested()
  @Type(() => AxesData)
  acceleration: AxesData;

  @ValidateNested()
  @Type(() => AxesData)
  angularVelocity: AxesData;

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
