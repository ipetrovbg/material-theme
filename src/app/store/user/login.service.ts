import { Injectable } from '@angular/core';
import {Http} from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { of } from 'rxjs/observable/of';

import {Actions, Effect} from '@ngrx/effects';
import {Action, Store} from '@ngrx/store';

import { Socket } from 'ng-socket-io';

import {Logging, LoginError, LoginErrors, UpdateUser, Actions as UserActions, UpdateSettings} from './actions';
import {AppState, getState} from '../app-state';
import {appConfig} from '../../app.config';

@Injectable()
export class LoginService {

  constructor(
    private http: Http,
    private actions$: Actions,
    private store: Store<AppState>,
    private socket: Socket
  ) {
    socket.on('UPDATE_SETTINGS', () => {});
  }

  @Effect() login$ = this.actions$.ofType('LOGIN')
    .switchMap((payload: any) => this.http.post(`${appConfig.api}/authenticate`, payload.payload)
      .map(res => res.json())
      .catch(err => Observable.of([new LoginError(true), new LoginErrors({errors: ['Login Error']})])))
    .map( response => response.success ?
      (response) :
      (new LoginErrors({errors: [response.message]}))
    ).mergeMap(res => {
      if (res.type === 'LOGIN_ERRORS')
        return [res, new LoginError(true), new Logging(false)];
      else
        return [
          new UpdateUser({email: res.user.email, password: '', token: res.token, id: res.user.id}),
          new Logging(false), new LoginError(false),
          new LoginErrors({errors: []}),
          { type: UserActions.FETCH_SETTINGS }
        ];
    });

  @Effect() fetchSettings$: Observable<Action> = this.actions$.ofType<any>(UserActions.FETCH_SETTINGS)
    .mergeMap(() => {

      if (!getState(this.store).user.id)
        return [({type: 'EMPTY'})];

      return this.http.get(`${appConfig.api}/users/${ getState(this.store).user.id}/settings`)
        .map(res => res.json())
        .mergeMap(response => {
          return [ (new UpdateSettings(response.settings)) ];
        });
    }).catch(err => {
      console.log('FETCH_SETTINGS error', err);
      return of({ type: 'EMPTY' });
    });

}
