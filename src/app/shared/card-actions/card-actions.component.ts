import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-card-actions',
  templateUrl: './card-actions.component.html',
  styleUrls: ['./card-actions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class CardActionsComponent implements OnInit {

  constructor() {}

  ngOnInit() {}

}
