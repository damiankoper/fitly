import { ActivityType } from '../enums';
import { IsEnum } from 'class-validator';

export class ActivityTimeStats {

	@IsEnum(ActivityType)
	type: ActivityType = ActivityType.UNKNOWN;


	constructor(type: ActivityType) {
		this.type = type;
	}
}
