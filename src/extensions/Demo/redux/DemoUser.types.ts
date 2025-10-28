import { jObjectLittle } from 'jamespot-user-api';

export type DemoState = {
  entities: jObjectLittle[];
  loading: 'idle' | 'pending';
  keyword: string;
};
export type DemoRootState = {
  demoUser: DemoState;
};
