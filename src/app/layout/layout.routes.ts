import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LayoutComponent } from './layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { ShowcaseComponent } from './showcase/showcase.component';
import {IncomeComponent} from './income/income.component';
import {LayoutGuard} from './layout.guard';
import {CostComponent} from './cost/cost.component';


const routes: Routes = [
  { path: '', component: LayoutComponent, children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'showcase', component: ShowcaseComponent },
      { path: 'income', component: IncomeComponent },
      { path: 'cost', component: CostComponent },
    ],
    canActivate: [ LayoutGuard ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
