import {AfterViewInit, ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { UserContextService } from '../core/user-context/user-context.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('slideIOut', [
      state('open', style({
        marginLeft: '250px',
        width: 'calc(100% - 250px)'
      })),
      state('close', style({
        marginLeft: '50px',
        width: 'calc(100% - 50px)'
      })),
      transition('open <=> close', animate('.2s ease-in-out'))

    ])
  ]
})
export class LayoutComponent implements OnInit {

  public scrollbarOptions = { axis: 'yx', theme: 'minimal-dark' };

  constructor(
    public context: UserContextService
  ) {
    context.register('settings-sidebar', false);
  }

  ngOnInit() { }

}
