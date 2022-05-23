import { ActivitySession, User } from '@fitly/shared/meta';
import { UiControl } from '@fitly/ui-control';
import { IDataStore } from 'libs/ui-control/src/lib/interfaces/IDataStore';
import { MMKV } from 'react-native-mmkv';
import MMKVStorage from './storage';

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
    this.storage.setItem('id', 123);
  }

  readHelloWorld(): string | undefined {
    this.storage.getNumberItem('id');
    return this.storage.getStringItem('user.activities');
  }

  getUser(): User {
    throw new Error('Method not implemented.');
  }
  setUser(user: User) {
    throw new Error('Method not implemented.');
  }
  resetUser(): void {
    throw new Error('Method not implemented.');
  }

  resetAll(): void {
    throw new Error('Method not implemented.');
  }
  getActivitySessions(): ActivitySession[] {
    throw new Error('Method not implemented.');
  }

  clearActivitySessions(): void {
    throw new Error('Method not implemented.');
  }
  pushActivitySession(activitySession: ActivitySession): void {
    throw new Error('Method not implemented.');
  }

  getNumbers(): number[] {
    throw new Error('You should not invoke this function!');
  }
}

const uiControl = new UiControl(new DataStore());
export default uiControl;
