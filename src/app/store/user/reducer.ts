import {appState, UserState} from '../app-state';
import * as Actions from './actions';

export function reducer (state: UserState = appState.user, action: Actions.UserActions): UserState {
  switch (action.type) {
    case Actions.Actions.UPDATE:
      return { ...state, email: action.payload.email, id: action.payload.id, token: action.payload.token };
    case Actions.Actions.RESET:
      return appState.user;
      case Actions.Actions.REFRESH_TOKEN:
      return { ...state, token: action.token };
    default: return state;
  }
}
