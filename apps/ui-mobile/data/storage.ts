import { MMKV } from 'react-native-mmkv';

interface Storage {
  id: number;

  'user.activities': string;

  'user.data': string;
}

class MMKVStorage {
  public storage: MMKV;
  constructor() {
    this.storage = new MMKV({ id: 'fitly', encryptionKey: 'fitly-is-de-best' });
  }

  setItem<K extends keyof Storage>(key: K, value: Storage[K]) {
    this.storage.set(key, value);
  }

  getItem<K extends keyof Storage>(key: K): string | undefined {
    const response = this.storage.getString(key);
    if (!response) {
      console.log('reading boolean');
      this.storage.getBoolean(key);
    }
    if (!response) {
      console.log('reading number');
      this.storage.getNumber(key);
    }
    return response;
  }

  getStringItem<K extends keyof PickByType<Storage, string>>(
    key: K
  ): string | undefined {
    return this.storage.getString(key);
  }

  getNumberItem<K extends keyof PickByType<Storage, number>>(
    key: K
  ): number | undefined {
    return this.storage.getNumber(key);
  }

  getBooleanItem<K extends keyof PickByType<Storage, boolean>>(
    key: K
  ): boolean | undefined {
    return this.storage.getBoolean(key);
  }
}

export default MMKVStorage;

type PickByType<T, Value> = {
  [P in keyof T as T[P] extends Value ? P : never]: T[P];
};
