import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//TODO: refactor routes and check how AuthGuard could be used
const routes: Routes = [
  {
    path: '',
    redirectTo: 'time-tracking',
    pathMatch: 'full'
  },
  {
    path: 'time-tracking',
    loadChildren: './time-tracking/time-tracking.module#TimeTrackingModule'
  },
  // otherwise redirect to
  {
    path: '**',
    redirectTo: 'time-tracking'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
