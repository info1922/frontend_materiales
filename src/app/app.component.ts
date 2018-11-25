import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ElectronService } from './services/electron.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'app';

  constructor (public electronService: ElectronService) {
    if (electronService.isElectron()) {
      console.log('Mode electron');
      // console.log('Electron ipcRenderer', electronService.ipcRenderer);
      // console.log('NodeJS childProcess', electronService.childProcess);
    } else {
      console.log('Mode web');
    }
    // this.bienvenida();
  }

  minimizeWindow() {
    console.log('minimize Window');
    this.electronService.window.minimize();
  }

  closeWindow() {
    console.log('Close window');
    this.electronService.window.close();
  }

 ngOnInit() {
  // console.log('Hola');
}

ngAfterViewInit() {
  console.log('Objetos');
  // this.bienvenida();
}
}
