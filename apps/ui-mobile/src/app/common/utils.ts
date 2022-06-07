import {
  ActivitySession,
  ActivityTrackingMeta,
  ActivityType,
  ChartDataType,
  Sex,
  User,
} from '@fitly/shared/meta';
import { DateTime, Interval } from 'luxon';
import { v4 as uuidv4 } from 'uuid';
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
const uuid1 = uuidv4();
const uuid2 = uuidv4();
export const DEFAULT_ACTIVITY_SESSIONS: ActivitySession[] = [
  {
    id: 2,
    interval: Interval.fromDateTimes(
      DateTime.fromSQL('2022-05-22 08:15:00'),
      DateTime.fromSQL('2022-05-22 08:18:00')
    ),
    activities: [
      new ActivityTrackingMeta(
        uuid1,
        Interval.fromDateTimes(
          DateTime.fromSQL('2022-05-22 08:15:00'),
          DateTime.fromSQL('2022-05-22 08:17:00')
        ),
        ActivityType.PUSHUPS,
        1
      ),
    ],
  },
  {
    id: 1,
    interval: Interval.fromDateTimes(
      DateTime.fromSQL('2022-05-26 08:15:00'),
      DateTime.fromSQL('2022-05-26 09:25:05')
    ),
    activities: [
      new ActivityTrackingMeta(
        uuid2,
        Interval.fromDateTimes(
          DateTime.fromSQL('2022-05-26 08:15:00'),
          DateTime.fromSQL('2022-05-26 08:15:15')
        ),
        ActivityType.PUSHUPS,
        2
      ),
      new ActivityTrackingMeta(
        uuid2,
        Interval.fromDateTimes(
          DateTime.fromSQL('2022-05-26 08:15:00'),
          DateTime.fromSQL('2022-05-26 08:15:15')
        ),
        ActivityType.SQUATS,
        3
      ),
    ],
  },
];

export const DEFAULT_HOME_PLOT_DATA: ChartDataType[] = [
  { value: 0, date: new Date(2000, 1, 1) },
  { value: 0, date: new Date(2000, 1, 2) },
  { value: 0, date: new Date(2000, 1, 3) },
  { value: 0, date: new Date(2000, 1, 4) },
  { value: 0, date: new Date(2000, 1, 5) },
  { value: 0, date: new Date(2000, 1, 6) },
];
