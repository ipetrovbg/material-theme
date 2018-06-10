import 'rxjs/add/operator/take';

export interface UserState {
  email: string;
  password?: string;
  token: string;
  id: number;
}

export interface UserManage {
  logging: boolean;
  error: boolean;
  errors: string[];
  settings: string;
}

export interface AppState {
  user: UserState;
  userManage: UserManage;
}

export function getState(store: any) {
  let _state: AppState;
  store.take(1).subscribe(o => _state = o);
  return _state;
}

export const appState: AppState = {
  user: {
    email: '',
    password: '',
    token: '',
    id: -1,
  },
  userManage: {
    logging: false,
    error: false,
    errors: [],
    settings: ''
  }
};
