import { instanceToPlain, plainToInstance } from 'class-transformer';
import { DateTime, Interval } from 'luxon';
import { ActivityType } from '../enums';
import { ActivityTrackingMeta } from './activity-tracking-meta.model';
import { AxesData } from './axes-data.model';
import { SensorBasicSample } from './sensor-basic-sample.model';
import { ActivityTracking } from './activity-tracking.model';
describe('ActivityTracking parse/serialize', () => {
  it('should parse plain object', () => {
    //given
    const interval = Interval.before(DateTime.now(), 3600);
    const timestamp = DateTime.now();
    const plainObject = {
      interval: interval.toISO(),
      data: [
        {
          angularVelocity: { x: 1, y: 1, z: 1 },
          acceleration: { x: 1, y: 1, z: 1 },
          magneticField: { x: 1, y: 1, z: 1 },
        },
      ],
      meta: {
        repeats: 0,
        timestamp: timestamp.toISO(),
        type: ActivityType.UNKNOWN,
      },
    };

    //when
    const atDTO = plainToInstance(ActivityTracking, plainObject);

    //then
    expect(atDTO).toBeInstanceOf(ActivityTracking);
    expect(atDTO.interval).toBeInstanceOf(Interval);
    expect(atDTO.meta).toBeInstanceOf(ActivityTrackingMeta);
    expect(atDTO.data).toBeInstanceOf(Array);
    expect(atDTO.data).toHaveLength(1);
    expect(atDTO.interval.equals(interval)).toBeTruthy();
    expect(atDTO.meta.timestamp.equals(timestamp)).toBeTruthy();
  });

  it('should serialize class object', () => {
    //given
    const interval = Interval.before(DateTime.now(), 3600);
    const timestamp = DateTime.now();
    const meta = new ActivityTrackingMeta(ActivityType.UNKNOWN, 0, timestamp);
    const axesData = new AxesData(1, 1, 1);
    const sensorSample = new SensorBasicSample(axesData, axesData, axesData);
    const data = [sensorSample];

    const classObject = new ActivityTracking(meta, interval, data);
    const plainObject = {
      interval: interval.toISO(),
      data: [
        {
          angularVelocity: { x: 1, y: 1, z: 1 },
          acceleration: { x: 1, y: 1, z: 1 },
          magneticField: { x: 1, y: 1, z: 1 },
        },
      ],
      meta: {
        repeats: 0,
        timestamp: timestamp.toISO(),
        type: ActivityType.UNKNOWN,
      },
    };

    //when
    const atPlain = instanceToPlain(classObject);

    //then
    expect(atPlain).toEqual(plainObject);
  });
});
