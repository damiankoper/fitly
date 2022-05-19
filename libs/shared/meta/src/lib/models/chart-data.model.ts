import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { ChartDataType } from './chart-data-type.model';

export class ChartData {
  @ValidateNested({ each: true })
  @Type(() => ChartDataType)
  data: ChartDataType[];

  constructor(
    data: ChartDataType[] = [],
  ) {
    this.data = data;
  }
}
