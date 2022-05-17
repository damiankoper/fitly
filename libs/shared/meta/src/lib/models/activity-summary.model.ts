import { ActivityType } from '../enums';

export class ActivitySummary {

	@IsNumber()
  id = 0;

  @IsDate()
  timestamp: Date;

  @IsEnum(ActivityType)
  type: ActivityType = ActivityType.UNKNOWN;
  
	@IsNumber()
  repeats = 0;

	@IsNumber()
  calories = 0;


  constructor(
    id: number,
    timestamp: Date,
    type: ActivityType,
    repeats: number,
    calories: number
  ) {
    this.id = id;
    this.timestamp = timestamp;
    this.type = type;
    this.repeats = repeats;
    this.calories = calories;
  }
}
