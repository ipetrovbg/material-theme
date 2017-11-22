import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { UserContextService } from '../../core/user-context/user-context.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnInit {

  constructor(
    private context: UserContextService
  ) {}

  ngOnInit() {
  }

}
