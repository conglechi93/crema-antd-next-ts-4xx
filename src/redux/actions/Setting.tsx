import {
  SET_INITIAL_PATH,
  SettingsActionTypes,
  TOGGLE_MINI_NAV_COLLAPSED,
  TOGGLE_NAV_COLLAPSED,
} from '../../types/actions/Settings.action';

export const toggleNavCollapsed = () => ({type: TOGGLE_NAV_COLLAPSED});
export const toggleMiniNavCollapsed = () => ({type: TOGGLE_MINI_NAV_COLLAPSED});

export const setInitialPath = (initialPath: string): SettingsActionTypes => ({
  type: SET_INITIAL_PATH,
  initialPath,
});
