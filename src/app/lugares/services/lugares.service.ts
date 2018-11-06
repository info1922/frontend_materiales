import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {map, window} from 'rxjs/operators';
import { Lugares, Lugar } from '../models/lugares';
import { SnotifyService, SnotifyPosition } from 'ng-snotify';
import { JwtService } from '../../core/services/jwt.service';

import {saveAs} from 'file-saver';



const BASE_URL = 'http://localhost:3000/api';

@Injectable({
  providedIn: 'root'
})
export class LugaresService {

  style = 'material';
  position: SnotifyPosition = SnotifyPosition.rightTop;
  img = `assets/toast/save.svg`;

  public notificacion = new EventEmitter<any>();

  constructor(private httpClient: HttpClient,
    private jwtService: JwtService,
    private notify: SnotifyService) { }

  getLugares(): Observable<Lugares[]> {
    return this.httpClient.get<Lugares[]>(`${BASE_URL}/lugar`);
  }


  onSuccess(title: string, icono: string) {
    this.notify.success(title, {
      timeout: 3000,
      showProgressBar: false,
      closeOnClick: false,
      pauseOnHover: false,
      position: this.position,
      titleMaxLength: 40,
      bodyMaxLength: 1000,
      icon: icono
    });
  }

  buscarLugares(termino: string) {
    const url = BASE_URL + '/buscar/lugares/' + termino;
    return this.httpClient.get(url).pipe(map((resp: any) => {
      // console.log(resp.lugares);
      return resp.lugares;
    }));
  }

  // Buscar para actualizar y para mas información
  buscarLugar(id: string) {
    const url = BASE_URL + '/lugar/' + id;
    return this.httpClient.get(url).pipe(map((resp: any) => {
      // console.log('Servicio: ', resp.lugar);
      const res = [resp.lugar];
      return resp.lugar;
    }));
  }


  crearLugar(lugar: Lugar) {
    let url = BASE_URL + '/lugar';

    // Actualiza o agrega
    if (lugar._id) {
      console.log('Id del lugar: ', lugar._id);
      // Actualizar
      url += '/' + lugar._id;
      return this.httpClient.put(url, lugar).pipe(map((resp: any) => {
        console.log('Actualizado correctamente');
        this.onSuccess('Lugar actualizado correctamente', 'assets/toast/refresh.svg');
        return resp;
      }));
    } else {
      // Creando
      return this.httpClient.post(url, lugar).pipe(map((resp: any) => {
        this.onSuccess('Lugar guardado correctamente', 'assets/toast/save.svg');
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
      console.log(url);
      xhr.open('PUT', url, true);
      xhr.send(formData);

    });
  }

  deleteLugar(id: string) {
    const url = BASE_URL + `/lugar/${id}`;

    return this.httpClient.delete(url).pipe(map((resp: any) => {
      // console.log('Respuesta del servidor: ', resp);
      // console.log('Material borrado');
      this.onSuccess('Lugar eliminado correctamente', 'assets/toast/trash.svg');
      return resp;
    }));
  }

  reporte() {
    const url = BASE_URL + `/pdf/lugares`;

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
      return new Blob([obj], {type: 'application/pdf'});
    })).subscribe(blob => {
      // console.log('Blob', blob);
      saveAs(blob, 'lugaressss.pdf');
    }, error => {
      console.log(error, 'pdfff');
    });
  }

}
