import { ChangeDetectionStrategy, Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { UserContextService } from '../../core/user-context/user-context.service';

@Component({
  selector: 'app-settings-sidebar',
  templateUrl: './settings-sidebar.component.html',
  styleUrls: ['./settings-sidebar.component.scss'],
  encapsulation: ViewEncapsulation.None,
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsSidebarComponent implements OnInit {

  @ViewChild(MatSidenav) readonly sidenav: MatSidenav;

  constructor(
    private context: UserContextService
  ) {}

  ngOnInit() {
    this.context.get('settings-sidebar').subscribe(state => state ? this.sidenav.open() : this.sidenav.close());
  }

  onBackDropClicked() {
    this.context.set('settings-sidebar', false);
  }

}
