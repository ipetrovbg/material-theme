import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfileDialogComponent } from './profile-dialog/profile-dialog.component';
import { MaterialModule } from '../material/material.module';
import { CardComponent } from './card/card.component';
import { CardToolbarComponent } from './card-toolbar/card-toolbar.component';
import { CardActionsComponent } from './card-actions/card-actions.component';
import { CardContentComponent } from './card-content/card-content.component';
import { CardLoaderComponent } from './card-loader/card-loader.component';
import { CardSidebarComponent } from './card-sidebar/card-sidebar.component';

const importExports: any[] = [
  HttpModule,
  FormsModule,
  ReactiveFormsModule
];

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    ...importExports
  ],
  exports: [
    ...importExports,
    ProfileDialogComponent,
    CardComponent,
    CardToolbarComponent,
    CardActionsComponent,
    CardContentComponent,
    CardLoaderComponent,
    CardSidebarComponent
  ],
  declarations: [
    ProfileDialogComponent,
    CardComponent,
    CardToolbarComponent,
    CardActionsComponent,
    CardContentComponent,
    CardLoaderComponent,
    CardSidebarComponent
  ],
  entryComponents: [
    ProfileDialogComponent
  ]
})
export class SharedModule { }
