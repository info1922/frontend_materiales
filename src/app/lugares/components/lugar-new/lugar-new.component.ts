import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import { LugaresService } from '../../services/lugares.service';

@Component({
  selector: 'app-lugar-new',
  templateUrl: './lugar-new.component.html',
  styleUrls: ['./lugar-new.component.css']
})
export class LugarNewComponent implements OnInit {

  exampleForm: FormGroup;

  // Imagen
  imagenSubir: File;
  imagenTem: any;
  sub = null;
  standalone = true;
  //

  constructor(private router: Router, private lugaresService: LugaresService) { }

  ngOnInit() {
    this.crearFormulario();
    this.sub = null;
  }

  crearFormulario() {
    this.exampleForm = new FormGroup({
      nombre: new FormControl('', Validators.required),
      direccion: new FormControl('', Validators.required)
    });
  }

  registrarLugar() {
    console.log('Valor del formulario: ', this.exampleForm.value);
    this.sub = null || '';
    this.lugaresService.crearLugar(this.exampleForm.value)
      .subscribe((data: any) => {
        // console.log('Data: ', data);
        this.subirImagen(data.lugarlist._id);
        console.log('Guardado correctamente');
      }, err => {
        console.log('Error al guardar el lugar');
      });
      this.imagenTem = null;
      this.exampleForm.reset();
  }

  returnLugares() {
    this.router.navigate(['panel', 'lugares']);
  }

  seleccionImage(archivo: File) {
    if (!archivo) {
      this.imagenSubir = null;
      return;
    }

    if (archivo.type.indexOf('image') < 0) {
      this.imagenSubir = null;
      return;
    }

    this.imagenSubir = archivo;
    const reader = new FileReader();
    const urlImagenTemp = reader.readAsDataURL(archivo);

    reader.onload = () => this.imagenTem = reader.result;

  }

  subirImagen(id: string) {
    if (this.imagenSubir) {
      // this.lugaresService.subirArchivo(this.imagenSubir, 'lugares', id)
      //   .subscribe((data: any) => {
      //     console.log('Imagen subida', data);
      //   });
    this.lugaresService.subirArchivo(this.imagenSubir, 'lugares', id)
      .then(resp => {
        console.log('Imagen subida correctamente');
      })
      .catch(err => {
        console.log('Error al cargar la imagen');
      });
    }
  }


}
