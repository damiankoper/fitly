import { ActivitySession, User } from '@fitly/shared/meta';

export interface IDataStore {
  // TODO: implement rest
  resetAll(): void;

  getUser(): User;

  setUser(user: User);

  resetUser(): void;

  getActivitySessions(): ActivitySession[];

  clearActivitySessions(): void;

  pushActivitySession(activitySession: ActivitySession): void;
}
