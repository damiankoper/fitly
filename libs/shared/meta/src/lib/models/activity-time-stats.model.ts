//import { Type } from 'class-transformer';
import { ActivityType } from '../enums';

type ActivityKey = {
  [key in ActivityType]: number;
};

export class ActivityTimeStats implements ActivityKey {
  public [ActivityType.UNKNOWN] = 0;
  public [ActivityType.PUSHUPS] = 0;
  public [ActivityType.SITUPS] = 0;
  public [ActivityType.SQUATS] = 0;
  public [ActivityType.STAR_JUMPS] = 0;
}
