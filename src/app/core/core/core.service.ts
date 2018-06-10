import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app-state';
import * as moment from 'moment';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class CoreService {

  constructor(private store: Store<AppState>) { }

  getFirstDayInCurrentMonth() {
    return new Date(this.date().getFullYear(), this.date().getMonth(), 1)
  }

  getLastDateInCurrentMonth() {
    return new Date(this.date().getFullYear(), this.date().getMonth() + 1, 0)
  }

  date(): Date {
    return new Date();
  }

  startEndWorkMonth(): Observable<{ start: Date, end: Date }> {

    return this.store.select(state => {
      try {
        return JSON.parse(state.userManage.settings);
      } catch (e) {
        return state.userManage.settings;
      }
    }).skipWhile(settings => !settings.payDay)
      .map(settings => {
        const payDay            = +settings.payDay;
        const lastDayofSalary   = payDay - 1;

        let start = payDay < (+new Date().getDate() + 1) ?
                        moment([new Date().getFullYear(), new Date().getMonth(), payDay]).toDate():
                        moment([new Date().getFullYear(), new Date().getMonth() - 1, payDay]).toDate();
        let end = payDay < (+new Date().getDate() + 1) ?
                      moment([new Date().getFullYear(), new Date().getMonth() + 1, payDay - 1]).toDate():
                      moment([new Date().getFullYear(), new Date().getMonth(), payDay - 1]).toDate();

        return { start, end };
      });
  }

}
