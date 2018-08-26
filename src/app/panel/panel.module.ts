import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClarityModule, ClrCheckboxNextModule, ClrFormsNextModule } from '@clr/angular';
import { PanelRoutingModule } from './panel-routing.module';
import { PanelComponent } from './panel.component';
import { MainContentComponent } from './components/main-content/main-content.component';
import { NavComponent } from './components/nav/nav.component';
import { HeaderComponent } from './components/header/header.component';
import { VerticalNavCases } from './components/nav/menu';
import { LugaresModule } from '../lugares/lugares.module';
import { MaterialesModule } from '../materiales/materiales.module';
import { UsuariosModule } from '../usuarios/usuarios.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PanelRoutingModule,
    UsuariosModule,
    LugaresModule,
    MaterialesModule,
    ClrCheckboxNextModule,
    ClarityModule,
    ClrFormsNextModule,
  ],
  declarations: [PanelComponent, MainContentComponent, NavComponent, HeaderComponent],
  providers: [VerticalNavCases]
})
export class PanelModule { }
