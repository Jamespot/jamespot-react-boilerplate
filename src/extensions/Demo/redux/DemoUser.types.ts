import { jUserLittle } from 'jamespot-user-api';

export type DemoUserState = {
  entities: jUserLittle[];
  loading: 'idle' | 'pending';
};
export type DemoUserRootState = {
  demoUser: DemoUserState;
};
