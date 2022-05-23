//import { Type } from 'class-transformer';
import { ActivityType } from '../enums';

export class ActivityTimeStats {
  //@Type(() => { [key in ActivityType]: number })
	type: Record<ActivityType, number>;

	constructor(type: Record<ActivityType, number>) {
		this.type = type;
	}
}
