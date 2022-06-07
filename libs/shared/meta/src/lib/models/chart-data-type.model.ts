import { IsDate, IsNumber } from 'class-validator';

export class ChartDataType {
  @IsNumber()
  value = 0;

  @IsDate()
  date: Date;

  constructor(value: number, date: Date) {
    this.value = value;
    this.date = date;
  }
}
