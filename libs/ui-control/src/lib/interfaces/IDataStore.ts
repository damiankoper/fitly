import { ActivitySession, User } from "@fitly/shared/meta";


export interface IDataStore {
  // TODO: implement rest
  resetAll(): void;

  // getNumbers shows idea of mocking return value in test
  getNumbers(): number[];


  getUser(): User;

  setUser(user: User);

  resetUser(): void;


  getActivitySessions(): ActivitySession[];

  clearActivitySessions(): void;

  pushActivitySession(activitySession: ActivitySession): void;
}
