import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const importExports: any[] = [
  HttpModule,
  FormsModule,
  ReactiveFormsModule
];

@NgModule({
  imports: [
    CommonModule,
    ...importExports
  ],
  exports: importExports,
  declarations: []
})
export class SharedModule { }
