import { ChangeDetectionStrategy, Component, OnInit, AfterViewInit, OnDestroy, ViewChild } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subscriber } from 'rxjs/Subscriber';
import { Store } from '@ngrx/store';
import { MatDialog, MatDialogConfig } from '@angular/material';

import { ProfileDialogComponent } from '../../shared/profile-dialog/profile-dialog.component';
import { AppState } from '../../store/app-state';
import { CostService } from '../cost/cost.service';
import { Observable } from 'rxjs/Observable';


import 'rxjs/add/operator/do';

import * as moment from 'moment';
import {IncomeService} from "../income/income.service";
import {aggregateBy} from "@progress/kendo-data-query";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnInit, AfterViewInit, OnDestroy {



  public scrollbarOptions = { axis: 'y', theme: 'minimal-dark' };

  public ready: BehaviorSubject<boolean> = new BehaviorSubject(false);

  public subscriber: Subscriber<any> = new Subscriber();

  public sum: BehaviorSubject<number> = new BehaviorSubject(null);

  public incomeSum: BehaviorSubject<number> = new BehaviorSubject(null);

  public daysToSalary: Observable<number>;

  constructor(
    private dialog: MatDialog,
    private store: Store<AppState>,
    private cost: CostService,
    private income: IncomeService
  ) { }

  ngOnInit() {
    this.daysToSalary = this.store.select(state => {
      try {
        return JSON.parse(state.userManage.settings);
      } catch (e) {
        return state.userManage.settings;
      }
    }).skipWhile(settings => !settings.payDay)
      .map(settings => {

        const day     = moment();
        const payDay  = +settings.payDay;

        return (payDay > (+new Date().getDate() + 1)) ?
          Math.abs(day.diff(moment([new Date().getFullYear(), new Date().getMonth(), payDay]), 'days')) + 1 :
          (+moment().endOf('month').format('D') - (+moment(day).format('D'))) + payDay;
      });

    this.income.fetch().subscribe(incomes => {
      const data = aggregateBy(incomes.map((income: any) => {
        income.income = +income.income;
        return income;
      }), [
        { field: 'income', aggregate: 'sum' }
      ]);
      data.income ? this.incomeSum.next(data.income.sum) : this.incomeSum.next(0);
    });
  }

  ngAfterViewInit() {

    this.cost.serchCost(new Date(`${new Date().getFullYear()}-${new Date().getMonth() + 1}-${+moment().startOf('month').format('D')}`), new Date(`${new Date().getFullYear()}-${new Date().getMonth() + 1}-${+moment().endOf('month').format('D')}`)).subscribe(sum => {
      this.sum.next(sum);
    });
    this.ready.next(true);
  }

  ngOnDestroy() {
    this.subscriber.unsubscribe();
  }

  openDialog() {

    const config = <MatDialogConfig>{
      width: '400px',
      data: { name: 'Petar s' }
    };
    const dialogRef = this.dialog.open(ProfileDialogComponent, config);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
