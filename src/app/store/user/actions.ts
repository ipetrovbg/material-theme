import { Action } from '@ngrx/store';
import {UserState} from '../app-state';

export enum Actions {
  UPDATE = 'UPDATE',
  LOGIN = 'LOGIN',
  LOGGING = 'LOGGING',
  LOGIN_ERROR = 'LOGIN_ERROR',
  LOGIN_ERRORS = 'LOGIN_ERRORS',
  UPDATE_SETTINGS = 'UPDATE_SETTINGS',
  FETCH_SETTINGS = 'FETCH_SETTINGS',
  RESET = 'RESET',
  REFRESH_TOKEN = 'REFRESH_TOKEN'
}

export class UpdateUser implements Action {
  readonly type = Actions.UPDATE;

  constructor( public payload: UserState ) {}
}

export class Login implements Action {
  readonly type = Actions.LOGIN;
  constructor( public payload: {email: string, password: string} ) {}
}

export class Logging implements Action {
  readonly type = Actions.LOGGING;
  constructor(public payload: boolean) {}
}

export class LoginError implements Action {
  readonly type = Actions.LOGIN_ERROR;
  constructor(public payload: boolean) {}
}

export class LoginErrors implements Action {
  readonly type = Actions.LOGIN_ERRORS;
  constructor( public payload: { errors: string[] } ) {}
}

export class Reset implements Action {
  readonly type = Actions.RESET;
}

export class UpdateSettings implements Action {
  readonly type = Actions.UPDATE_SETTINGS;
  constructor( public payload: string ) {}
}

export class RefreshToken implements Action {
  readonly type = Actions.REFRESH_TOKEN;

  constructor( public token: string ) {}
}

export type UserActions = UpdateUser | Login | Logging | LoginError |
LoginErrors | Reset | UpdateSettings | RefreshToken;
