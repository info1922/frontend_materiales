import { Component, OnInit, Inject, PLATFORM_ID, Input} from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { JwtService } from '../../../core/services/jwt.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  linkRef: HTMLLinkElement;
  test: boolean;

  ajuste;

  themes = [
    {name : 'Dark', href: 'assets/css/clarity-ui-dark.min.css', value: false },
    {name : 'Light', href: 'assets/css/clarity-ui.min.css', value: true }
  ];

  constructor(@Inject(DOCUMENT) private document: Document, @Inject(PLATFORM_ID)
    private platformId: Object,
    private jwtService: JwtService,
    private router: Router) {
    this.cargarAjuste();
   }

  ngOnInit() {
  }


  cargarAjuste() {

    if (!localStorage.getItem('ajustes')) {
      this.test = false;
      this.linkRef = this.document.createElement('link');
      this.linkRef.rel = 'stylesheet';
      this.linkRef.href = this.themes[1].href;
      console.log(this.linkRef.href);
      this.document.querySelector('head').appendChild(this.linkRef);
      localStorage.setItem('ajustes', JSON.stringify(this.themes[1]));
    } else {
      this.ajuste = JSON.parse(localStorage.getItem('ajustes'));
      this.test = this.ajuste.value;
      this.checkClicked(this.ajuste.value);
      console.log('Valor de value en localStorage: ', this.ajuste.value);
    }
  }


  checkClicked(val) {
    if ( val ) {
      console.log('Light: ', val);
      this.test = false;
      this.linkRef = this.document.createElement('link');
      this.linkRef.rel = 'stylesheet';
      this.linkRef.href = this.themes[1].href;
      console.log(this.linkRef.href);
      this.document.querySelector('head').appendChild(this.linkRef);
      localStorage.setItem('ajustes', JSON.stringify(this.themes[1]));
    } else {
      console.log('Dark: ', val);
      this.test = true;
      this.linkRef = this.document.createElement('link');
      this.linkRef.rel = 'stylesheet';
      this.linkRef.href = this.themes[0].href;
      this.document.querySelector('head').appendChild(this.linkRef);
      localStorage.setItem('ajustes', JSON.stringify(this.themes[0]));
    }

  }

  logout() {
    this.jwtService.destroyToken();
    this.router.navigate(['/login']);
  }


}

interface Ajustes {
  name: string;
  href: string;
  value: boolean;
}
