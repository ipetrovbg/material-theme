import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {CostModel} from './cost.model';
import {MatDialog, MatDialogConfig, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {FormBuilder, FormGroup} from '@angular/forms';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/skipWhile';
import 'rxjs/add/operator/debounceTime';
import {CostService} from './cost.service';
import {DialogComponent} from './dialog/dialog.component';
import {DialogPromptComponent} from '../../shared/dialog-prompt/dialog-prompt.component';
import {FilterDescriptor, process, aggregateBy } from '@progress/kendo-data-query';
import { CoreService } from './../../core/core/core.service';
import { Socket } from 'ng-socket-io';

import * as moment from 'moment';

@Component({
  selector: 'app-cost',
  templateUrl: './cost.component.html',
  styleUrls: ['./cost.component.scss']
})
export class CostComponent implements OnInit, AfterViewInit {

  public displayedColumns     = ['id', 'cost', 'reason', 'date', 'createdAt',  'updatedAt', 'isTest', 'actions'];

  public scrollbarOptions     = { axis: 'yx', theme: 'minimal-dark' };

  dataSource = new MatTableDataSource<CostModel>([]);

  form: FormGroup;

  ready: BehaviorSubject<boolean> = new BehaviorSubject(false);
  totalCost: BehaviorSubject<number> = new BehaviorSubject(null);

  costs: BehaviorSubject<CostModel[]> = new BehaviorSubject([]);

  open: boolean = false;
  sidenav: any;

  filters: FilterDescriptor[] = [];
  orAnd: boolean = false;
  startEndDate: {start: Date, end: Date} = { start: new Date(), end: new Date()};


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private fb: FormBuilder,
    private cost: CostService,
    private dialog: MatDialog,
    private socket: Socket,
    private core: CoreService
  ) { }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.core.startEndWorkMonth().subscribe(dates => {
      this.startEndDate = dates;
      this.cost.fechCosts(dates.start, dates.end).subscribe(costs => this.costs.next(costs));
    });

    this.costs.do(() => this.totalCost.next(null)).debounceTime(200).subscribe(costs =>  {
      this.dataSource.data = costs;
      const data = aggregateBy(costs.map((cost: any) => {
        cost.cost = +cost.cost;
        return cost;
      }), [
        { field: 'cost', aggregate: 'sum' }
      ]);

      data.cost ? this.totalCost.next(data.cost.sum) : this.totalCost.next(0);
    });
  }

  ngAfterViewInit() { }

  selectRow(row) { }

  update(cost: CostModel) {

    this.openDialog(cost);
  }

  deleteCost(cost: CostModel) {
    // this.cost.delete(cost.id).subscribe(res => console.log(res));

    const config = <MatDialogConfig>{
      width: '350px',
      data: { id: cost.id, message: 'Are you sure you want to delete this Cost?' }
    };
    const dialogRef = this.dialog.open(DialogPromptComponent, config);

    dialogRef.afterClosed().skipWhile(res => !res)
      .switchMap(() => this.cost.delete(cost.id))
      .switchMap(() => this.cost.fechCosts(
        this.startEndDate.start,
        this.startEndDate.end
      ))
      .subscribe(costs => this.costs.next(costs));
  }

  openDialog(cost?: CostModel) {
    const config = <MatDialogConfig>{
      width: '600px',
      data: { cost }
    };
    const dialogRef = this.dialog.open(DialogComponent, config);

    dialogRef.afterClosed().skipWhile(res => !res).subscribe(result => {
      this.cost.fechCosts(
        this.startEndDate.start,
        this.startEndDate.end
      )
      .subscribe(costs => this.costs.next(costs));
    });
  }

  applyFilter(value, field, operator) {
    if (field === 'cost') {
      value = +value;
    }

    const index = this.filters.findIndex(filter => filter.field === field);

    if (index === -1) {
      this.filters.push({ field, operator, value });
    } else {
      if (field === 'date') {
        if (!isNaN(new Date(value).getTime())) {
          this.filters[index] = {field, operator, value};
        } else if ( !value.length ) {
          this.filters = [ ...this.filters.slice(0, index), ...this.filters.slice(index + 1) ];
        }

      } else {
        if (!value && !value.length) {
          this.filters = [ ...this.filters.slice(0, index), ...this.filters.slice(index + 1) ];
        } else {
          this.filters[index] = { field, operator, value };
        }
      }
    }

    const data = process(this.costs.getValue().map(cost => {
      cost.date = new Date(`${new Date(cost.date).getFullYear()}-${new Date(cost.date).getMonth() + 1}-${new Date(cost.date).getDate()}`);
      return cost;
    }), {
      filter: {
        logic: this.orAnd ? 'and' : 'or',
        filters: this.filters
      }
    });
    this.dataSource.data = data.data;

    const costs = aggregateBy(data.data.map((cost: any) => {
      cost.cost = +cost.cost;
      return cost;
    }), [
      { field: 'cost', aggregate: 'sum' }
    ]);
    costs.cost ? this.totalCost.next(costs.cost.sum) : this.totalCost.next(0);
  }

  closedStream(e) {
    console.log(e);
    console.log(new Date(e));
  }

  changeOrAndDescriptor() {
    const data = process(this.costs.getValue(), {
      filter: {
        logic: this.orAnd ? 'and' : 'or',
        filters: this.filters
      }
    });

    this.dataSource.data = data.data;
    const costs = aggregateBy(data.data.map((cost: any) => {
      cost.cost = +cost.cost;
      return cost;
    }), [
      { field: 'cost', aggregate: 'sum' }
    ]);
    costs.cost ? this.totalCost.next(costs.cost.sum) : this.totalCost.next(null);
  }

}
