import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { ProfileDialogComponent } from './profile-dialog/profile-dialog.component';
import { MaterialModule } from '../material/material.module';
import { CardComponent } from './card/card.component';
import { CardToolbarComponent } from './card-toolbar/card-toolbar.component';
import { CardActionsComponent } from './card-actions/card-actions.component';
import { CardContentComponent } from './card-content/card-content.component';
import { CardLoaderComponent } from './card-loader/card-loader.component';
import { CardSidebarComponent } from './card-sidebar/card-sidebar.component';
import { CardIconComponent } from './card-icon/card-icon.component';
import { PageWrapperComponent } from './page-wrapper/page-wrapper.component';
import { DialogPromptComponent } from './dialog-prompt/dialog-prompt.component';


const importExports: any[] = [
  HttpModule,
  FormsModule,
  ReactiveFormsModule,
  FlexLayoutModule
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
    CardSidebarComponent,
    MaterialModule,
    CardIconComponent,
    PageWrapperComponent
  ],
  declarations: [
    ProfileDialogComponent,
    CardComponent,
    CardToolbarComponent,
    CardActionsComponent,
    CardContentComponent,
    CardLoaderComponent,
    CardSidebarComponent,
    CardIconComponent,
    PageWrapperComponent,
    DialogPromptComponent
  ],
  entryComponents: [
    ProfileDialogComponent,
    DialogPromptComponent
  ]
})
export class SharedModule { }
