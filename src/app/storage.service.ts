import { Injectable } from '@angular/core';
import { AppConfig } from './appconfig';
import { AppConfigService } from './app-config.service';
declare const electron: any;

@Injectable()
export class StorageService {
  fs: any = electron.remote.require('fs');
  path: any = electron.remote.require('path');

  constructor(private configService: AppConfigService) {
    this.configService.appConfig.subscribe((appConfig: AppConfig) => {
      this.loadEntriesFile(appConfig);
    });
  }

  loadEntriesFile(appConfig: AppConfig) {
    if (appConfig.lastLoaded !== '') {
      this.fs.readFile(this.path.normalize(appConfig.lastLoaded), 'utf-8', (err, data) => {
        if (err) {
          // handle error of loading file
          console.log('an error occured while loading entries file', err);
        } else {
          console.log(data);
        }
      });
    } else {
      // create locate storage
      console.log('entries file not yet existing');
    }
  }
}
