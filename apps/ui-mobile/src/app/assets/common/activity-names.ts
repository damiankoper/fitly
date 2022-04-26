import { ActivityType } from '@fitly/shared/meta';

export const ActivityNames: { [key in ActivityType]: string } = {
  [ActivityType.UNKNOWN]: 'Unknown',
  [ActivityType.PUSHUPS]: 'Pushups',
  [ActivityType.SITUPS]: 'Situps',
  [ActivityType.SQUATS]: 'Squats',
  [ActivityType.STAR_JUMPS]: 'Star jumps',
};
