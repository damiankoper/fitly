import { ApiProperty } from '@nestjs/swagger';
import { SensorBasicSample } from './sensor-basic-sample.model';

export class SensorExtendedSample extends SensorBasicSample {
  altitude?: number;

  pressure?: number;

  illuminance?: number;
}
