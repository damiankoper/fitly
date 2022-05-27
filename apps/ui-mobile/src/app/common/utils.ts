import {
  ActivitySession,
  ActivityTrackingMeta,
  ActivityType,
  User,
} from '@fitly/shared/meta';
import { Sex } from 'libs/shared/meta/src/lib/enums/sex.enum';
import { DateTime, Interval } from 'luxon';

export function formatActivityString(activity: string) {
  // changes enum names to better looking
  return activity[0].toUpperCase() + activity.slice(1).replace('_', ' ');
}

export const DEFAULT_USER: User = {
  name: 'John',
  surname: 'Doe',
  age: 30,
  weight: 80,
  height: 180,
  sex: Sex.MALE,
};

export const DEFAULT_ACTIVITY_SESSIONS: ActivitySession[] = [
  {
    id: 1,
    interval: Interval.fromDateTimes(
      DateTime.fromSQL('2022-05-26 08:15:00'),
      DateTime.fromSQL('2022-05-26 09:25:05')
    ),
    activities: [
      new ActivityTrackingMeta(
        Interval.fromDateTimes(
          DateTime.fromSQL('2022-05-26 08:15:00'),
          DateTime.fromSQL('2022-05-26 08:15:15')
        ),
        ActivityType.PUSHUPS,
        3
      ),
      new ActivityTrackingMeta(
        Interval.fromDateTimes(
          DateTime.fromSQL('2022-05-26 08:15:16'),
          DateTime.fromSQL('2022-05-26 08:20:00')
        ),
        ActivityType.SQUATS,
        40
      ),
      new ActivityTrackingMeta(
        Interval.fromDateTimes(
          DateTime.fromSQL('2022-05-26 08:20:00'),
          DateTime.fromSQL('2022-05-26 09:25:05')
        ),
        ActivityType.SITUPS,
        155
      ),
    ],
  },
  {
    id: 2,
    interval: Interval.fromDateTimes(
      DateTime.fromSQL('2022-05-22 08:15:00'),
      DateTime.fromSQL('2022-05-22 09:25:05')
    ),
    activities: [
      new ActivityTrackingMeta(
        Interval.fromDateTimes(
          DateTime.fromSQL('2022-05-22 08:15:00'),
          DateTime.fromSQL('2022-05-22 08:16:00')
        ),
        ActivityType.PUSHUPS,
        10
      ),
      new ActivityTrackingMeta(
        Interval.fromDateTimes(
          DateTime.fromSQL('2022-05-22 08:16:00'),
          DateTime.fromSQL('2022-05-22 09:30:05')
        ),
        ActivityType.SITUPS,
        50
      ),
    ],
  },
];
