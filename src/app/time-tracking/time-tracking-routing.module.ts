import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TimeTrackingComponent} from "./time-tracking.component";

//TODO: refactor routes and check how AuthGuard could be used
const routes: Routes = [
  {
    path: '',
    component: TimeTrackingComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TimeTrackingRoutingModule {
}
