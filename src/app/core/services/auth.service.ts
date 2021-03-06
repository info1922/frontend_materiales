import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User, LoginRsp, SignupRsp, Usuario } from '../models/user';
import { Observable } from 'rxjs';
import { JwtService } from './jwt.service';
import { environment } from '../../../environments/environment';
import { map, catchError } from 'rxjs/operators';
import { error } from 'util';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient, private jwtservice: JwtService) { }

   token;

  login(body: User): Observable<LoginRsp> {
    return this.httpClient.post<LoginRsp>(`${environment.api_url}/users/login`, body).pipe(map((resp: any) => {
      // console.log('Respuesta servicio login', resp);
      this.token = [resp.token];
      // console.log('Token desde el servicio: ', this.token);
      return resp;
    }));
  }

  singup(body: Usuario): Observable<SignupRsp> {
    return this.httpClient.post<SignupRsp>(`${environment.api_url}/users/signup`, body);
  }

  isAuthenticated(token): Observable<boolean> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `bearer ${token}`
      })
    };

    return this.httpClient.get<boolean>(
      `${environment.api_url}/login`,
      httpOptions
    );
  }

  renuevaToken(token): Observable<boolean> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `bearer ${token}`
      })
    };
    return this.httpClient.get<boolean>(
      `${environment.api_url}/auth/renuevatoken`,
      httpOptions
    ).pipe(map((resp: any) => {
      // console.log('Renueva token: ', resp);
      this.jwtservice.setToken(resp.token);
      return true;
    })).pipe(catchError(err => {
      console.log('Error al renovar token');
      return Observable.throw(err);
    }));
  }

}
