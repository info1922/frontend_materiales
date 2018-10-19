import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LugaresService } from '../../services/lugares.service';
import { Lugares } from '../../models/lugares';

@Component({
  selector: 'app-lugares-data',
  templateUrl: './lugares-data.component.html',
  styleUrls: ['./lugares-data.component.css']
})
export class LugaresDataComponent implements OnInit {

  constructor( private router: Router, private lugarService: LugaresService) { }

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
      this.dataLugares = data.lugarlist;
      this.cargando = false;
      // console.log(data.lugarlist);
    }, err => {
      console.log(err);
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
    console.log('Editar', lugar);
  }

  onDelete(lugar) {
    console.log('Eliminar', lugar);
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

}
