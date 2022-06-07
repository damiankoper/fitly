import {
  ActivitySession,
  ActivitySummary,
  ActivityTimeStats,
  ActivityType,
  ChartData,
  ChartDataType,
  User,
} from '@fitly/shared/meta';
import { DateTime } from 'luxon';
import { IDataStore } from './interfaces/IDataStore';

export class UiControl {
  constructor(private dataStore: IDataStore) {}

  public reset(): void {
    this.dataStore.resetAll();
  }

  //   --- Global Stats ---
  public getTotalCalories(): number {
    // jeśli user nie został ustawiony
    if (this.dataStore.getUser() == null) return 0;

    const weight = this.dataStore.getUser().weight;
    let calories = 0;

    this.dataStore.getActivitySessions().forEach((session) => {
      session.activities.forEach((activity) => {
        calories += this.calculateCalories(
          activity.type,
          weight,
          activity.interval.length('minutes')
        );
      });
    });

    return calories;
  }

  public getTotalRepeats(): number {
    let repeats = 0;

    this.dataStore.getActivitySessions().forEach((session) => {
      session.activities.forEach((activity) => {
        repeats += activity.repeats;
      });
    });

    return repeats;
  }

  public getCaloriesDailyChart(): ChartData | null {
    // jeśli user nie został ustawiony
    if (this.dataStore.getUser() == null) return null;

    const now = DateTime.now();
    const data: ChartDataType[] = [];
    const weight = this.dataStore.getUser().weight;
    const sessions = this.dataStore
      .getActivitySessions()
      .filter((s) => this.areDateTimesTheSameDay(s.interval.start, now));

    sessions.forEach((session) => {
      session.activities.forEach((activity) => {
        data.push(
          new ChartDataType(
            this.calculateCalories(
              activity.type,
              weight,
              activity.interval.length('minutes')
            ),
            activity.interval.start.toJSDate()
          )
        );
      });
    });

    return new ChartData(data);
  }

  public getTimeDailyChart(): ChartData {
    const now = DateTime.now();
    const data: ChartDataType[] = [];
    const sessions = this.dataStore
      .getActivitySessions()
      .filter((s) => this.areDateTimesTheSameDay(s.interval.start, now));

    sessions.forEach((session) => {
      session.activities.forEach((activity) => {
        data.push(
          new ChartDataType(
            activity.interval.length('minutes'),
            activity.interval.start.toJSDate()
          )
        );
      });
    });

    return new ChartData(data);
  }

  public getTimeStats(): ActivityTimeStats {
    const stats = new ActivityTimeStats();
    const sessions = this.dataStore.getActivitySessions();

    sessions.forEach((session) => {
      session.activities.forEach((activity) => {
        stats[activity.type] += activity.interval.length('hours') || 0;
      });
    });

    return stats;
  }

  //   --- Activity Session Data ---
  public getSession(id: number): ActivitySession | null {
    const session = this.dataStore
      .getActivitySessions()
      .find((activity) => activity.id == id);
    if (session == undefined) {
      return null;
    } else {
      return session;
    }
  }

  public getSessions(): ActivitySession[] {
    return this.dataStore.getActivitySessions();
  }

  public getLastSession(): ActivitySession | null {
    const sessions = this.dataStore.getActivitySessions();
    return sessions[sessions.length - 1] || null;
  }

  public saveSession(session: ActivitySession): void {
    this.dataStore.pushActivitySession(session);
  }

  //  --- User Data ---
  public getUser(): User {
    return this.dataStore.getUser();
  }

  public setUser(user: User): void {
    this.dataStore.setUser(user);
  }

  public resetUser(): void {
    this.dataStore.resetUser();
  }

  //   --- Activity Session Stats ---
  public getSessionSummary(session: ActivitySession): ActivitySummary | null {
    // jeśli user nie został ustawiony
    if (this.dataStore.getUser() == null) return null;

    const summary = new ActivitySummary(0, new Date(), 0, 0);
    const weight = this.dataStore.getUser().weight;

    session.activities.forEach((activity) => {
      summary.repeats += activity.repeats;
      summary.calories += this.calculateCalories(
        activity.type,
        weight,
        activity.interval.length('minutes')
      );
    });

    return summary;
  }

  public getSessionPaceChart(session: ActivitySession): ChartData {
    const data: ChartDataType[] = [];

    session.activities.forEach((activity) => {
      data.push(
        new ChartDataType(activity.repeats, activity.interval.start.toJSDate())
      );
    });

    return new ChartData(data);
  }

  public calculateCalories(
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

  private areDateTimesTheSameDay(date1: DateTime, date2: DateTime): boolean {
    return date1.startOf('day').equals(date2.startOf('day'));
  }
}
