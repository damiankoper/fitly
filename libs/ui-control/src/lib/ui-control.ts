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

  public getCaloriesDailyChart(): ChartData {
    const weight = this.dataStore.getUser().weight;
    const now = DateTime.now().startOf('day');
    const from = now.minus({ days: 7 });
    const items: ChartDataType[] = [];
    const sessions = this.dataStore.getActivitySessions();

    for (let d = from; d < now; d = d.plus({ days: 1 })) {
      const sessionsThatDay = sessions.filter((s) =>
        this.isDateSame(s.interval.start, d)
      );
      const data = new ChartDataType(0, d.toJSDate());
      sessionsThatDay.forEach((session) => {
        session.activities.forEach((activity) => {
          data.value += this.calculateCalories(
            activity.type,
            weight,
            activity.interval.length('minutes')
          );
        });
      });
      items.push(data);
    }
    console.log(items);

    return new ChartData(items);
  }

  public getTimeDailyChart(): ChartData {
    const now = DateTime.now();
    const data: ChartDataType[] = [];
    const sessions = this.dataStore
      .getActivitySessions()
      .filter((s) => this.isDateSame(s.interval.start, now));

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
    return this.sortSessions(this.dataStore.getActivitySessions());
  }

  public getLastSession(): ActivitySession | null {
    const sessions = this.dataStore.getActivitySessions();
    return this.sortSessions(sessions)[0] || null;
  }

  private sortSessions(sessions: ActivitySession[]): ActivitySession[] {
    return sessions.sort((a, b) => +b.interval.start - +a.interval.start);
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
    const summary = new ActivitySummary(
      0,
      session.interval.start.toJSDate(),
      0,
      0
    );
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
    const windowCoefficient = 60 / 10;

    session.activities.forEach((activity) => {
      data.push(
        new ChartDataType(
          activity.repeats * windowCoefficient,
          activity.interval.start.toJSDate()
        )
      );
    });

    if (data.length) {
      const last = data[data.length - 1];
      data.push(new ChartDataType(last.value, session.interval.end.toJSDate()));
    }

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

  private isDateSame(date1: DateTime, date2: DateTime): boolean {
    return date1.startOf('day').equals(date2.startOf('day'));
  }
}
