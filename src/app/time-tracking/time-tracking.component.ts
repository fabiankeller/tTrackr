import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {StorageService} from '../storage.service';
import {TrackrStore} from "./domain/trackr-store";
declare const electron: any;

@Component({
    selector: 'app-time-tracking',
    templateUrl: './time-tracking.component.html',
    styleUrls: ['./time-tracking.component.scss']
})
export class TimeTrackingComponent {
    dayForm: FormGroup;
    fs: any = electron.remote.require('fs');

    constructor(private fb: FormBuilder, private storageService: StorageService) {
        this.createForm();
    }

    createForm() {
        this.dayForm = this.fb.group({
            time: ['', [
                Validators.required,
                Validators.pattern('^(0\.[1-9]|[1-9][0-9]{0,2}(\.[1-9])?)$')]],
            message: '',
            selectedDate: ''
        });
    }

    onDateSelect() {
        console.log(this.dayForm.value.selectedDate);
        this.storageService.trackrStore.subscribe((trackrStore: TrackrStore) => {
            let dayByDate = trackrStore.getDayByDate(this.dayForm.value.selectedDate);
            this.dayForm.patchValue({'time': dayByDate.hours});
            this.dayForm.patchValue({'message': dayByDate.message});
        });
    }

    loadFile() {
        electron.remote.dialog.showOpenDialog({
            filters: [{name: 'TimeTracking file', extensions: ['tt']}]
        }, (fileNames) => {
            if (fileNames === undefined) {
                console.log('No file selected');
                return;
            }

            this.fs.readFile(fileNames[0], 'utf-8', (err, data) => {
                if (err) {
                    alert('An error ocurred reading the file :' + err.message);
                    return;
                }

                console.log('The file content is : ' + data);
            });
        });
    }

    saveDay() {
        console.log(this.dayForm.value);
    }
}
