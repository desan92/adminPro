import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

import { DashboardComponent } from './dashboard/dashboard.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { ProgressComponent } from './progress/progress.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesesComponent } from './promeses/promeses.component';
import { RxjsComponent } from './rxjs/rxjs.component';

import { PerfilComponent } from './perfil/perfil.component';
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { HospitalesComponent } from './mantenimientos/hospitales/hospitales.component';
import { MedicosComponent } from './mantenimientos/medicos/medicos.component';
import { MedicoComponent } from './mantenimientos/medico/medico.component';
import { BusquedasComponent } from './busquedas/busquedas.component';
import { AdminGuard } from '../guards/admin.guard';



const childRoutes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    data: { title: 'Dashboard' }
  },
  {
    path: 'progress',
    component: ProgressComponent,
    data: { title: 'Progress' } //argument que se li pasa per veure aquina pagian estan es pot psar mes arguemnts, es com una variable.
  },
  {
    path: 'grafica1',
    component: Grafica1Component,
    data: { title: 'Grafica' }
  },
  {
    path: 'account-settings',
    component: AccountSettingsComponent,
    data: { title: 'Account Settings' }
  },
  {
    path: 'perfil',
    component: PerfilComponent,
    data: { title: 'Perfil' }
  },
  {
    path: 'promeses',
    component: PromesesComponent,
    data: { title: 'Promeses' }
  },
  {
    path: 'rxjs',
    component: RxjsComponent,
    data: { title: 'Rxjs' }
  },
  {
    path: 'busquedas/:termino',
    component: BusquedasComponent,
    data: { title: 'Busquedas' }
  },
  //mantenimientos
  {
    path: 'usuarios',
    canActivate: [AdminGuard],
    component: UsuariosComponent,
    data: { title: 'Usuarios' }
  },
  {
    path: 'hospitales',
    component: HospitalesComponent,
    data: { title: 'Hospitales' }
  },
  {
    path: 'medicos',
    component: MedicosComponent,
    data: { title: 'Medicos' }
  },
  {
    path: 'medico/:id',
    component: MedicoComponent,
    data: { title: 'Medicos' }
  },
  /*{
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },*/
]

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(childRoutes)],
  exports: [RouterModule]
})
export class ChildRoutesModule { }
