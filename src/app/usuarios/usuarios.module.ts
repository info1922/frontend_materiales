import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuariosDataComponent } from './components/usuarios-data/usuarios-data.component';
import { FormsModule } from '@angular/forms';
import { ClarityModule, ClrCheckboxNextModule, ClrFormsNextModule } from '@clr/angular';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ClrCheckboxNextModule ,
    ClarityModule,
    ClrFormsNextModule,
  ],
  declarations: [UsuariosDataComponent],
  exports: [UsuariosDataComponent]
})
export class UsuariosModule { }
