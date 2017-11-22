import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { UserContextService } from '../../core/user-context/user-context.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { ProfileDialogComponent } from '../../shared/profile-dialog/profile-dialog.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnInit {

  constructor(
    private context: UserContextService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
  }

  openDialog() {

    const config = <MatDialogConfig>{
      data: { name: 'Petar s' }
    };
    const dialogRef = this.dialog.open(ProfileDialogComponent, config);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
