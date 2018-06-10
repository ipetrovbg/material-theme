import {ChangeDetectionStrategy, Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {Store} from '@ngrx/store';

import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

import {CostModel} from '../cost.model';
import {AppState, getState} from '../../../store/app-state';
import {CostService} from '../cost.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class DialogComponent implements OnInit {

  form: FormGroup;
  _cost: CostModel;

  public scrollbarOptions = { axis: 'yx', theme: 'minimal' };

  constructor(
    private dialogRef: MatDialogRef<DialogComponent>,
    private fb: FormBuilder,
    private cost: CostService,
    private store: Store<AppState>,
    @Inject(MAT_DIALOG_DATA) public data: { cost?: CostModel }
  ) { }

  ngOnInit() {
    let { cost } = this.data;

    if (!cost)
      cost = new CostModel();

    cost.date = cost.date ? cost.date : new Date();

    this.form = this.fb.group({
      cost: [0, Validators.required],
      reason: [''],
      date: [new Date(), Validators.required],
      isTest: [false, Validators.required]
    });

    this.patchForm(cost);
  }

  patchForm(cost: CostModel) {

    this._cost = cost;

    this.form.patchValue({
      cost: cost.cost,
      reason: cost.reason,
      date: cost.date,
      isTest: cost.isTest
    });
  }

  save() {
    if (this.form.invalid)
      return;
    this._cost.userId = getState(this.store).user.id;

    this.cost.save({ ...this.form.value, userId: this._cost.userId, id: this._cost.id }).subscribe(response => {
      if (response)
        this.dialogRef.close(response);
    });
  }

}
