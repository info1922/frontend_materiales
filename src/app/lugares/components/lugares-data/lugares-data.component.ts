import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LugaresService } from '../../services/lugares.service';
import { Lugares, Lugar } from '../../models/lugares';
import { JwtService } from '../../../core/services/jwt.service';
import { SnotifyService, SnotifyPosition } from 'ng-snotify';

@Component({
  selector: 'app-lugares-data',
  templateUrl: './lugares-data.component.html',
  styleUrls: ['./lugares-data.component.css']
})
export class LugaresDataComponent implements OnInit {

  constructor( private router: Router,
    private lugarService: LugaresService,
    private jwtService: JwtService,
    private notify: SnotifyService) { }

  // tipo: string;
  style = 'material';
  position: SnotifyPosition = SnotifyPosition.centerCenter;

  dataLugares: Lugares[] = [];
  cargando = true;
  public basic = false;
  datoLugar;
  // datoLugar: Array<[]>;

  ngOnInit() {
    this.getLugares();
  }

  getLugares() {
    this.cargando = true;
    this.lugarService.getLugares().subscribe((data: any) => {
      // console.log(data);
      this.dataLugares = data.lugarlist;
      this.cargando = false;
      // console.log(data.lugarlist);
    }, (err: any ) => {
      // console.log('Error al obtener datos: ', err);

      if (err.statusText === 'Unauthorized' && err.status === 401) {
        this.jwtService.destroyToken();
        this.router.navigate(['login']);
      }
    });
  }

  onDetail(id: any) {
    this.basic = true;
    console.log(id);
    this.lugarService.buscarLugar(id).subscribe((data: any) => {
      // console.log([data]);
      this.datoLugar = [data];
      // console.log('Datos del lugar: ', this.datoLugar);
    }, err => {
      console.log(err);
    });
  }

  onEdit(lugar) {
    // console.log('Editar', lugar);
    this.router.navigate(['/panel/lugares', lugar._id]);
  }

  eliminacion(lugar: Lugar) {
    // console.log('eliminar');
    this.notify.confirm( '¿Esta seguro de eliminar este registro?', {
      showProgressBar: false,
      closeOnClick: false,
      pauseOnHover: false,
      position: this.position,
      titleMaxLength: 40,
      bodyMaxLength: 1000,
      buttons: [
        {text: 'Si', action: (toast) => {this.onDelete(lugar); this.notify.remove(toast.id); }},
        {text: 'No', action: (toast) => this.notify.remove(toast.id)}
      ]
    });
  }

  onDelete(lugar: Lugar) {
    // console.log('Eliminar', lugar);
    // this.lugarService.onDelete(lugar._id);
    this.lugarService.deleteLugar(lugar._id)
      .subscribe((data: any) => {
        console.log('Lugar eliminado correctamente');
        this.getLugares();
      }, err => {
        console.log('Error al eliminar el lugar', err);
      });
  }


  // newLugar() {
  //   this.router.navigate(['panel', 'lugares', 'nuevo']);
  // }

  buscarLugar(termino: string) {

    if (termino.length === 0) {
      this.getLugares();
      return;
    }

    this.cargando = true;
    this.lugarService.buscarLugares(termino)
      .subscribe((lugares: Lugares[]) => {
        this.dataLugares = lugares;
        this.cargando = false;
      });
  }

  generaPDF(tipo) {
    console.log(tipo);
    // console.log('Generando pdf ...');
    this.lugarService.reporte();
  }

}
