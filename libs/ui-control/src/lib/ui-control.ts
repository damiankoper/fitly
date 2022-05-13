import { IDataStore } from './interfaces/IDataStore';

export class UiControl {
  constructor(private dataStore: IDataStore) {}

  public reset(): void {
    this.dataStore.resetAll();
  }

  public addNumbers(): number {
    return this.dataStore.getNumbers().reduce((a, b) => a + b, 0);
  }
}
