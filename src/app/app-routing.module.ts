import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './shared/auth.guard';

const routes: Routes = [
  {path:"", component:LoginComponent},
  {path:"masters", canActivate:[AuthGuard], loadChildren:()=>import('./masters/masters.module').then(m=>m.MastersModule)},
  {path:"system",canActivate:[AuthGuard], loadChildren:()=>import('./system/system.module').then(m=>m.SystemModule)},
  {path:"emedia", canActivate:[AuthGuard], loadChildren:()=>import('./emedia/emedia.module').then(m=>m.EmediaModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
