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
import { HttpInterceptorService } from '../core/services/http-interceptor.service';
import { RouterModule } from '@angular/router';

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
    PipesModule
  ],
  declarations: [LugaresDataComponent, LugarNewComponent],
  exports: [LugaresDataComponent, RouterModule],
  providers: [LugaresService, LugarService, {provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true}]
})
export class LugaresModule { }
