import { jUserLittle } from 'jamespot-user-api';

export type SampleRouteUserState = {
  entities: jUserLittle[];
  loading: 'idle' | 'pending';
};
export type SampleRouteUserRootState = {
  sampleRouteUser: SampleRouteUserState;
};
