import { Injectable } from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {AppConfig} from './appconfig';
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
    const configPath = this.getConfigPath();

    this.fs.readFile(configPath, 'utf-8', (err, data) => {
      if (err) {
        if (err.code === 'ENOENT') {
          console.log('Could not find config file. Will try to create new one.');
          this.ensureDirectoryExistence(configPath);
          const newAppConfig = new AppConfig();
          newAppConfig.lastLoaded = '';
          this.fs.writeFile(configPath, JSON.stringify(newAppConfig), 'utf-8', (err) => {
            if (err) {
              alert('An error occured while creating the app-config: ' + err.message);
            }
            this.appConfig.next(newAppConfig);
          });
        }
      } else {
        const existingAppConfig = Object.assign(new AppConfig(), JSON.parse(data));
        this.appConfig.next(existingAppConfig);
      }
    });
  }

  private getConfigPath() {
    return this.path.join(electron.remote.app.getPath('home'), '.timetracking', 'config.tt');
  }

  ensureDirectoryExistence(filePath) {
    const dirname = this.path.dirname(filePath);
    if (this.fs.existsSync(dirname)) {
      return true;
    }
    this.ensureDirectoryExistence(dirname);
    this.fs.mkdirSync(dirname);
  }
}
