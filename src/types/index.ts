import { CommonActionTypes } from './actions/Common.action';
import { SettingsActionTypes } from './actions/Settings.action';
import { AuthActionTypes } from './actions/Auth.actions';

export type AppActions =
  | CommonActionTypes
  | SettingsActionTypes
  | AuthActionTypes;
