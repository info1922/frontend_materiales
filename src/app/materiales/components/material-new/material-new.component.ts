import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {FormGroup, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-material-new',
  templateUrl: './material-new.component.html',
  styleUrls: ['./material-new.component.css']
})
export class MaterialNewComponent implements OnInit {


  materialForm: FormGroup;
  sub = null;

  constructor(private router: Router) { }

  ngOnInit() {
    this.crearFormulario();
    this.sub = null;
  }

  returnMateriales() {
    this.router.navigate(['panel', 'materiales']);
  }

  crearFormulario() {
    this.materialForm = new FormGroup({
      name: new FormControl('', Validators.required),
      cantidad: new FormControl('', Validators.required)
    });
  }

  seleccionImage(event) {
    console.log(event);
  }

}
