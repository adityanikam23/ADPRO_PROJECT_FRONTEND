import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './landing.component';
import { EmployeesComponent } from './employees/employees.component';
import { ClientsComponent } from './clients/clients.component';
import { GstComponent } from './gst/gst.component';
import { HolidaysComponent } from './holidays/holidays.component';
import { JobsComponent } from './jobs/jobs.component';
import { EmediasComponent } from './emedias/emedias.component';
import { PmediasComponent } from './pmedias/pmedias.component';
import { AdsComponent } from './ads/ads.component';
import { AdComponent } from './ad/ad.component';

const routes: Routes = [
  {
    path: "", component: LandingComponent, children: [
      {path:"employees", component:EmployeesComponent},
      {path:"clients", component:ClientsComponent},
      {path:"gst", component:GstComponent},
      {path:"holidays", component:HolidaysComponent},
      {path:"jobs", component:JobsComponent},
      {path:"pmedia", component:PmediasComponent},
      {path:"emedia", component:EmediasComponent},
      {path:"ads", component:AdsComponent},
      {path:"ad", component:AdComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MastersRoutingModule { }