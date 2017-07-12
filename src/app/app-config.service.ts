import { Injectable } from '@angular/core';
import {Subject} from "rxjs/Subject";
import {AppConfig} from "./appconfig";
declare const electron: any;

@Injectable()
export class AppConfigService {
  appConfig: Subject<AppConfig> = new Subject();
  fs: any = electron.remote.require('fs');
  path: any = electron.remote.require('path');

  constructor() {
    this.loadConfig();
  }

  loadConfig() {
    let configPath = this.getConfigPath();

    this.fs.readFile(configPath, 'utf-8', (err, data) => {
      if(err){
        if (err.code === 'ENOENT') {
          console.log("Could not find config file. Will try to create new one.");
          this.ensureDirectoryExistence(configPath);
          this.fs.writeFile(configPath, JSON.stringify({lastLoaded: ''}), 'utf-8', (err) => {
            if (err) {
              alert("An error occured while creating the app-config: " + err.message);
            }
          });
        }
      }
      this.appConfig.next(data);
      // Change how to handle the file content
      console.log("The file content is : " + data);
    });
  }

  private getConfigPath() {
    return this.path.join(electron.remote.app.getPath('home'), '.timetracking', 'config.tt')
  }

  ensureDirectoryExistence(filePath) {
    let dirname = this.path.dirname(filePath);
    if (this.fs.existsSync(dirname)) {
      return true;
    }
    this.ensureDirectoryExistence(dirname);
    this.fs.mkdirSync(dirname);
  }
}
