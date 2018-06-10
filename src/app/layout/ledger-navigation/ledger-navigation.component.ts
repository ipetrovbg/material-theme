import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { UserContextService } from '../../core/user-context/user-context.service';

@Component({
  selector: 'app-ledger-navigation',
  templateUrl: './ledger-navigation.component.html',
  styleUrls: ['./ledger-navigation.component.scss'],
  animations: [trigger('slideInOutAnimation', [
    state('open', style({
      width: '250px'
    })),
    state('close', style({
      width: '50px',
    })),
    transition('open <=> close', animate('.2s ease-in-out'))

  ])],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LedgerNavigationComponent implements OnInit {

  @ViewChild('sidebar') readonly sidebar: ElementRef;

  public scrollbarOptions = { axis: 'yx', theme: 'minimal' };

  constructor(
    public context: UserContextService
  ) {}

  ngOnInit() {}

  toggleSidebar() {
    (this.context.get('toggle').getValue() === 'open' && !this.context.get('clicked').getValue()) ?
      this.context.set('toggle', 'close') :
      this.context.set('toggle', 'open');

    this.context.set('clicked', !this.context.get('clicked').getValue());
  }

  mouseOver() {
    if (this.context.get('toggle').getValue() === 'close')
      this.context.set('toggle', 'open');
  }

  mouseOut() {
    if (this.context.get('toggle').getValue() === 'open' && this.context.get('clicked').getValue())
      this.context.set('toggle', 'close');
  }

}
