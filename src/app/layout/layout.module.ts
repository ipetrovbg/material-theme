import { NgModule } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material/material.module';

import { routing } from './layout.routes';

import { LayoutComponent } from './layout.component';
import { LedgerNavigationComponent } from './ledger-navigation/ledger-navigation.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { SettingsSidebarComponent } from './settings-sidebar/settings-sidebar.component';

import { UserContextService } from '../core/user-context/user-context.service';
import { CostService } from './cost/cost.service';
import { ShowcaseComponent } from './showcase/showcase.component';
import { IncomeComponent } from './income/income.component';
import { LayoutGuard } from './layout.guard';
import { IncomeService } from './income/income.service';
import { AddIncomeComponent } from './income/dialog/add-income.component';
import { CostComponent } from './cost/cost.component';
import { DialogComponent } from './cost/dialog/dialog.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule,
    routing
  ],
  declarations: [
    LayoutComponent,
    LedgerNavigationComponent,
    DashboardComponent,
    ProfileComponent,
    SettingsSidebarComponent,
    ShowcaseComponent,
    IncomeComponent,
    AddIncomeComponent,
    CostComponent,
    DialogComponent
  ],
  providers: [
    CostService,
    LayoutGuard,
    IncomeService
  ],
  entryComponents: [
    AddIncomeComponent,
    DialogComponent
  ]
})
export class LayoutModule {
  constructor(
    private context: UserContextService,
    private router: Router
  ) {
    /**
     * uncomment this code when app-settings-sidebar
     * is with mode different of 'over'
     * now it's redundant
     */
    /*router.events.subscribe(route => {
      if (route instanceof NavigationEnd && context.get('settings-sidebar').getValue())
        context.set('settings-sidebar', false);
    });*/
  }
}
