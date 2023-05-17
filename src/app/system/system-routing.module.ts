import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from '../masters/landing.component';
import { RolesComponent } from './roles/roles.component';
import { MenusComponent } from './menus/menus.component';
import { UsersComponent } from './users/users.component';
import { ConfigurationsComponent } from './configurations/configurations.component';
import { RolemenumappingComponent } from './rolemenumapping/rolemenumapping.component';

const routes: Routes = [
  {path:"", component:LandingComponent, children:[
    {path:"roles", component:RolesComponent},
    {path:"users", component:UsersComponent},
    {path:"menus", component:MenusComponent},
    {path:"configurations", component:ConfigurationsComponent},
    {path:"rolemenu", component:RolemenumappingComponent},
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SystemRoutingModule { }
