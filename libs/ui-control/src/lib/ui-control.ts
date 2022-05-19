import { ActivitySession, ActivitySummary, ActivityTimeStats, ActivityType, ChartData, ChartDataType, User } from '@fitly/shared/meta';
import { DateTime } from 'luxon';
import { IDataStore } from './interfaces/IDataStore';

export class UiControl {
  constructor(private dataStore: IDataStore) {}

  public reset(): void {
    this.dataStore.resetAll();
  }

  public addNumbers(): number {
    return this.dataStore.getNumbers().reduce((a, b) => a + b, 0);
  }


  //   --- Global Stats ---
  public getTotalCalories(): number {

    // jeśli user nie został ustawiony
    if(this.dataStore.getUser() == null) return 0;

    const weight = this.dataStore.getUser().weight;
    let calories = 0;

    this.dataStore.getActivitySessions().forEach(session => {
      session.activities.forEach(activity => {
        calories += this.calculateCalories(activity.type, weight, activity.interval.length('minutes'));
      })
    })

    return calories;
  }

  public getTotalRepeats(): number {
    let repeats = 0;

    this.dataStore.getActivitySessions().forEach(session => {
      session.activities.forEach(activity => {
        repeats += activity.repeats;
      })
    })

    return repeats;
  }

  public getCaloriesDailyChart(): ChartData | null {
    // jeśli user nie został ustawiony
    if(this.dataStore.getUser() == null) return null;

    const now = DateTime.now();
    const data: ChartDataType[] = [];
    const weight = this.dataStore.getUser().weight;
    const sessions = this.dataStore.getActivitySessions().filter(s => this.areDateTimesTheSameDay(s.interval.start, now));

    sessions.forEach(session => {
      session.activities.forEach(activity => {
        data.push(new ChartDataType(
          this.calculateCalories(activity.type, weight, activity.interval.length('minutes')),
          activity.interval.start
        ));
      })
    })

    return new ChartData(data);
  }

  public getTimeDailyChart(): ChartData {
    const now = DateTime.now();
    const data: ChartDataType[] = [];
    const sessions = this.dataStore.getActivitySessions().filter(s => this.areDateTimesTheSameDay(s.interval.start, now));

    sessions.forEach(session => {
      session.activities.forEach(activity => {
        data.push(new ChartDataType(
          activity.interval.length('minutes'),
          activity.interval.start
        ));
      })
    })

    return new ChartData(data);
  }

  public getTimeStats(): ActivityTimeStats {
    const stats: Record<ActivityType, number> = this.initiateRecord<number>(ActivityType, 0);
    const sessions = this.dataStore.getActivitySessions();

    sessions.forEach(session => {
      session.activities.forEach(activity => {
        stats[activity.type] += activity.interval.length("minutes");
      })
    })

    return new ActivityTimeStats(stats);
  }

  //   --- Activity Session Data ---
  public getSession(id: number): ActivitySession | null {
    const session = this.dataStore.getActivitySessions().find(activity => activity.id == id);
    if(session == undefined) {
      return null;
    } else {
      return session;
    }
  }

  public getSessions(): ActivitySession[] {
    const sessions = this.dataStore.getActivitySessions();
    return sessions;
  }

  public getLastSession(): ActivitySession | null {
    const sessions = this.dataStore.getActivitySessions();
    if(sessions == undefined) {
      return null;
    } else {
      return sessions[sessions.length - 1];
    }
  }

  public saveSession(session: ActivitySession): void {
    this.dataStore.pushActivitySession(session);
  }

  //  --- User Data ---
  public getUser(): User | null {
    const user = this.dataStore.getUser();
    if(user == undefined) {
      return null;
    } else {
      return user;
    }
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
    if(this.dataStore.getUser() == null) return null;

    const summary = new ActivitySummary(0, new Date(), 0, 0);
    const weight = this.dataStore.getUser().weight;

    session.activities.forEach(activity => {
      summary.repeats += activity.repeats;
      summary.calories += this.calculateCalories(activity.type, weight, activity.interval.length('minutes'));
    })

    return summary;
  }

  public getSessionPaceChart(session: ActivitySession): ChartData {
    const data: ChartDataType[] = [];

    session.activities.forEach(activity => {
      data.push(new ChartDataType(
        activity.repeats,
        activity.interval.start
      ));
    })

    return new ChartData(data);
  }


  private calculateCalories(
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
    if(
      date1.year === date2.year &&
      date1.month === date2.month &&
      date1.day === date2.day
    )
      return true;
    else
      return false;
  }

  private initiateRecord<Y>(enumX: {[index: string]: ActivityType}, defaultValue: Y): Record<ActivityType,Y>{
    const toReturn:Record<string,Y> = {} ;
    Object.keys(enumX).forEach(key => {
        toReturn[key] = defaultValue;
    });
    return toReturn;
  }
}
