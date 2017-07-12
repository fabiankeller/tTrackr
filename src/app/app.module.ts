import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import {MaterialModule} from "./material/material.module";

import 'hammerjs';
import {AppRoutingModule} from "./app-routing.module";
import {AppConfigService} from "./app-config.service";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    MaterialModule,
    AppRoutingModule
  ],
  providers: [AppConfigService],
  bootstrap: [AppComponent]
})
export class AppModule { }
