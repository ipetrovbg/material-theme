import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class UserContextService {
  data: any = {
    toggle: new BehaviorSubject('open'),
    clicked: new BehaviorSubject(false)
  };

  get(id) {
    return this.data[id];
  }

  set(id, value) {
    this.data[id].next(value);
  }

  register(id: string, value?: any) {
    if (!this.data[id])
      this.data[id] = new BehaviorSubject(value);
  }

}
