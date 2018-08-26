import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClrCheckboxNextModule, ClrFormsNextModule } from '@clr/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    ClrCheckboxNextModule ,
    ClarityModule,
    ClrFormsNextModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    BrowserAnimationsModule,
    ClrCheckboxNextModule ,
    ClarityModule,
    ClrFormsNextModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: []
})
export class ClarityModule { }
