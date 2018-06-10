import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AppState } from '../store/app-state';
import { Store } from '@ngrx/store';

@Injectable()
export class LayoutGuard implements CanActivate {

  constructor(
    private store: Store<AppState>,
    private router: Router,
  ) { }

  canActivate( next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    return this.store.select(s => s.user).map(user => {
      if (!user.token.length && user.id <= 0) {
        this.router.navigate(['/login']);
        return false;
      } else {
        return true;
      }
    });
  }
}
