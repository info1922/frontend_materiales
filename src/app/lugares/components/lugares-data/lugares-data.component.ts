import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lugares-data',
  templateUrl: './lugares-data.component.html',
  styleUrls: ['./lugares-data.component.css']
})
export class LugaresDataComponent implements OnInit {

  constructor( private router: Router) { }

  users = [
    {id: 1, name: 'Ivan', creation: 'datos', color: 'Rojo'},
    {id: 1, name: 'Ivan', creation: 'datos', color: 'Rojo'},
    {id: 1, name: 'Ivan', creation: 'datos', color: 'Rojo'},
    {id: 1, name: 'Ivan', creation: 'datos', color: 'Rojo'},
    {id: 1, name: 'Ivan', creation: 'datos', color: 'Rojo'},
    {id: 1, name: 'Ivan', creation: 'datos', color: 'Rojo'},
    {id: 1, name: 'Ivan', creation: 'datos', color: 'Rojo'}
  ];

  total = this.users.length;

  ngOnInit() {
  }

  onEdit() {
    console.log('Editar');
  }

  onDelete() {
    console.log('Eliminar');
  }

  newLugar() {
    this.router.navigate(['panel', 'lugares', 'nuevo']);
  }

}
