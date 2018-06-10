import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import { Store } from '@ngrx/store';
import {AppState, appState, UserManage} from '../store/app-state';
import {Router} from '@angular/router';
import {Logging, Login} from '../store/user/actions';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/combineLatest';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public form: FormGroup;

  @ViewChild('f') myForm;

  public loading: BehaviorSubject<boolean> = new BehaviorSubject(false);

  public userManage: BehaviorSubject<UserManage> = new BehaviorSubject(appState.userManage);

  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    private router: Router
  ) { }

  ngOnInit() {

    Observable.combineLatest(
      this.store.select(state => state.user),
      this.store.select(state => state.userManage)
    )
    .map(([user, userManage]) => ({user, userManage}))
    .subscribe(response => {
      this.userManage.next(response.userManage);
      setTimeout(() => this.loading.next(response.userManage.logging), 0);
      if (response.user.token && response.user.id && !response.userManage.error)
        this.router.navigate(['/dashboard']);
    });

    this.form = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required]
    });
  }

  submit() {
    this.loading.next(true);

    if (this.form.invalid) {
      setTimeout( () => {
        this.loading.next(false);
        this.myForm.resetForm();
      }, 50);
      return false;
    }

    this.store.dispatch(new Logging(true));
    this.store.dispatch(new Login(this.form.value));
    this.myForm.resetForm();
    this.loading.next(false);
  }

}
