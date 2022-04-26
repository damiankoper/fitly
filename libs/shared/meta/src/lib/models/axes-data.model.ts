import { IsNumber } from 'class-validator';

export class AxesData {
  @IsNumber()
  x: number;

  @IsNumber()
  y: number;

  @IsNumber()
  z: number;

  constructor(x: number, y: number, z: number) {
    this.x = Number(x);
    this.y = Number(y);
    this.z = Number(z);
  }
}
