import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClarityModule, ClrCheckboxNextModule, ClrFormsNextModule } from '@clr/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';
import { AuthComponent } from './auth/auth.component';
import { AuthModule } from './auth/auth.module';
import { CoreModule } from './core/core.module';
import { PipesModule } from './pipes/pipes.module';

// import { CalendarComponent } from './calendario/components/calendar/calendar.component';
// import {SnotifyModule, SnotifyService, ToastDefaults} from 'ng-snotify';


@NgModule({
  declarations: [
    AppComponent,
    AuthComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ClrCheckboxNextModule ,
    ClarityModule,
    ClrFormsNextModule,
    FormsModule,
    ReactiveFormsModule,
    AuthModule,
    CoreModule,
    PipesModule,
    // SnotifyModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
