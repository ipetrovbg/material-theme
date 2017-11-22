import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  MatInputModule,
  MatRippleModule,
  MatSidenavModule,
  MatToolbarModule,
  MatButtonModule,
  MatSelectModule,
  MatIconModule,
  MatExpansionModule,
  MatListModule,
  MatSlideToggleModule,
  MatDialogModule, MatToolbar,
} from '@angular/material';

const importExport: any[] = [
  MatInputModule,
  MatRippleModule,
  MatSidenavModule,
  MatToolbarModule,
  MatButtonModule,
  MatSelectModule,
  MatIconModule,
  MatExpansionModule,
  MatListModule,
  MatSlideToggleModule,
  MatDialogModule
];

@NgModule({
  imports: [
    CommonModule,
    ...importExport
  ],
  exports: importExport,
  declarations: []
})
export class MaterialModule {}
