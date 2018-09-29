import { Injectable } from '@angular/core';
import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../environments/environment';


@Pipe({
  name: 'imagen'
})
@Injectable({
  providedIn: 'root'
})
export class ImagenPipe implements PipeTransform {


  transform(img: string, tipo: string = 'usuario'): any {
    let url = environment.api_url + '/imagen';

    // Imagen por defecto
    if (!img) {
      return url + '/usuarios/aaaa';
    }

    // Tipo de colección
    switch (tipo) {
      case 'usuario':
        url += '/usuarios/' + img;
        break;

      case 'material':
        url += '/materiales/' + img;
        break;

      case 'lugar':
        url += '/lugares/' + img;
        break;

      default:
        console.log('Tipo de imagen no existe');
        url += '/usuarios/aaaa';
    }
    return url;
  }

}
