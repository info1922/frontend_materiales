import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtService } from '../../core/services/jwt.service';
import { SnotifyService, SnotifyPosition } from 'ng-snotify';
import { Observable } from 'rxjs';
import {map, window} from 'rxjs/operators';
import { Materiales, Material } from '../models/materiales';

const BASE_URL = 'http://localhost:3000/api';

@Injectable({
  providedIn: 'root'
})
export class MaterialesService {


  style = 'material';
  position: SnotifyPosition = SnotifyPosition.rightTop;
  img = `assets/toast/save.svg`;
  generarPdf = false;
  public notificacion = new EventEmitter<any>();

  constructor(public httpClient: HttpClient,
    public jwtService: JwtService,
    private notify: SnotifyService) { }

    getMateriales(): Observable<Materiales[]> {
      return this.httpClient.get<Materiales[]>(`${BASE_URL}/material`);
    }

    onSuccess(title: string, icono: string) {
      this.notify.success(title, {
        timeout: 2000,
        showProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        position: this.position,
        titleMaxLength: 40,
        bodyMaxLength: 1000,
        icon: icono
      });
    }


    crearMaterial(material: Material) {
      let url = BASE_URL + '/material';

      // Actualizar o agregar
      // console.log('Id del material: ', material._id);
      if (material._id) {
        // console.log('id del lugar: ', material._id);
        // Actualizar
        url += '/' + material._id;
        return this.httpClient.put(url, material).pipe(map((resp: any) => {
          console.log('Actualizado correctamente');
          // this.onSuccess('Material actualizado correctamente', 'assets/toast/refresh.svg');
          return resp;
        }));
      } else {
        // Creando
        return this.httpClient.post(url, material).pipe(map((resp: any) => {
          console.log('Guardado correctamente');
          // this.onSuccess('Material guardado correctamente', 'assets/toast/save.svg');
          return resp;
        }));
      }
    }

    subirArchivo(fileItem: File, tipo: string, id: string) {
      // const url = BASE_URL + '/upload/' + tipo + '/' + id;
      return new Promise((resolve, reject) => {
        const formData = new FormData();
        const xhr = new XMLHttpRequest();

        formData.append('imagen', fileItem, fileItem.name);

        xhr.onreadystatechange = function () {
          if (xhr.readyState === 4) {
            if (xhr.status === 200) {
              resolve(JSON.parse(xhr.response));
              // console.log('Imagen subida correctamente');
            } else {
              console.log('Fallo la subida de imagen', xhr.response);
              // console.log('Error: ', JSON.parse(xhr.response));
              reject(JSON.parse(xhr.response));
            }
          }
        };

        const url = BASE_URL + `/upload/${tipo}/${id}`;
        // console.log(url);
        xhr.open('PUT', url, true);
        xhr.send(formData);

      });
    }

    deleteMaterial(id: string) {
      const url = BASE_URL + `/material/${id}`;

      return this.httpClient.delete(url).pipe(map((resp: any) => {
        // console.log('Respuesta del servidor: ', resp);
        // console.log('Material borrado');
        // this.onSuccess('Lugar eliminado correctamente', 'assets/toast/trash.svg');
        // this.onSuccess('Material eliminado correctamente', 'assets/toast/trash.svg');
        return resp;
      }));
    }

    buscarMaterial(id: string) {
      const url = BASE_URL + '/material/' + id;
      return this.httpClient.get(url).pipe(map((resp: any) => {
        // console.log('Servicio: ', resp);
        const res = [resp.material];
        return resp.material;
      }));
    }

    buscarMateriales(termino: string) {
      const url = BASE_URL + '/buscar/materiales/' + termino;
      return this.httpClient.get(url).pipe(map((resp: any) => {
        // console.log(resp.lugares);
        return resp.materiales;
      }));
    }

    bienvenida() {
      const url = BASE_URL + '/material/bienvenido';
      return this.httpClient.get(url).pipe(map((resp: any) => {
        console.log(resp);
        return resp;
      }));
    }

    reporte() {
      const url = BASE_URL + `/pdf/materiales`;

      const headerConfig = {
        'Content-Type' : 'application/json',
        'Accept' : 'application/json',
        'Authorization': `bearer ${this.jwtService.getToken}`
      };
      // tslint:disable-next-line:no-debugger

      const token = this.jwtService.getToken();

      if (token) {
        headerConfig['Authorization'] = `bearer ${token}`;
      }

      return this.httpClient.get(url, {responseType: 'blob'}).pipe(map((res) => {
        // console.log('Blob', res);
        const obj: any = res;
        // console.log('obj: ', obj);
        this.generarPdf = true;
        return new Blob([obj], {type: 'application/pdf'});
      })).subscribe(blob => {
        // this.generarPdf = false;
          saveAs(blob, 'materiales.pdf');
        this.generarPdf = false;
      }, error => {
        console.log(error, 'Error al generar el reporte');
      });
    }
}
