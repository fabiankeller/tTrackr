import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimeTrackingComponent } from './time-tracking.component';
import {TimeTrackingRoutingModule} from "./time-tracking-routing.module";
import { TableComponent } from './table/table.component';
import {MaterialModule} from "../material/material.module";

@NgModule({
  imports: [
    CommonModule,
    TimeTrackingRoutingModule,
    MaterialModule
  ],
  declarations: [TimeTrackingComponent, TableComponent]
})
export class TimeTrackingModule { }
