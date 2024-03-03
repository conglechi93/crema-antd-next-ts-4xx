import {Setting} from '../../types/models/Setting';
import {
  ROUTE_CHANGE,
  SET_INITIAL_PATH,
  SettingsActionTypes,
  TOGGLE_MINI_NAV_COLLAPSED,
  TOGGLE_NAV_COLLAPSED,
} from '../../types/actions/Settings.action';

const initialSettings: Setting = {
  navCollapsed: false,
  navMiniCollapsed: false,
  initialPath: '/',
};

const Settings = (state = initialSettings, action: SettingsActionTypes) => {
  switch (action.type) {
    case ROUTE_CHANGE:
      return {
        ...state,
        navCollapsed: false,
      };

    case TOGGLE_NAV_COLLAPSED:
      return {
        ...state,
        navCollapsed: !state.navCollapsed,
      };

    case TOGGLE_MINI_NAV_COLLAPSED:
      return {
        ...state,
        navMiniCollapsed: !state.navMiniCollapsed,
      };

    case SET_INITIAL_PATH:
      return {
        ...state,
        initialPath: action.initialPath,
      };

    default:
      return state;
  }
};

export default Settings;
