import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {FormGroup, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-lugar-new',
  templateUrl: './lugar-new.component.html',
  styleUrls: ['./lugar-new.component.css']
})
export class LugarNewComponent implements OnInit {

  exampleForm: FormGroup;
  sub = null;

  constructor(private router: Router) { }

  ngOnInit() {
    this.crearFormulario();
    this.sub = null;
  }

  returnLugares() {
    this.router.navigate(['panel', 'lugares']);
  }


  crearFormulario() {
    this.exampleForm = new FormGroup({
      nombre: new FormControl('', Validators.required),
      direccion: new FormControl('', Validators.required)
    });
  }

  seleccionImage(event) {
    console.log(event);
  }


}
