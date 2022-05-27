import { ActivitySession, User } from '@fitly/shared/meta';
import { UiControl } from '@fitly/ui-control';
import { IDataStore } from 'libs/ui-control/src/lib/interfaces/IDataStore';
import MMKVStorage from './storage';
import {
  DEFAULT_ACTIVITY_SESSIONS,
  DEFAULT_USER,
} from '../src/app/common/utils';

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
    const str = JSON.stringify(user);
    this.storage.setItem('user.data', str);
  }
  resetUser(): void {
    const str = JSON.stringify(DEFAULT_USER);
    this.storage.setItem('user.data', str);
  }

  resetAll(): void {
    throw new Error('Method not implemented.');
  }

  getActivitySessions(): ActivitySession[] {
    const sessions = this.storage.getObject<ActivitySession[]>(
      'user.activity-sessions'
    );
    return sessions || DEFAULT_ACTIVITY_SESSIONS;
  }

  clearActivitySessions(): void {
    this.storage.setObject('user.activity-sessions', DEFAULT_ACTIVITY_SESSIONS);
  }
  pushActivitySession(activitySession: ActivitySession): void {
    const activities = this.storage.getObject<ActivitySession[]>(
      'user.activity-sessions'
    );
    if (activities) {
      activities.unshift(activitySession);
      this.storage.setObject('user.activity-sessions', activities);
    }
  }
}

const uiControl = new UiControl(new DataStore());
// first time user init
uiControl.resetUser();
export default uiControl;
