import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth/auth.component';

const routes: Routes = [{
    path: 'login',
    component: AuthComponent
}, {
    path: 'signup',
    component: AuthComponent
}, {
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
