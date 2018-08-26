import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{
    path: 'panel',
    loadChildren: '../app/panel/panel.module#PanelModule'
}, {
    path: '**',
    redirectTo: 'panel'
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
