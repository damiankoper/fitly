import { MMKV } from 'react-native-mmkv';

interface Storage {
  id: number;

  'user.activities': string;

  'user.data': string;

  'user.activity-sessions': string;
}

class MMKVStorage {
  public storage: MMKV;
  constructor() {
    this.storage = new MMKV({ id: 'fitly', encryptionKey: 'fitly-is-de-best' });
  }

  setItem<K extends keyof Storage>(key: K, value: Storage[K]) {
    this.storage.set(key, value);
  }

  getItem(key: keyof Storage): string | undefined {
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

  getObject<T>(key: StorageStringObjectKey): T | undefined {
    const objectJSON = this.getStringItem(key);
    if (objectJSON) {
      return JSON.parse(objectJSON) as T;
    }
    return undefined;
  }

  setObject<T>(key: StorageStringObjectKey, value: T) {
    const objectJSON = JSON.stringify(value);
    this.setItem(key, objectJSON);
  }

  getStringItem(key: StorageStringObjectKey): string | undefined {
    return this.storage.getString(key);
  }

  getNumberItem(key: StorageNumberObjectKey): number | undefined {
    return this.storage.getNumber(key);
  }

  getBooleanItem(key: StorageBooleanObjectKey): boolean | undefined {
    return this.storage.getBoolean(key);
  }
}

export default MMKVStorage;

export type StorageStringObjectKey = keyof PickByType<Storage, string>;
export type StorageNumberObjectKey = keyof PickByType<Storage, number>;
export type StorageBooleanObjectKey = keyof PickByType<Storage, boolean>;

type PickByType<T, Value> = {
  [P in keyof T as T[P] extends Value ? P : never]: T[P];
};
