import { Injectable } from '@angular/core';
declare var require: any;

import { ipcRenderer, webFrame, remote, BrowserWindow } from 'electron';
import * as childProcess from 'child_process';
import * as fs from 'fs';



@Injectable()
export class ElectronService {

  ipcRenderer: typeof ipcRenderer;
  webFrame: typeof webFrame;
  remote: typeof remote;
  childProcess: typeof childProcess;
  window: BrowserWindow;
  fs: typeof fs;

  constructor() {

    if (this.isElectron()) {
      this.ipcRenderer = window.require('electron').ipcRenderer;
      this.webFrame = window.require('electron').webFrame;
      this.remote = window.require('electron').remote;
      this.window = window.require('electron').remote.getCurrentWindow();

      this.childProcess = window.require('child_process');
      this.fs = window.require('fs');
    }

  }

  isElectron = () => {
    return window && window.process && window.process.type;
  }
}
