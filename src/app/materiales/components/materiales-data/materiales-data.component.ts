import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-materiales-data',
  templateUrl: './materiales-data.component.html',
  styleUrls: ['./materiales-data.component.css']
})
export class MaterialesDataComponent implements OnInit {

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

  constructor(private router: Router) { }

  ngOnInit() {
  }

  onEdit() {
    console.log('Editar');
  }

  onDelete() {
    console.log('Eliminar');
  }

  newMaterial() {
    this.router.navigate(['panel', 'materiales', 'nuevo']);
  }

}
