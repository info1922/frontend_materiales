import { Injectable } from '@angular/core';
import { CanActivate, Router, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { JwtService } from './jwt.service';
import { AuthService } from './auth.service';
import { of, Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate, CanActivateChild {

  constructor(private jwtService: JwtService,
      private router: Router,
      private authService: AuthService) { }



      canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> {
        if (this.jwtService.getToken()) {
          // console.log(this.jwtService.getToken());
          return of(true);
        }
        const token = route.queryParamMap.get('token');
        // console.log('Token: ', token);
        // tslint:disable-next-line:no-debugger
        // debugger;
        if (token) {
          return this.authService.isAuthenticated(token).pipe(
            map((authenticated) => {
              if (authenticated === true) {
                this.jwtService.setToken(token);
                return true;
              }
              this.router.navigate(['/login']);
              return false;
            }),
            catchError((err: any) => {
              this.router.navigate(['/login']);
              return of(false);
            })
          );
        } else {
          this.router.navigate(['/login']);
          return of(true);
        }

      }

      canActivateChild(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
      ): Observable<boolean> {
        return this.canActivate(route, state);
      }

  // canActivate(): boolean {
  //   // Si esta logueado retorna = true sino retorna = false
  //   if (this.jwtService.getToken()) {
  //     // tslint:disable-next-line:no-debugger
  //     // debugger;
  //     return true;
  //   } else {
  //     this.router.navigate(['/login']);
  //     // tslint:disable-next-line:no-debugger
  //     // debugger;
  //     return false;
  //   }
  // }

  // canActivateChild(): boolean {
  //   return this.canActivate();
  // }

}
