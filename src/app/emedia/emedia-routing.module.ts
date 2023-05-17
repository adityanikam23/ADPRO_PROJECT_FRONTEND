import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './landing.component';
import { ReleaseordersComponent } from './releaseorders/releaseorders.component';
import { ReleaseorderComponent } from './releaseorder/releaseorder.component';

const routes: Routes = [
  {path:"", component:LandingComponent, children:[
    {path:"releaseorders", component:ReleaseordersComponent},
    {path:"releaseorder", component:ReleaseorderComponent},
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmediaRoutingModule { }
