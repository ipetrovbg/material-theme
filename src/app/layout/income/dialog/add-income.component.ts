import {ChangeDetectionStrategy, Component, Inject, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {IncomeService} from '../income.service';
import {enterAnimation, enterAnimationSlow} from '../../../animations/enter';
import {IncomeModel} from '../income.model';
import {Store} from '@ngrx/store';
import {AppState, getState} from '../../../store/app-state';

@Component({
  selector: 'app-dialog-add-income',
  templateUrl: 'add-income.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['add-income.component.scss'],
  animations: [enterAnimation, enterAnimationSlow],
})
export class AddIncomeComponent implements OnInit {

  @ViewChild('f') myForm;

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

  _income: IncomeModel;

  public scrollbarOptions = { axis: 'yx', theme: 'minimal-dark' };

  constructor(
    private dialogRef: MatDialogRef<AddIncomeComponent>,
    private fb: FormBuilder,
    private income: IncomeService,
    private store: Store<AppState>,
    @Inject(MAT_DIALOG_DATA) public data: { income?: IncomeModel }
  ) {
    let year: number = new Date().getFullYear();
    for (let i = 50; i >= 0; i--) {
      this.years.push(year);
      year--;
    }
  }

  ngOnInit() {
    let { income } = this.data;

    if (!income) {
      income = new IncomeModel(<IncomeModel>{ userId: getState(this.store).user.id  });
    }

    this.form = this.fb.group({
      year: [this.currentYear, Validators.required],
      month: [this.currentMonth, Validators.required],
      date: [new Date(), Validators.required],
      income: [0, Validators.required],
      reason: [''],
      isTest: false
    });

    this.patchForm(income);
  }

  patchForm(income: IncomeModel) {

    this._income = income;

    this.form = this.fb.group({
      year: [income.year, Validators.required],
      month: [income.month, Validators.required],
      date: [income.date, Validators.required],
      income: [income.income, Validators.required],
      reason: [income.reason],
      isTest: income.isTest
    });
  }

  createIncome() {
    if (this.form.valid) {
      this.income.save({...this.form.value, id: this._income.id, userId: this._income.userId}).subscribe(response => {
        if (response)
          this.dialogRef.close(response);
      });
    }
  }
}
