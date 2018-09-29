import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ImagenPipe } from './imagen.pipe';
import { HttpInterceptorService } from '../core/services/http-interceptor.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ImagenPipe],
  exports: [ImagenPipe]
})
export class PipesModule { }
