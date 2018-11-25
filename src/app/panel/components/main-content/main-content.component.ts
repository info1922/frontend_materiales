import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtService } from 'src/app/core/services/jwt.service';
import { MaterialesService } from 'src/app/materiales/services/materiales.service';
import { LugaresService } from '../../../lugares/services/lugares.service';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.css']
})
export class MainContentComponent implements OnInit {

  bienvenido: string;
  totalUsuarios: number;
  totalMateriales: number;
  totoalLugares: number;

  constructor( public router: Router,
    public jwtService: JwtService,
    public serviceMaterial: MaterialesService,
    public serviceLugar: LugaresService) { }

  ngOnInit() {
    this.bienvenida();
    this.totalMa();
    this.totalLu();
  }


  bienvenida() {
    this.serviceMaterial.bienvenida().subscribe((data: any)  => {
      // console.log(data);
      this.bienvenido = data.mensaje;
    }, (err: any) => {
      if (err.statusText === 'Unauthorized' && err.status === 401) {
        this.jwtService.destroyToken();
        this.router.navigate(['login']);
      }
    });
   }

   totalMa() {
    this.serviceMaterial.getMateriales().subscribe((data: any) => {
      this.totalMateriales = data.materiales.length;
      // console.log('Total datos: ', this.totalMateriales);
    }, (err: any) => {
      console.log('Error');
    });
   }

   totalLu() {
     this.serviceLugar.getLugares().subscribe((data: any) => {
      this.totoalLugares = data.lugarlist.length;
      // console.log('Total data: ', this.totoalLugares);
     }, (err: any) => {
       console.log('Error');
     });
   }

}
