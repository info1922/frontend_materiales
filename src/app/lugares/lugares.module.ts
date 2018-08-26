import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LugaresDataComponent } from './components/lugares-data/lugares-data.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClarityModule, ClrCheckboxNextModule, ClrFormsNextModule } from '@clr/angular';
import { LugarNewComponent } from './components/lugar-new/lugar-new.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ClrCheckboxNextModule ,
    ClarityModule,
    ClrFormsNextModule,
  ],
  declarations: [LugaresDataComponent, LugarNewComponent],
  exports: [LugaresDataComponent]
})
export class LugaresModule { }
