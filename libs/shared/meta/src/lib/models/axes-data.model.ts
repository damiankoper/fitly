import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class AxesData {
  @IsNumber()
  x: number;

  @IsNumber()
  y: number;

  @IsNumber()
  z: number;

  constructor(x: number, y: number, z: number) {
    this.x = x;
    this.y = y;
    this.z = z;
  }
}
