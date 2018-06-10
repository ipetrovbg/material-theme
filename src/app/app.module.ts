import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {Router, RouterModule, Routes} from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {ActionReducer, MetaReducer, Store, StoreModule} from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { localStorageSync } from 'ngrx-store-localstorage';

import { SocketIoModule, SocketIoConfig } from 'ng-socket-io';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { LoginComponent } from './login/login.component';
import { reducer } from './store/user/reducer';
import {LoginService} from './store/user/login.service';
import {manageUserReducer} from './store/user/manage-reducer';
import {AppState, getState} from './store/app-state';
import {appConfig} from './app.config';
import { RefreshToken } from './store/user/actions';

import { Socket } from 'ng-socket-io';

export function localStorageSyncReducer(reducers: ActionReducer<any>): ActionReducer<any> {
  return localStorageSync({keys: [ 'user', 'userManage' ], rehydrate: true})(reducers);
}
const metaReducers: Array<MetaReducer<any, any>> = [localStorageSyncReducer];

export const appRoutes: Routes = [
  { path: 'home', component: AppComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', loadChildren: './layout/layout.module#LayoutModule' },
  { path: '',   redirectTo: 'home', pathMatch: 'full' },
];

const config: SocketIoConfig = { url: appConfig.root, options: {} };

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    RouterModule.forRoot(appRoutes),
    SocketIoModule.forRoot(config),
    CoreModule.forRoot(),
    StoreModule.forRoot({ user: reducer, userManage: manageUserReducer }, { metaReducers }),
    StoreDevtoolsModule.instrument({ maxAge: 100 }),
    EffectsModule.forRoot([
      LoginService
    ])
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(
    private store: Store<AppState>,
    private router: Router,
    private socket: Socket
  ) {
    store.select(state => state.user).subscribe(user => {
      if (!user.token.length && user.id <= 0)
        this.router.navigate(['/login']);
    });

    
    socket.emit('REFRESH_TOKEN', getState(this.store).user.token);
    socket.on('REFRESH_TOKEN_RESULT', (message) => {
      if (!message.err) {
          this.store.dispatch(new RefreshToken(message.token));
      }
    });
  }
}
