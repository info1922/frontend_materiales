import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClrCheckboxNextModule, ClrFormsNextModule } from '@clr/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PipesModule } from '../pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    ClrCheckboxNextModule ,
    ClarityModule,
    ClrFormsNextModule,
    FormsModule,
    ReactiveFormsModule,
    PipesModule
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
