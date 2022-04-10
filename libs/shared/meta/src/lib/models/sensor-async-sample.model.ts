import { AxesData } from './axes-data.model';
import { Transform, Type } from 'class-transformer';
import { IsObject, ValidateNested } from 'class-validator';
import 'reflect-metadata';
import { DateTime } from 'luxon';

export class SensorAsyncSample {
  @Transform(({ value }) => DateTime.fromISO(value), { toClassOnly: true })
  @Transform(({ value }) => value.toISO(), { toPlainOnly: true })
  @IsObject()
  timestamp: DateTime = DateTime.now();

  @ValidateNested()
  @Type(() => AxesData)
  data: AxesData;

  constructor(data: AxesData, timestamp?: DateTime) {
    this.data = data;
    if (timestamp) this.timestamp = timestamp;
  }
}
