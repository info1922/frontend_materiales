import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialesDataComponent } from './components/materiales-data/materiales-data.component';
import { FormsModule } from '@angular/forms';
import { ClarityModule, ClrCheckboxNextModule, ClrFormsNextModule } from '@clr/angular';
import { MaterialNewComponent } from './components/material-new/material-new.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ClrCheckboxNextModule ,
    ClarityModule,
    ClrFormsNextModule,
  ],
  declarations: [MaterialesDataComponent, MaterialNewComponent],
  exports: [MaterialesDataComponent]
})
export class MaterialesModule { }
