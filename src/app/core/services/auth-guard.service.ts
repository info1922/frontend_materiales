import { Injectable } from '@angular/core';
import { CanActivate, Router, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { JwtService } from './jwt.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate, CanActivateChild {

  constructor(private jwtService: JwtService,
      private router: Router,
      private authService: AuthService) { }

  canActivate(): boolean {
    // Si esta logueado retorna = true sino retorna = false
    if (this.jwtService.getToken()) {
      // tslint:disable-next-line:no-debugger
      // debugger;
      return true;
    } else {
      this.router.navigate(['/login']);
      // tslint:disable-next-line:no-debugger
      // debugger;
      return false;
    }
  }

  canActivateChild(): boolean {
    return this.canActivate();
  }

}
