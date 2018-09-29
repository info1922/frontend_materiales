import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import { AuthService } from '../core/services/auth.service';
import { JwtService } from '../core/services/jwt.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {


  authForm: FormGroup;
  constructor(private fb: FormBuilder,
      private authService: AuthService,
      private jwtService: JwtService,
      private router: Router) { }

  closeMessage = '';
  closed = true;

  ngOnInit() {
    this.initForm();
  }

  private initForm() {
    this.authForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    console.log(this.authForm.value);
    this.authService.login(this.authForm.value)
      .subscribe(data => {
        console.log(data);
        this.jwtService.setToken(data.token);
        this.router.navigate(['panel']);
      }, err => {
        this.closed = false;
        console.log(err);
      });
  }

  onClose(): void {
    this.closeMessage = 'The alert has been closed';
  }

}
