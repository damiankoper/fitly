import { ActivityType } from '@fitly/shared/meta';

export function calculateCalories(
  activityType: ActivityType,
  weight: number,
  duration: number
): number {
  // Metabolic equivalent for task
  let met = 0;

  switch (activityType) {
    case ActivityType.SITUPS:
      met = 8;
      break;
    case ActivityType.SQUATS:
      met = 7.5;
      break;
    case ActivityType.PUSHUPS:
      met = 8.5;
      break;
    case ActivityType.STAR_JUMPS:
      met = 5;
      break;
    default:
      throw new Error('Invalid activityType');
  }

  const calories = (duration * (met * 3.5 * weight)) / 200;
  return calories;
}
