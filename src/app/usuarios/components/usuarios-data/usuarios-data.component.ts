import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-usuarios-data',
  templateUrl: './usuarios-data.component.html',
  styleUrls: ['./usuarios-data.component.css']
})
export class UsuariosDataComponent implements OnInit {

  constructor() { }

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
}
