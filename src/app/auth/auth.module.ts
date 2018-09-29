import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClarityModule, ClrCheckboxNextModule, ClrFormsNextModule } from '@clr/angular';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ClrCheckboxNextModule ,
    ClarityModule,
    ClrFormsNextModule,
  ],
  declarations: []
})
export class AuthModule { }
