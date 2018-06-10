import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {FilterDescriptor, process, aggregateBy, AggregateResult } from '@progress/kendo-data-query';

import {MatDialog, MatDialogConfig, MatMenuTrigger, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';

import {IncomeModel} from '../income/income.model';
import {enterAnimation, enterAnimationSlow} from '../../animations/enter';
import {IncomeService} from './income.service';
import {AddIncomeComponent} from './dialog/add-income.component';
import 'rxjs/add/operator/skipWhile';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/debounceTime';
import {merge} from 'rxjs/observable/merge';
import {of as observableOf} from 'rxjs/observable/of';
import {catchError} from 'rxjs/operators/catchError';
import {map} from 'rxjs/operators/map';
import {startWith} from 'rxjs/operators/startWith';
import {switchMap} from 'rxjs/operators/switchMap';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {DialogPromptComponent} from '../../shared/dialog-prompt/dialog-prompt.component';
import { CoreService } from './../../core/core/core.service';
@Component({
  selector: 'app-income',
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.scss'],
  animations: [enterAnimation, enterAnimationSlow],
})
export class IncomeComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;

  displayedColumns = ['id', 'income', 'reason', 'date', 'createdAt',  'updatedAt', 'isTest', 'actions'];

  dataSource = new MatTableDataSource<IncomeModel>([]);

  testMode: boolean = true;

  months: {text: string, value: number}[] = [
    { value: 1, text: 'Jan' },
    { value: 2, text: 'Feb' },
    { value: 3, text: 'Mar' },
    { value: 4, text: 'Apr' },
    { value: 5, text: 'May' },
    { value: 6, text: 'Jun' },
    { value: 7, text: 'Jul' },
    { value: 8, text: 'Aug' },
    { value: 9, text: 'Sep' },
    { value: 10, text: 'Oct' },
    { value: 11, text: 'Nov' },
    { value: 12, text: 'Dec' }
  ];
  currentMonth: number = new Date().getMonth() + 1;
  currentYear: number = new Date().getFullYear();
  years: number[] = [];
  form: FormGroup;

  ready: BehaviorSubject<boolean> = new BehaviorSubject(false);
  totalIncomes: BehaviorSubject<number> = new BehaviorSubject(null);

  resultsLength = 0;
  isLoadingResults = false;
  isRateLimitReached = false;

  orAnd: boolean = false;

  incomes: BehaviorSubject<IncomeModel[]> = new BehaviorSubject([]);
  filters: FilterDescriptor[] = [];
  open: boolean = false;
  startEndDates: {start: Date, end: Date} = {start: new Date(), end: new Date()};

  constructor(
    private fb: FormBuilder,
    private income: IncomeService,
    private dialog: MatDialog,
    private core: CoreService
  ) { }

  ngOnInit() {
    this.totalIncomes.next(null);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.core.startEndWorkMonth().subscribe(dates => {
      const { start, end } = dates;
      this.startEndDates = dates;
      this.income.fetchByPeriod(start, end).subscribe(data => {
        if (data.response) {
          this.incomes.next(data.response.map(income => new IncomeModel(income)));
        }
      });
    });

    

    this.incomes.do((data) => {
      this.totalIncomes.next(null);
      this.dataSource.data = data;
    })
    .map(data => this.income.aggregateSum(data, this.testMode))
    .subscribe((data: AggregateResult) => {
      data.income ? this.totalIncomes.next(data.income.sum) : this.totalIncomes.next(0)
    });
  }

  ngAfterViewInit() { }

  selectRow(row) { }

  createIncome() {
    this.openDialog();
  }

  editIncome(income: IncomeModel) {
    this.openDialog(income);
  }

  applyFilter(value, field) {

    const index = this.filters.findIndex(filter => filter.field === field);

    if (index === -1)
      this.filters.push({ field, operator: 'contains', value });
    else {
      if (!value.length) {
        this.filters = [ ...this.filters.slice(0, index), ...this.filters.slice(index + 1) ];
      } else {
        this.filters[index] = { field, operator: 'contains', value };
      }
    }

    const data = process(this.incomes.getValue() || [], {
      filter: {
        logic: this.orAnd ? 'and' : 'or',
        filters: this.filters
      }
    });
    this.dataSource.data = data.data;
  }

  filterTestIncomes(e) {
    const data = this.incomes.getValue();
    this.income.aggregateSum(data, this.testMode);
    this.totalIncomes.next(this.income.aggregateSum(data, this.testMode).income.sum);
  }

  changeOrAndDescriptor() {
    const data = process(this.incomes.getValue(), {
      filter: {
        logic: this.orAnd ? 'and' : 'or',
        filters: this.filters
      }
    });
    console.log(this.filters);
    this.dataSource.data = data.data;
  }

  openDialog(income?: IncomeModel) {
    this.open = false;

    const config = <MatDialogConfig>{
      width: '600px',
      data: { income }
    };
    const dialogRef = this.dialog.open(AddIncomeComponent, config);

    dialogRef.afterClosed().skipWhile(res => !res).subscribe(result => {
      this.income.fetchByPeriod(this.startEndDates.start, this.startEndDates.end).subscribe(data => this.incomes.next(data.response));
    });
  }

  deleteIncome(id: number, event) {

    event.preventDefault();
    event.stopPropagation();

    const config = <MatDialogConfig>{
      width: '350px',
      data: { id, message: 'Are you sure you want to delete this Income?' }
    };
    const dialogRef = this.dialog.open(DialogPromptComponent, config);

    dialogRef.afterClosed().skipWhile(res => !res)
      .switchMap(() => this.income.delete(id))
      .switchMap(() => this.income.fetchByPeriod(this.startEndDates.start, this.startEndDates.end))
      .subscribe(data => this.incomes.next(data.response));
  }

}
