import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PanelComponent } from './panel.component';
import { MainContentComponent } from './components/main-content/main-content.component';
import { LugaresDataComponent } from '../lugares/components/lugares-data/lugares-data.component';
import { MaterialesDataComponent } from '../materiales/components/materiales-data/materiales-data.component';
import { UsuariosDataComponent } from '../usuarios/components/usuarios-data/usuarios-data.component';
import { LugarNewComponent } from '../lugares/components/lugar-new/lugar-new.component';
import { MaterialNewComponent } from '../materiales/components/material-new/material-new.component';
import { AuthGuardService } from '../core/services/auth-guard.service';
import { CalendarComponent } from '../calendario/components/calendar/calendar.component';

const routes: Routes = [
  {
    path : '',
    component: PanelComponent,
    canActivate: [AuthGuardService],
    children: [
      {
        path: '',
        component: MainContentComponent,
        canActivateChild: [AuthGuardService]
      },
      {
        path: 'usuarios',
        component: UsuariosDataComponent,
        canActivateChild: [AuthGuardService]
      },
      {
        path: 'calendario',
        component: CalendarComponent,
        canActivateChild: [AuthGuardService]
      },
      {
        path: 'lugares',
        component: LugaresDataComponent,
        canActivateChild: [AuthGuardService]
      },
      {
        path: 'lugares/:id',
        component: LugarNewComponent,
        canActivateChild: [AuthGuardService]
      },
      {
        path: 'materiales',
        component: MaterialesDataComponent,
        canActivateChild: [AuthGuardService]
      },
      {
        path: 'materiales/nuevo',
        component: MaterialNewComponent,
        canActivateChild: [AuthGuardService]
      },
      {
        path: '**',
        redirectTo: 'panel',
        canActivateChild: [AuthGuardService]
      }
    ]
  },
  {

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PanelRoutingModule { }
