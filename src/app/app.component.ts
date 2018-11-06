import { Component } from '@angular/core';
import { ElectronService } from './services/electron.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';

  constructor (public electronService: ElectronService) {
    if (electronService.isElectron()) {
      console.log('Mode electron');
      // console.log('Electron ipcRenderer', electronService.ipcRenderer);
      // console.log('NodeJS childProcess', electronService.childProcess);
    } else {
      console.log('Mode web');
    }
  }

  minimizeWindow() {
    console.log('minimize Window');
    this.electronService.window.minimize();
  }

  closeWindow() {
    console.log('Close window');
    this.electronService.window.close();
  }
}
