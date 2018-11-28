import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {FormGroup, FormControl, Validators, NgForm, NgSelectOption} from '@angular/forms';
import { Materiales, Material } from '../../models/materiales';
import { MaterialesService } from '../../services/materiales.service';
import { Lugar } from 'src/app/lugares/models/lugares';
import { LugaresService } from '../../../lugares/services/lugares.service';
import { SnotifyService, SnotifyPosition } from 'ng-snotify';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-material-new',
  templateUrl: './material-new.component.html',
  styleUrls: ['./material-new.component.css']
})
export class MaterialNewComponent implements OnInit {

  imagenSubir: File;
  materialForm: FormGroup;
  sub = null;
  lugares: Lugar[] = [];
  material: Material = new Material( '', 1);
  lugar: Lugar = new Lugar('');
  asignar = false;
  cargando = false;
  imagenTem: any;
  enableButton = false;
  cargandoImagen = false;

  constructor(
    private router: Router,
    private materialService: MaterialesService,
    private lugarService: LugaresService,
    private routerParams: ActivatedRoute,
    private toastr: ToastrService
    ) {

      routerParams.params.subscribe(params => {
        // Obtener el id del material
        const id  = params['id'];
        if (id !== 'nuevo') {
          this.crearMaterial(id);
          this.enableButton = true;
        } else {
          this.enableButton = false;
          this.material.title = '';
          this.material.cantidad = 1;
          this.material.lugar = undefined;
          this.material.img = undefined;
        }
      });
    }

  ngOnInit() {
    this.crearFormulario();
    this.cargandoImagen = false;
    this.materialService.notificacion.subscribe(resp => {
      this.cargandoImagen = false;
      setTimeout(function() {
        this.cargandoImagen = true;
      }, 2000);
    });
    this.sub = null;

    this.lugarService.getLugares()
      .subscribe((lugares: any) => {
        return this.lugares = lugares.lugarlist;
      });
  }

  crearFormulario() {
    this.materialForm = new FormGroup({
      title: new FormControl('', Validators.required),
      cantidad: new FormControl(1, Validators.required)
    });
  }

  registrarMaterial(f: NgForm) {

    if (f.invalid) {
      return;
    }
    this.cargando = true;
    // console.log('Valor del formulario: ', this.exampleForm.value);
    this.sub = null || '';
    // console.log('Datos del formulario:', this.lugar);
    this.materialService.crearMaterial(this.material)
      .subscribe((data: any) => {
        console.log(data);
        this.subirImagen(data.matActual2._id);
        this.cargando = false;
        this.router.navigate(['/panel/materiales', data.matActual2._id]);
        this.toastr.success('Registro guardado correctamente', 'Guardado');
        this.enableButton = true;
      }, err => {
        console.log('Error al enviar datos', err);
      });
      this.imagenTem = null;
      this.materialForm.reset();
      // this.material.img = undefined;
  }

  cambioLugar(id: string) {
    this.lugarService.buscarLugar(id)
      .subscribe( lugar => this.lugar = lugar);
  }


  returnMateriales() {
    this.router.navigate(['panel', 'materiales']);
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
    this.materialService.subirArchivo(this.imagenSubir, 'materiales', id)
      .then((resp: any) => {
        console.log('Imagen subida correctamente', resp);
        this.material.img = resp.materialActualizado.img;
      })
      .catch(err => {
        console.log('Error al cargar la imagen');
      });
    }
  }

  crearMaterial(id: string) {
    this.materialService.buscarMaterial(id).subscribe((material: Material) => {
      console.log(material);
      this.material = material;
    });
  }

  rutaNuevo() {
    this.router.navigateByUrl('/panel/materiales/nuevo');
    // this.router.navigate(['/panel/materiales/nuevo']);
  }

}
