import { ActivityType } from '../enums';
import { Interval } from 'luxon';
import { Transform, Type } from 'class-transformer';
import { IsEnum, IsNumber } from 'class-validator';

export class ActivityTrackingMeta {
	@IsEnum(ActivityType)
	type: ActivityType = ActivityType.UNKNOWN;

	@Transform(({ value }) => Interval.fromISO(value), { toClassOnly: true })
	@Transform(({ value }) => value.toISO(), { toPlainOnly: true })
	@Type(() => Interval)
	interval!: Interval;

	@IsNumber()
	repeats = 0;

	constructor(interval: Interval, type?: ActivityType, repeats?: number) {
		if (type) this.type = type;
		if (repeats) this.repeats = repeats;
		this.interval = interval;
	}
}
