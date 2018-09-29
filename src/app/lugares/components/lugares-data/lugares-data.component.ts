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

  ngOnInit() {
    this.getLugares();
  }

  getLugares() {
    this.cargando = true;
    this.lugarService.getLugares().subscribe((data: any) => {
      this.dataLugares = data.lugarlist;
      this.cargando = false;
      console.log(data.lugarlist);
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

  onDetail(lugar) {
    console.log('Detalles', lugar);
  }

  newLugar() {
    this.router.navigate(['panel', 'lugares', 'nuevo']);
  }

}
