import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmediaRoutingModule } from './emedia-routing.module';
import { LandingComponent } from './landing.component';
import { ReleaseordersComponent } from './releaseorders/releaseorders.component';
import { ReleaseorderComponent } from './releaseorder/releaseorder.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    LandingComponent,
    ReleaseordersComponent,
    ReleaseorderComponent
  ],
  imports: [
    CommonModule,
    EmediaRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class EmediaModule { }
