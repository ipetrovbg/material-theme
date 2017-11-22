import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfileDialogComponent } from './profile-dialog/profile-dialog.component';
import { MaterialModule } from '../material/material.module';

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
    ProfileDialogComponent
  ],
  declarations: [
    ProfileDialogComponent
  ],
  entryComponents: [
    ProfileDialogComponent
  ]
})
export class SharedModule { }
