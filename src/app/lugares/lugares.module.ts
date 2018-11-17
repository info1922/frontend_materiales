import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LugaresDataComponent } from './components/lugares-data/lugares-data.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClarityModule, ClrCheckboxNextModule, ClrFormsNextModule } from '@clr/angular';
import { LugarNewComponent } from './components/lugar-new/lugar-new.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LugaresService } from './services/lugares.service';
import { PipesModule } from '../pipes/pipes.module';
import { LugarService } from './services/lugar.service';
import { RouterModule } from '@angular/router';
import {SnotifyModule, SnotifyService, ToastDefaults} from 'ng-snotify';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    ClrCheckboxNextModule ,
    ClarityModule,
    ClrFormsNextModule,
    PipesModule,
    SnotifyModule
  ],
  declarations: [LugaresDataComponent, LugarNewComponent],
  exports: [LugaresDataComponent, RouterModule],
  providers: [LugaresService, LugarService, SnotifyService,
    { provide: 'SnotifyToastConfig', useValue: ToastDefaults}],
})
export class LugaresModule { }
