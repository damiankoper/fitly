import { ActivitySession, User } from '@fitly/shared/meta';

export interface IDataStore {
  resetAll(): void;

  getUser(): User;

  setUser(user: User);

  resetUser(): void;

  getActivitySessions(): ActivitySession[];

  resetActivitySessions(): void;

  pushActivitySession(activitySession: ActivitySession): void;
}
