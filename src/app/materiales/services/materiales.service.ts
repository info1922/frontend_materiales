import { Injectable } from '@angular/core';
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

  constructor(public httpClient: HttpClient,
    public jwtService: JwtService,
    private notify: SnotifyService) { }

    getMateriales(): Observable<Materiales[]> {
      return this.httpClient.get<Materiales[]>(`${BASE_URL}/material`);
    }


    crearMaterial(material: Material) {
      let url = BASE_URL + '/material';

      // Actualizar o agregar
      console.log('Id del material: ', material._id);
      if (material._id) {
        // console.log('id del lugar: ', material._id);
        // Actualizar
        url += '/' + material._id;
        return this.httpClient.put(url, material).pipe(map((resp: any) => {
          console.log('Material actualizado correctamente');
          return resp;
        }));
      } else {
        // Creando
        return this.httpClient.post(url, material).pipe(map((resp: any) => {
          console.log('Material creado correctamente');
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

    deleteMaterial(id: string) {
      const url = BASE_URL + `/material/${id}`;

      return this.httpClient.delete(url).pipe(map((resp: any) => {
        // console.log('Respuesta del servidor: ', resp);
        // console.log('Material borrado');
        // this.onSuccess('Lugar eliminado correctamente', 'assets/toast/trash.svg');
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
}
