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
    const plainSensorAsync = {
      timestamp: timestamp.toISO(),
      data: { x: 1, y: 1, z: 1 },
    };
    const plainObject = {
      accelerometer: [plainSensorAsync],
      gyroscope: [plainSensorAsync],
      magnetometer: [plainSensorAsync],
      meta: {
        repeats: 0,
        interval: interval.toISO(),
        type: ActivityType.UNKNOWN,
      },
    };

    //when
    const atDTO = plainToInstance(ActivityTracking, plainObject);

    //then
    expect(atDTO).toBeInstanceOf(ActivityTracking);
    expect(atDTO.meta.interval).toBeInstanceOf(Interval);
    expect(atDTO.meta).toBeInstanceOf(ActivityTrackingMeta);
    expect(atDTO.accelerometer).toBeInstanceOf(Array);
    expect(atDTO.gyroscope).toBeInstanceOf(Array);
    expect(atDTO.magnetometer).toBeInstanceOf(Array);
    expect(atDTO.accelerometer).toHaveLength(1);
    expect(atDTO.gyroscope).toHaveLength(1);
    expect(atDTO.magnetometer).toHaveLength(1);
    expect(atDTO.meta.interval.equals(interval)).toBeTruthy();
  });

  it('should serialize class object', () => {
    //given
    const interval = Interval.before(DateTime.now(), 3600);
    const timestamp = DateTime.now();
    const plainSensorAsync = {
      timestamp: timestamp.toISO(),
      data: { x: 1, y: 1, z: 1 },
    };
    const meta = new ActivityTrackingMeta(interval, ActivityType.UNKNOWN, 0);
    const axesData = new AxesData(1, 1, 1);

    const accSensorSample = new SensorAsyncSample(axesData, timestamp);
    const gyroSensorSample = new SensorAsyncSample(axesData, timestamp);
    const magnSensorSample = new SensorAsyncSample(axesData, timestamp);
    const accData = [accSensorSample];
    const gyroData = [gyroSensorSample];
    const magnData = [magnSensorSample];

    const classObject = new ActivityTracking(meta, accData, gyroData, magnData);
    const plainObject = {
      accelerometer: [plainSensorAsync],
      gyroscope: [plainSensorAsync],
      magnetometer: [plainSensorAsync],
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
