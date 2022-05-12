import { calculateCalories } from './caloriesCalculator';
import { ActivityType } from '../enums/activityType.enum';

describe('Calculate calories for 70kg and 30min', () => {
  it('SITUPS should equals 294', () => {
    expect(calculateCalories(ActivityType.SITUPS, 70, 30)).toBe(294);
  });

  it('SQUATS should equals 275.625', () => {
    expect(calculateCalories(ActivityType.SQUATS, 70, 30)).toBe(275.625);
  });

  it('PUSHUPS should equals 312.375', () => {
    expect(calculateCalories(ActivityType.PUSHUPS, 70, 30)).toBe(312.375);
  });

  it('STAR_JUMPS should equals 183.75', () => {
    expect(calculateCalories(ActivityType.STAR_JUMPS, 70, 30)).toBe(183.75);
  });

  it('UNKNOWN should throw exception', () => {
    expect(() => {
      calculateCalories(ActivityType.UNKNOWN, 69, 420);
    }).toThrow();
  });
});
