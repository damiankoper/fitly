import { instanceToPlain, plainToInstance } from 'class-transformer';
import { DateTime, Interval } from 'luxon';
import { ActivityType } from '../enums';
import { ActivityTrackingMeta } from './activity-tracking-meta.model';
import { AxesData } from './axes-data.model';
import { SensorAsyncSample } from './sensor-async-sample.model';
import { ActivityTracking } from './activity-tracking.model';

describe('ActivityTracking parse/serialize', () => {
  it('should parse plain object', () => {
    //given
    const interval = Interval.before(DateTime.now(), 3600);
    const timestamp = DateTime.now();
    const plainObject = {
      accelerometer: [
        {
          timestamp: timestamp.toISO(),
          data: { x: 1, y: 1, z: 1 }
        },
      ],
      meta: {
        type: ActivityType.UNKNOWN,
        interval: interval.toISO(),
        repeats: 0,
      },
    };

    //when
    const atDTO = plainToInstance(ActivityTracking, plainObject);

    //then
    expect(atDTO).toBeInstanceOf(ActivityTracking);
    expect(atDTO.meta.interval).toBeInstanceOf(Interval);
    expect(atDTO.meta).toBeInstanceOf(ActivityTrackingMeta);
    expect(atDTO.accelerometer).toBeInstanceOf(Array);
    expect(atDTO.accelerometer).toHaveLength(1);
    expect(atDTO.accelerometer[0].timestamp.equals(timestamp)).toBeTruthy();
    expect(atDTO.meta.interval.equals(interval)).toBeTruthy();
  });

  it('should serialize class object', () => {
    //given
    const interval = Interval.before(DateTime.now(), 3600);
    const timestamp = DateTime.now();
    const meta = new ActivityTrackingMeta(ActivityType.UNKNOWN, interval, 0);
    const axesData = new AxesData(1, 1, 1);
    const sensorSample = new SensorAsyncSample(axesData, timestamp);
    const data = [sensorSample];

    const classObject = new ActivityTracking(meta, data, data, data);
    const plainObject = {
      accelerometer: [
        {
          timestamp: timestamp.toISO(),
          data: { x: 1, y: 1, z: 1 }
        },
      ],
      gyroscope: [
        {
          timestamp: timestamp.toISO(),
          data: { x: 1, y: 1, z: 1 }
        },
      ],
      magnetometer: [
        {
          timestamp: timestamp.toISO(),
          data: { x: 1, y: 1, z: 1 }
        },
      ],
      meta: {
        repeats: 0,
        interval: interval.toISO(),
        type: ActivityType.UNKNOWN,
      },
    };

    //when
    const atPlain = instanceToPlain(classObject);

    //then
    expect(atPlain).toEqual(plainObject);
  });
});
