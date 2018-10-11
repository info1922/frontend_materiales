import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';
import { Lugares, Lugar } from '../models/lugares';



const BASE_URL = 'http://localhost:3000/api';

@Injectable({
  providedIn: 'root'
})
export class LugaresService {


  constructor(private httpClient: HttpClient) { }

  getLugares(): Observable<Lugares[]> {
    return this.httpClient.get<Lugares[]>(`${BASE_URL}/lugar`);
  }

  buscarLugares(termino: string) {
    const url = BASE_URL + '/buscar/lugares/' + termino;
    return this.httpClient.get(url).pipe(map((resp: any) => {
      // console.log(resp.lugares);
      return resp.lugares;
    }));
  }

  buscarLugar(id: string) {
    const url = BASE_URL + '/lugar/' + id;

    return this.httpClient.get(url).pipe(map((resp: any) => {
      // console.log('Servicio: ', resp.lugar);
      const res = [resp.lugar];
      return resp.lugar;
    }));
  }


  crearLugar(lugar: Lugar) {
    const url = BASE_URL + '/lugar';
    return this.httpClient.post(url, lugar).pipe(map((resp: any) => {
      return resp;
    }));
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

    // const url = BASE_URL + `/upload/${tipo}/${id}`;
    // const formData: FormData = new FormData();
    // formData.append('imagen', fileItem, fileItem.name);
    // return this.httpClient.put(url, formData);
  }

}
