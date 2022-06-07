import { ActivitySession, User } from '@fitly/shared/meta';
import { UiControl, IDataStore } from '@fitly/ui-control';
import MMKVStorage from './storage';
import { DEFAULT_ACTIVITY_SESSIONS, DEFAULT_USER } from '../common/utils';
import {
  ActivitySessionRaw,
  parseSession,
  serializeSession,
} from '@fitly/ui-utils';

export class DataStore implements IDataStore {
  private storage: MMKVStorage;

  constructor() {
    this.storage = new MMKVStorage();
  }

  // przykładowe zapisywanie z uzyciem Klasy Wrappera
  saveHelloWorld(newValue: string) {
    // jesli potrzeba nowych pól w storagu
    // to trzeba wejsc do ./storage.ts i dodać nową propertkę
    // z jej określoną nazwą i typem do interfejsu Storage
    // typ musi być string | number | boolean
    // wiec dla złożonych trzeba robić JSONy
    this.storage.setItem('id', 123);
  }

  readHelloWorld(): string | undefined {
    this.storage.getNumberItem('id');
    return this.storage.getStringItem('user.activities');
  }

  getUser(): User {
    const str = this.storage.getItem('user.data');

    if (str) {
      const userJson = JSON.parse(str);
      const user: User = {
        name: userJson.name,
        surname: userJson.surname,
        age: userJson.age,
        weight: userJson.weight,
        height: userJson.height,
        sex: userJson.sex,
      };
      return user;
    }

    return DEFAULT_USER;
  }

  setUser(user: User) {
    this.storage.setObject('user.data', user);
  }
  resetUser(): void {
    this.storage.setObject('user.data', DEFAULT_USER);
  }

  resetAll(): void {
    this.storage.setObject('user.data', DEFAULT_USER);
    this.storage.setObject('user.activity-sessions', DEFAULT_ACTIVITY_SESSIONS);
  }

  getActivitySessions(): ActivitySession[] {
    const sessions = this.storage.getObject<ActivitySessionRaw[]>(
      'user.activity-sessions'
    );
    return (
      sessions?.map((session) => parseSession(session)) ||
      DEFAULT_ACTIVITY_SESSIONS
    );
  }

  clearActivitySessions(): void {
    this.storage.setObject('user.activity-sessions', DEFAULT_ACTIVITY_SESSIONS);
  }

  pushActivitySession(activitySession: ActivitySession): void {
    const activities = this.storage.getObject<ActivitySessionRaw[]>(
      'user.activity-sessions'
    );
    if (activities) {
      activities.push(serializeSession(activitySession));
      this.storage.setObject('user.activity-sessions', activities);
    }
  }
}

const uiControl = new UiControl(new DataStore());
export default uiControl;
