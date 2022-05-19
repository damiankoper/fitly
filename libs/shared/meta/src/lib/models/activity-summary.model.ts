import { IsDate, IsNumber } from 'class-validator';

export class ActivitySummary {
	@IsNumber()
  id = 0;

  @IsDate()
  timestamp: Date;
  
	@IsNumber()
  repeats = 0;

	@IsNumber()
  calories = 0;

  constructor(
    id: number,
    timestamp: Date,
    repeats: number,
    calories: number
  ) {
    this.id = id;
    this.timestamp = timestamp;
    this.repeats = repeats;
    this.calories = calories;
  }
}
