import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PagesComponent } from './pages/pages.component';
import { AuthGuard } from '../guards/auth.guard';

const routes: Routes = [
  {
    path: 'dashboard',
    component: PagesComponent,
    canActivate: [AuthGuard],
    //el canLoad s'utilitza per veure si el laziload (loadChildren) pot carregar
    canLoad: [AuthGuard],
    //carga perezosa
    loadChildren: () => import('./child-routes.module').then(m => m.ChildRoutesModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
