import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {FormGroup, FormControl, Validators, NgForm} from '@angular/forms';
import { LugaresService } from '../../services/lugares.service';
import { Lugar, Lugares } from '../../models/lugares';

@Component({
  selector: 'app-lugar-new',
  templateUrl: './lugar-new.component.html',
  styleUrls: ['./lugar-new.component.css']
})
export class LugarNewComponent implements OnInit {

  exampleForm: FormGroup;

  lugar: Lugar = new Lugar('', '');

  // Imagen
  imagenSubir: File;
  imagenTem: any;
  sub = null;
  standalone = true;
  //

  constructor(
    private router: Router,
    private lugaresService: LugaresService,
    private activatedRouter: ActivatedRoute) {
      activatedRouter.params.subscribe(params => {
        // Obtener el id del lugar URL
        const id = params['id'];
        if (id !== 'nuevo') {
          this.cargarLugar(id);
        }
      });
    }

  ngOnInit() {
    this.crearFormulario();
    this.lugaresService.notificacion.subscribe(resp => {
      console.log('Respuesta notificacion: ', resp);
    });
    this.sub = null;
  }

  crearFormulario() {
    this.exampleForm = new FormGroup({
      nombre: new FormControl('', Validators.required),
      direccion: new FormControl('', Validators.required)
    });
  }

  registrarLugar(f: NgForm) {

    if (f.invalid) {
      return;
    }
    // console.log('Valor del formulario: ', this.exampleForm.value);
    this.sub = null || '';
    // console.log('Datos del formulario:', this.lugar);
    this.lugaresService.crearLugar(this.lugar)
      .subscribe((data: any) => {
        console.log(data);
        // console.log('Id del lugar desde componente ', data.lugarlist._id);
        this.subirImagen(data.lugar._id);
        console.log('Guardado correctamente');
        this.router.navigate(['/panel/lugares', data.lugar._id]);
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

// Actualizar la imagen del lugar con el evento emitter

  subirImagen(id: string) {
    if (this.imagenSubir) {
      // this.lugaresService.subirArchivo(this.imagenSubir, 'lugares', id)
      //   .subscribe((data: any) => {
      //     console.log('Imagen subida', data);
      //   });
    this.lugaresService.subirArchivo(this.imagenSubir, 'lugares', id)
      .then((resp: any) => {
        console.log('Imagen subida correctamente', resp);
        this.lugar.img = resp.lugarActualizado.img;
      })
      .catch(err => {
        console.log('Error al cargar la imagen');
      });
    }
  }

  cargarLugar(id: string) {
    this.lugaresService.buscarLugar(id).subscribe((lugar: Lugar) => {
      console.log(lugar);
      this.lugar = lugar;
    });
  }
  // this.lugar.nombre = lugar.nombre;
  // this.lugar.direccion = lugar.direccion;
  // this.lugar.img = lugar.img;
  // console.log(this.lugar.nombre);
  // console.log(lugar);

}
