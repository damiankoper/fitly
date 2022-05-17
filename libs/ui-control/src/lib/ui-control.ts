import { ActivitySession, ActivitySummary, ActivityTimeStats, ActivityType, ChartData, User } from '@fitly/shared/meta';
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

    let calories = 0;
    let weight = this.dataStore.getUser().weight;

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

  public getCaloriesDailyChart(): ChartData {
    return null; // todo o co cho
  }

  public getTimeDailyChart(): ChartData {
    return null;  // todo o co cho
  }

  public getTimeStats(): ActivityTimeStats {
    return null;  // todo o co cho
  }

  //   --- Activity Session Data ---
  public getSession(id: number): ActivitySession | null {
    let session = this.dataStore.getActivitySessions().find(activity => activity.id == id);
    if(session == undefined) {
      return null;
    } else {
      return session;
    }
  }

  public getSessions(): ActivitySession[] {
    let sessions = this.dataStore.getActivitySessions();
    return sessions;
  }

  public getLastSession(): ActivitySession | null {
    let sessions = this.dataStore.getActivitySessions();
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
    let user = this.dataStore.getUser();
    if(user == undefined) {
      return null;
    } else {
      return user;
    }
  }

  public setUser(user: User): void {
    this.dataStore.setUser(user); // todo spytac sie czy w tym case nie resetowac wszystkiego
  }

  public resetUser(): void {
    this.dataStore.resetUser();
  }


  //   --- Activity Session Stats ---
  public getSessionSummary(session: ActivitySession): ActivitySummary | null {
    // jeśli user nie został ustawiony
    if(this.dataStore.getUser() == null) return null;

    let summary = new ActivitySummary(0, new Date(), ActivityType.UNKNOWN, 0, 0);
    let weight = this.dataStore.getUser().weight;

    session.activities.forEach(activity => {
      summary.repeats += activity.repeats;
      summary.calories += this.calculateCalories(activity.type, weight, activity.interval.length('minutes'));
    })

    return summary;
  }

  public getSessionPaceChart(session: ActivitySession): ChartData {
    return null; // todo o co cho
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
  
}
