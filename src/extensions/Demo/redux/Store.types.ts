import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { JamespotUserApi } from 'jamespot-user-api';
import { DemoRootState } from './DemoUser.types';

type Extra = {
  jApi: JamespotUserApi;
};

export type RootExtensionsState = { extensions: DemoRootState };

export type AppExtensionsDispatch = ThunkDispatch<RootExtensionsState, Extra, AnyAction>;

export type ThunkExtensionsConfig = {
  dispatch: AppExtensionsDispatch;
  state: RootExtensionsState;
  extra: Extra;
};
