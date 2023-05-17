import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MastersRoutingModule } from './masters-routing.module';
import { LandingComponent } from './landing.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmployeesComponent } from './employees/employees.component';
import { ClientsComponent } from './clients/clients.component';
import { GstComponent } from './gst/gst.component';
import { HolidaysComponent } from './holidays/holidays.component';
import { JobsComponent } from './jobs/jobs.component';
import { EmediasComponent } from './emedias/emedias.component';
import { PmediasComponent } from './pmedias/pmedias.component';
import { AdsComponent } from './ads/ads.component';
import { AdComponent } from './ad/ad.component';


@NgModule({
  declarations: [
    LandingComponent,
    EmployeesComponent,
    ClientsComponent,
    GstComponent,
    HolidaysComponent,
    JobsComponent,
    EmediasComponent,
    PmediasComponent,
    AdsComponent,
    AdComponent
  ],
  imports: [
    CommonModule,
    MastersRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ],
})
export class MastersModule { }
