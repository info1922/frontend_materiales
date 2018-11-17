import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialesDataComponent } from './components/materiales-data/materiales-data.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClarityModule, ClrCheckboxNextModule, ClrFormsNextModule } from '@clr/angular';
import { MaterialNewComponent } from './components/material-new/material-new.component';
import { HttpClientModule } from '@angular/common/http';
import { PipesModule } from '../pipes/pipes.module';

import {SnotifyModule, SnotifyService, ToastDefaults} from 'ng-snotify';
import { MaterialesService } from './services/materiales.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
    ReactiveFormsModule,
    ClrCheckboxNextModule ,
    ClarityModule,
    ClrFormsNextModule,
    PipesModule,
    SnotifyModule
  ],
  providers: [MaterialesService, SnotifyService,
    { provide: 'SnotifyToastConfig', useValue: ToastDefaults}],
  declarations: [MaterialesDataComponent, MaterialNewComponent],
  exports: [MaterialesDataComponent]
})
export class MaterialesModule { }
