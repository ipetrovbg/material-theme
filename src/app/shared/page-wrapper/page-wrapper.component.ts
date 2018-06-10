import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {enterAnimation, enterAnimationSlow} from '../../animations/enter';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Component({
  selector: 'app-page-wrapper',
  templateUrl: './page-wrapper.component.html',
  styleUrls: ['./page-wrapper.component.scss'],
  animations: [enterAnimation, enterAnimationSlow],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageWrapperComponent implements OnInit, OnDestroy {

  @Input() public title: string = '';
  @Input() public icon: string = '';
  @Input() menu: any;
  @Output() public onSettings: EventEmitter<any> = new EventEmitter();

  show: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor() {}

  ngOnInit() {
    setTimeout(() => this.show.next(true), 50);
  }

  ngOnDestroy() {
    this.show.next(false);
  }

}
