import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PanelComponent } from './panel.component';
import { MainContentComponent } from './components/main-content/main-content.component';
import { LugaresDataComponent } from '../lugares/components/lugares-data/lugares-data.component';
import { MaterialesDataComponent } from '../materiales/components/materiales-data/materiales-data.component';
import { UsuariosDataComponent } from '../usuarios/components/usuarios-data/usuarios-data.component';
import { LugarNewComponent } from '../lugares/components/lugar-new/lugar-new.component';
import { MaterialNewComponent } from '../materiales/components/material-new/material-new.component';

const routes: Routes = [
  {
    path : '',
    component: PanelComponent,
    children: [
      {
        path: '',
        component: MainContentComponent
      },
      {
        path: 'usuarios',
        component: UsuariosDataComponent
      },
      {
        path: 'lugares',
        component: LugaresDataComponent
      },
      {
        path: 'lugares/nuevo',
        component: LugarNewComponent
      },
      {
        path: 'materiales',
        component: MaterialesDataComponent
      },
      {
        path: 'materiales/nuevo',
        component: MaterialNewComponent
      },
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
