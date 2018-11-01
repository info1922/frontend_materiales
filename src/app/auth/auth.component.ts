import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import { AuthService } from '../core/services/auth.service';
import { JwtService } from '../core/services/jwt.service';
import { Usuario } from '../core/models/user';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {


  authForm: FormGroup;
  authFormSignup: FormGroup;
  title = '';
  estilos = {};
  constructor(private fb: FormBuilder,
      private authService: AuthService,
      private jwtService: JwtService,
      private router: Router) { }

  closeMessage = '';
  closed = true;

  ngOnInit() {
    this.initForm();
    this.initFormSingup();

    if (this.router.url === '/login') {
      this.title = 'Login';
      this.estilos = {
        'display': 'flex',
        'background': 'url(./assets/fondo/Rainbow-Vortex.svg)',
        'background-size': 'cover',
        'background-position': '21rem 0',
        'background-repeat': 'no-repeat',
      };
    } else {
      this.title = 'Signup';
      this.estilos = {
        'display': 'flex',
        'background': 'url(./assets/fondo/Dragon-Scales.svg)',
        'background-size': 'cover',
        'background-position': '21rem 0',
        'background-repeat': 'no-repeat',
      };
    }
  }

  // Validando campos del formulario
  sonIguales(campo1: string, campo2: string) {
    // tslint:disable-next-line:no-shadowed-variable
    return( group: FormGroup) => {

      const pass1 = group.controls[campo1].value;
      const pass2 = group.controls[campo2].value;

      if (pass1 === pass2) {
        return null;
      }
        return {
          sonIguales: true
        };
    };
  }

  private initForm() {
    this.authForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  private initFormSingup() {
      this.authFormSignup = new FormGroup({
          nombre: new FormControl(null, Validators.required),
          apellido: new FormControl(null, Validators.required),
          email: new FormControl(null, [Validators.required, Validators.email]),
          password: new FormControl(null, Validators.required),
          password2: new FormControl(null, Validators.required)
      }, {validators: this.sonIguales('password', 'password2')});

  }

  onSubmit() {
    // console.log('Onsubmit');

    // tslint:disable-next-line:no-debugger

    // if (this.authFormSignup.invalid) {
    //       return;
    // }

    const usuario = new Usuario(
        this.authFormSignup.value.nombre,
        this.authFormSignup.value.apellido,
        this.authFormSignup.value.email,
        this.authFormSignup.value.password
      );

    if (this.title === 'Signup') {
        this.authService.singup(usuario)
            .subscribe(data => {
              // tslint:disable-next-line:no-debugger
                // console.log(data);
                this.router.navigate(['login']);
            }, err => {
                this.closed = false;
                console.log('Algo no esta funcionando bien');
                console.log(err);
            });
    } else {
      // console.log(this.authForm.value);
      // tslint:disable-next-line:no-debugger

        this.authService.login(this.authForm.value)
            .subscribe(data => {
            // console.log(data);
            this.jwtService.setToken(data.token);
            this.router.navigate(['panel']);
            }, err => {
            this.closed = false;
            console.log('Algo no esta funcionando bien');
            console.log(err);
        });
    }
  }

  onClose(): void {
    this.closeMessage = 'The alert has been closed';
  }

}
