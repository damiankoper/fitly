import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { ActivityTrackingMeta } from './activity-tracking-meta.model';
import { Interval } from 'luxon';

export class ActivitySession {

	@IsNumber()
  id = 0;
  
  @Transform(({ value }) => Interval.fromISO(value), { toClassOnly: true })
	@Transform(({ value }) => value.toISO(), { toPlainOnly: true })
	@Type(() => Interval)
  interval!: Interval;
  
  @ValidateNested({ each: true })
  @Type(() => ActivityTrackingMeta)
  activities: ActivityTrackingMeta[];


  constructor(
    interval: Interval,
    activities: ActivityTrackingMeta[] = [],
    id?: number
  ) {
    this.interval = interval;
    this.activities = activities;
		if (id) this.id = id;
  }
}
