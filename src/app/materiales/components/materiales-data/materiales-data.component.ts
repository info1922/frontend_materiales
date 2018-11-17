import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MaterialesService } from '../../services/materiales.service';
import { JwtService } from '../../../core/services/jwt.service';
import { SnotifyService, SnotifyPosition } from 'ng-snotify';
import { Materiales, Material } from '../../models/materiales';

@Component({
  selector: 'app-materiales-data',
  templateUrl: './materiales-data.component.html',
  styleUrls: ['./materiales-data.component.css']
})
export class MaterialesDataComponent implements OnInit {


  constructor(
    private router: Router,
    private materialService: MaterialesService,
    private jwtService: JwtService,
    private notify: SnotifyService
    ) { }

    cargando = true;

    style = 'material';
    position: SnotifyPosition = SnotifyPosition.centerCenter;

    dataMateriales: Materiales[] = [];
    public basic = false;
    datoMaterial;

  // total = this.users.length;

  ngOnInit() {
    this.getMateriales();
  }

  getMateriales() {
    this.cargando = true;
    this.materialService.getMateriales().subscribe((data: any) => {
      // console.log('Materiales: ', data);
      this.dataMateriales = data.materiales;
      // console.log(this.dataMateriales);
      this.cargando = false;
    }, (err: any) => {
      if (err.statusText === 'Unauthorized' && err.status === 401) {
        this.jwtService.destroyToken();
        this.router.navigate(['login']);
      }
    });
  }

  onEdit(material) {
    // console.log(material);
    this.router.navigate(['/panel/materiales', material._id]);
  }

  eliminacion(material: Material) {
    // console.log('eliminar');
    this.notify.confirm( '¿Esta seguro de eliminar este registro?', {
      showProgressBar: false,
      closeOnClick: false,
      pauseOnHover: false,
      position: this.position,
      titleMaxLength: 40,
      bodyMaxLength: 1000,
      buttons: [
        {text: 'Si', action: (toast) => {this.onDelete(material); this.notify.remove(toast.id); }},
        {text: 'No', action: (toast) => this.notify.remove(toast.id)}
      ]
    });
  }

  onDelete(material: Material) {
    // console.log('Eliminar', lugar);
    // this.lugarService.onDelete(lugar._id);
    this.materialService.deleteMaterial(material._id)
      .subscribe((data: any) => {
        console.log('Material eliminado correctamente');
        this.getMateriales();
      }, err => {
        console.log('Error al eliminar el material', err);
      });
  }

  newMaterial() {
    this.router.navigate(['panel', 'materiales', 'nuevo']);
  }

}
