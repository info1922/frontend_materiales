import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {FormGroup, FormControl, Validators, NgForm} from '@angular/forms';
import { LugaresService } from '../../services/lugares.service';
import { Lugar, Lugares } from '../../models/lugares';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-lugar-new',
  templateUrl: './lugar-new.component.html',
  styleUrls: ['./lugar-new.component.css']
})
export class LugarNewComponent implements OnInit {

  title: string;
  exampleForm: FormGroup;
  lugar: Lugar = new Lugar('', '');

  // Imagen
  imagenSubir: File;
  imagenTem: any;
  sub = null;
  standalone = true;
  cargando = false;
  cargandoImagen = false;
  closed = true;
  enableButton = false;
  crear = false;
  //

  constructor(
    private router: Router,
    private lugaresService: LugaresService,
    private activatedRouter: ActivatedRoute,
    private toastr: ToastrService
    ) {
      activatedRouter.params.subscribe(params => {
        // Obtener el id del lugar URL
        const id = params['id'];
        if (id !== 'nuevo') {
          this.cargarLugar(id);
          this.enableButton = true;
        } else {
          this.lugar.nombre = '';
          this.lugar.direccion = '';
          this.enableButton = false;
          this.lugar.img = undefined;
        }
      });
    }

  ngOnInit() {
    this.crearFormulario();
    this.cargandoImagen = false;
    this.lugaresService.notificacion.subscribe(resp => {
      this.cargandoImagen = false;
      console.log('Respuesta notificacion: ', resp);
      setTimeout(function() {
        this.cargandoImagen = true;
      }, 2000);
      this.cargandoImagen = true;
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
    this.cargando = true;
    // console.log('Valor del formulario: ', this.exampleForm.value);
    this.sub = null || '';
    // console.log('Datos del formulario:', this.lugar);
    this.lugaresService.crearLugar(this.lugar)
      .subscribe((data: any) => {
        // console.log(data);
        this.subirImagen(data.lugar._id);
        this.cargando = false;
        // this.enableButton = false;
        this.router.navigate(['/panel/lugares', data.lugar._id]);
        this.enableButton = true;
        this.toastr.success('Registro guardado correctamente', 'Guardado');
      }, err => {
        console.log('Error al guardar el lugar');
      });
      this.imagenTem = null;
      this.exampleForm.reset();
  }

  returnLugares() {
    // window.location.href = '/panel/lugares';
    this.router.navigate(['panel', 'lugares']);

    // this.onSuccess();
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
