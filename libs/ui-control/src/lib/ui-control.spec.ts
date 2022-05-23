import { ActivitySession, ActivityTrackingMeta, ActivityType, User } from '@fitly/shared/meta';
import { Sex } from 'libs/shared/meta/src/lib/enums/sex.enum';
import { DateTime, Interval } from 'luxon';
import { IDataStore } from './interfaces/IDataStore';
import { UiControl } from './ui-control';
jest.mock('./interfaces/IDataStore.ts');

describe('uiControl', () => {
  let uiControl: UiControl;

  const dataStore = {
    resetAll: jest.fn(),
    getNumbers: jest.fn(),
    getUser: jest.fn(),
    getActivitySessions: jest.fn(),
  } as unknown as jest.Mocked<IDataStore>;

  beforeEach(() => {
    jest.resetAllMocks();
    uiControl = new UiControl(dataStore);
  });

  it('should reset data', () => {
    // when
    uiControl.reset();

    // then
    expect(dataStore.resetAll).toBeCalledTimes(1);
  });

  it('should add numbers', () => {
    // given
    dataStore.getNumbers.mockReturnValue([2, 3, 4]);

    // when
    const result = uiControl.addNumbers();

    // then
    expect(result).toEqual(9);
    expect(dataStore.getNumbers).toBeCalledTimes(1);
  });
  
  it('should return total calories', () => {
    // given
    dataStore.getUser.mockReturnValue(new User('Kopcuch', 'Elo', 56, 120, 110, Sex.FEMALE));
    let start = DateTime.now();
    let end = DateTime.fromMillis(start.toMillis() + 300000)
    dataStore.getActivitySessions.mockReturnValue([new ActivitySession(Interval.fromDateTimes(start, end),
      [new ActivityTrackingMeta(Interval.fromDateTimes(start, end), ActivityType.PUSHUPS, 16)], 10)]);

    // when
    const result = uiControl.getTotalCalories();

    // then
    expect(result).toEqual(89.25);
    expect(dataStore.getUser).toBeCalledTimes(2);
    expect(dataStore.getActivitySessions).toBeCalledTimes(1);
  });
  
  it('should return total repeats', () => {
    // given
    let start = DateTime.now();
    let end = DateTime.fromMillis(start.toMillis() + 300000)
    dataStore.getActivitySessions.mockReturnValue([new ActivitySession(Interval.fromDateTimes(start, end),
      [new ActivityTrackingMeta(Interval.fromDateTimes(start, end), ActivityType.PUSHUPS, 16)], 10)]);

    // when
    const result = uiControl.getTotalRepeats();

    // then
    expect(result).toEqual(16);
    expect(dataStore.getActivitySessions).toBeCalledTimes(1);
  });
  
  it('should return time stats', () => {
    // given
    let start = DateTime.now();
    let end = DateTime.fromMillis(start.toMillis() + 300000);
    dataStore.getActivitySessions.mockReturnValue([new ActivitySession(Interval.fromDateTimes(start, end), [new ActivityTrackingMeta(Interval.fromDateTimes(start, end), ActivityType.PUSHUPS, 16)], 10)]);

    // when
    const result = uiControl.getTimeStats();

    // then
    expect(result.type.pushups).toEqual(5);
    expect(dataStore.getActivitySessions).toBeCalledTimes(1);
  });
  
  it('should return null', () => {
    // given
    //dataStore.getUser.mockReturnValue(null);
    let start = DateTime.now();
    let end = DateTime.fromMillis(start.toMillis() + 300000)
    let session = new ActivitySession(Interval.fromDateTimes(start, end),
    [new ActivityTrackingMeta(Interval.fromDateTimes(start, end), ActivityType.PUSHUPS, 16)], 10);

    // when
    const result = uiControl.getSessionSummary(session);

    // then
    expect(result).toBeNull();
    expect(dataStore.getUser).toBeCalledTimes(2);
  });
});
