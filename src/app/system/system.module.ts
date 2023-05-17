import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SystemRoutingModule } from './system-routing.module';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RolesComponent } from './roles/roles.component';
import { MenusComponent } from './menus/menus.component';
import { ConfigurationsComponent } from './configurations/configurations.component';
import { RolemenumappingComponent } from './rolemenumapping/rolemenumapping.component';
import { UsersComponent } from './users/users.component';


@NgModule({
  declarations: [
    UsersComponent,
    RolesComponent,
    MenusComponent,
    ConfigurationsComponent,
    RolemenumappingComponent,
  ],
  imports: [
    CommonModule,
    SystemRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class SystemModule { }
