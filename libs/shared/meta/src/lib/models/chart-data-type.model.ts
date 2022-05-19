import { IsDate, IsNumber } from 'class-validator';

export class ChartDataType {
  @IsNumber()
	value = 0;

  @IsDate()
	date: Date;

  constructor (
    value,
    date
  ) {
    this.value = value;
    this.date = date;
  }
}