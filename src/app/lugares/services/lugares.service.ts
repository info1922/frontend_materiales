import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Lugares } from '../models/lugares';

const BASE_URL = 'http://localhost:3000/api';

@Injectable({
  providedIn: 'root'
})
export class LugaresService {


  constructor(private httpClient: HttpClient) { }

  getLugares(): Observable<Lugares[]> {
    return this.httpClient.get<Lugares[]>(`${BASE_URL}/lugar`);
  }

}
