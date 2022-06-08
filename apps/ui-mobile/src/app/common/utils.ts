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

export function formatActivityString(
  [first, ...rest]: string,
  capitalize = true
) {
  return (
    (capitalize ? first.toUpperCase() : first) + rest.join('').replace('_', ' ')
  );
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
let start = DateTime.now().minus({ days: 2 });
export const DEFAULT_ACTIVITY_SESSIONS: ActivitySession[] = [
  {
    id: 2,
    interval: Interval.fromDateTimes(start, start.plus({ seconds: 24 * 10 })),
    activities: new Array(24)
      .fill(0)
      .map(
        (_, i) =>
          new ActivityTrackingMeta(
            uuid1,
            Interval.fromDateTimes(
              start,
              (start = start.plus({ seconds: 10 }))
            ),
            ActivityType.PUSHUPS,
            Math.floor((Math.random() * 10) / 3) + 3
          )
      ),
  },
  {
    id: 1,
    interval: Interval.fromDateTimes(
      (start = start.plus({ hours: 1 })),
      start.plus({ seconds: 50 * 10 })
    ),
    activities: new Array(50)
      .fill(0)
      .map(
        (_, i) =>
          new ActivityTrackingMeta(
            uuid1,
            Interval.fromDateTimes(
              start,
              (start = start.plus({ seconds: 10 }))
            ),
            ActivityType.STAR_JUMPS,
            Math.floor((Math.random() * 10) / 3) + 6
          )
      ),
  },

  {
    id: 3,
    interval: Interval.fromDateTimes(
      (start = start.plus({ days: 1 })),
      start.plus({ seconds: 2 * 10 })
    ),
    activities: new Array(2)
      .fill(0)
      .map(
        (_, i) =>
          new ActivityTrackingMeta(
            uuid1,
            Interval.fromDateTimes(
              start,
              (start = start.plus({ seconds: 10 }))
            ),
            ActivityType.SITUPS,
            Math.floor((Math.random() * 10) / 3) + 6
          )
      ),
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
