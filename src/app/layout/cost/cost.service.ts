import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import {Store} from '@ngrx/store';
import {AppState, getState} from '../../store/app-state';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import {Reset} from '../../store/user/actions';
import {CostModel} from './cost.model';
import {appConfig} from '../../app.config';


@Injectable()
export class CostService {

  constructor(
    private http: Http,
    private store: Store<AppState>,
  ) { }

  serchCost(from: Date = new Date(), to: Date = new Date()): Observable<number> {

    const user = getState(this.store).user;
    const url = `${from.getFullYear()}-${from.getMonth() + 1}-${from.getDate()}/${to.getFullYear()}-${to.getMonth() + 1 }-${to.getDate()}`;

    if (!user.token.length && user.id <= 0)
      return Observable.of(-1);

    return this.http.post(`${appConfig.api}/cost/sum/${url}`,
      { token: user.token}
      ).map(res => res.json()).map(res => {
        if (!res.success && res.message === 'Please, provide valid token.')
          this.store.dispatch(new Reset());
        return res;
    }).map(res => res.success && res.response[0].sum ? res.response[0].sum : 0);
  }

  fechCosts(from: Date = new Date(), to: Date = new Date()) {
    const user = getState(this.store).user;
    const url = `${from.getFullYear()}-${from.getMonth() + 1}-${from.getDate()}/${to.getFullYear()}-${to.getMonth() + 1 }-${to.getDate()}`;
    return this.http.post(`${appConfig.api}/cost/${url}`,
      { token: user.token}
    ).map(res => res.json())
      .map(res => {
        if (!res.success && res.message === 'Please, provide valid token.')
          this.store.dispatch(new Reset());
        return res.response.map(cost =>  new CostModel(cost));
      });
  }

  save(cost: CostModel): Observable<CostModel> {

    cost = new CostModel(cost);

    if (cost.id)
      return this.update(cost);
    else
      return this.create(cost);

  }

  delete(id: number) {

    const user = getState(this.store).user;

    return this.http.delete(`${appConfig.api}/cost/${id}`,
      { body: { token: user.token } }
    ).map(res => res.json());
  }

  update( cost: CostModel ) {

    const user = getState(this.store).user;

    return this.http.put(`${appConfig.api}/cost/${cost.id}`,
      { token: user.token, cost: JSON.stringify(cost)}
    ).map(res => res.json())
      .map(res => {
        if (!res.success && res.message === 'Please, provide valid token.')
          this.store.dispatch(new Reset());


        return new CostModel(cost);
      });
  }

  create( cost: CostModel ) {
    const user = getState(this.store).user;

    return this.http.post(`${appConfig.api}/cost`,
      { token: user.token, cost: JSON.stringify(cost)}
    ).map(res => res.json())
      .map(res => {
        if (!res.success && res.message === 'Please, provide valid token.')
          this.store.dispatch(new Reset());
        return new CostModel(cost);
      });
  }
}
