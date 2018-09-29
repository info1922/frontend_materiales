import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LugaresDataComponent } from './components/lugares-data/lugares-data.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClarityModule, ClrCheckboxNextModule, ClrFormsNextModule } from '@clr/angular';
import { LugarNewComponent } from './components/lugar-new/lugar-new.component';
import { HttpClientModule } from '@angular/common/http';
import { LugaresService } from './services/lugares.service';
import { PipesModule } from '../pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    ClrCheckboxNextModule ,
    ClarityModule,
    ClrFormsNextModule,
    PipesModule
  ],
  declarations: [LugaresDataComponent, LugarNewComponent],
  exports: [LugaresDataComponent],
  providers: [LugaresService]
})
export class LugaresModule { }
