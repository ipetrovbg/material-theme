import { appState, UserManage } from '../app-state';
import * as Actions from './actions';

export function manageUserReducer(state: UserManage = appState.userManage, action: Actions.UserActions): UserManage {
  switch (action.type) {

    case Actions.Actions.LOGGING:
      return { ...state, logging: action.payload };

    case Actions.Actions.LOGIN_ERROR:
      return { ...state, error: action.payload };

    case Actions.Actions.LOGIN_ERRORS:
      return { ...state, errors: action.payload.errors };

    case Actions.Actions.RESET:
      return appState.userManage;

    case Actions.Actions.UPDATE_SETTINGS:
      return { ...state, settings: action.payload };

    default: return state;
  }
}
