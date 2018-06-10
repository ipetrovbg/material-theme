import { Injectable } from '@angular/core';
import { IncomeModel } from './income.model';
import {Store} from '@ngrx/store';
import {AppState, getState} from '../../store/app-state';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {Reset} from '../../store/user/actions';
import {appConfig} from '../../app.config';
import {AggregateResult, process, aggregateBy } from '@progress/kendo-data-query';

@Injectable()
export class IncomeService {

  constructor(
    private store: Store<AppState>,
    private http: Http
  ) { }

  save(income: IncomeModel): Observable<IncomeModel> {

    income = new IncomeModel(income);


    if (income.id)
      return this.updateIncome(income);
    else
      return this.addIncome(income);

  }

  updateIncome(income) {

    return this.http.put(`${appConfig.api}/income/${income.id}`, {
      income: JSON.stringify(income),
      token: getState(this.store).user.token
    })
      .map(response => {
        const check = response.json();
        if (!check.success && check.message === 'Please, provide valid token.')
          this.store.dispatch(new Reset());
        return check;
      })
      .map(response => response.success && response.response ? new IncomeModel(response.response) : new IncomeModel());
  }

  addIncome(income) {
    return this.http.post(`${appConfig.api}/income`, {
      income: JSON.stringify(income),
      token: getState(this.store).user.token
    })
      .map(response => {
        const check = response.json();
        if (!check.success && check.message === 'Please, provide valid token.')
          this.store.dispatch(new Reset());
        return check;
      })
      .map(response => response.success ? new IncomeModel(response.response) : new IncomeModel());
  }

  fetch() {
    const userId = getState(this.store).user.id;
    return this.http.post(`${appConfig.api}/income/${userId}/user`, {
      token: getState(this.store).user.token
    })
      .map(response => response.json())
      .map(res => {
        if (!res.success && res.message === 'Please, provide valid token.')
          this.store.dispatch(new Reset());
        return res;
      })
      .map(response => {
        const incomes: IncomeModel[] = [];
        if (response.success) {
          response.response.forEach(income => incomes.push(new IncomeModel(income)));
        }
        return incomes;
      });
  }

  fetchByPeriod(from: Date, to: Date) {
    const { token } = getState(this.store).user;

    return this.http.post(`${appConfig.api}/income/search`, { token, from, to })
    .map(data => data.json());
  }

  aggregateSum(data: IncomeModel[], filtering: boolean = true): AggregateResult {
    return aggregateBy(data.filter(income => filtering ? !income.isTest : true).map((income: any) => {
      income.income = +income.income;
      return income;
    }), [
      { field: 'income', aggregate: 'sum' }
    ]);
  }

  delete(id) {
    return this.http.delete(`${appConfig.api}/income/${id}`, {
      body: {
        token: getState(this.store).user.token
      }
    }).map(res => res.json())
      .map(res => {
        if (!res.success && res.message === 'Please, provide valid token.')
          this.store.dispatch(new Reset());
        return res;
      });
  }

}
