import {Injectable} from '@angular/core';
import {AppConfig} from './appconfig';
import {AppConfigService} from './app-config.service';
import {TrackrStore} from "./time-tracking/domain/trackr-store";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {TypedJSON} from "typedjson-npm/src/typed-json";
declare const electron: any;

@Injectable()
export class StorageService {
    fs: any = electron.remote.require('fs');
    path: any = electron.remote.require('path');
    trackrStore: BehaviorSubject<TrackrStore> = new BehaviorSubject(new TrackrStore());

    constructor(private configService: AppConfigService) {
        this.configService.appConfig.subscribe((appConfig: AppConfig) => {

            this.loadEntriesFile(appConfig);
        });
    }

    loadEntriesFile(appConfig: AppConfig) {
        if (appConfig.lastLoaded !== '') {
            try {
                let result = this.fs.readFileSync(this.path.normalize(appConfig.lastLoaded));
                this.trackrStore.next(TypedJSON.parse(result, TrackrStore));
            } catch (err) {
                let options = {
                    message: "Could not find file at: " + appConfig.lastLoaded,
                    buttons: ["Browse", "Create new"] };

                electron.remote.dialog.showMessageBox(options, (index) => {
                    switch (index) {
                        case 0: //Create new
                            this.loadFile();
                            break;
                        case 1: //Browse
                            this.createNewTrackrStore();
                            break;
                    }
                    console.log(index);
                });
            }
        } else {
            // create locate storage
            console.log('entries file not yet existing');
        }
    }

    private createNewTrackrStore() {
        let trackrStore = new TrackrStore();
        trackrStore.entities = [];
        this.trackrStore.next(trackrStore);
    }

    loadFile() {
        electron.remote.dialog.showOpenDialog({
            filters: [{name: 'TimeTracking file', extensions: ['tt']}]
        }, (fileNames) => {
            if (fileNames === undefined) {
                console.log('No file selected');
                this.createNewTrackrStore();
                return;
            }

            this.fs.readFile(fileNames[0], 'utf-8', (err, data) => {
                if (err) {
                    alert('An error ocurred reading the file :' + err.message + ". Will start with fresh store.");
                    this.createNewTrackrStore();
                    return;
                }

                this.trackrStore.next(TypedJSON.parse(data, TrackrStore));
            });
        });
    }
}
