import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class AxesData {
  @ApiProperty({
    type: Number,
    description: 'X Axis data',
  })
  @IsNumber()
  x: number;

  @ApiProperty({
    type: Number,
    description: 'Y Axis data',
  })
  @IsNumber()
  y: number;

  @ApiProperty({
    type: Number,
    description: 'Z Axis data',
  })
  @IsNumber()
  z: number;

  constructor(x: number, y: number, z: number) {
    this.x = x;
    this.y = y;
    this.z = z;
  }
}
