import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { HomeComponent } from './home/home.component';
import { AmministrationComponent } from './amministration/amministration.component';
import { OperativeComponent } from './operative/operative.component';
import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';

import { AirflowComponent } from '../airflow/airflow.component';
import { MinIOComponent } from '../min-io/min-io.component';
import { KubernetesComponent } from '../kubernetes/kubernetes.component';
import { FloodMissionsComponent } from '../flood-missions/flood-missions.component';
import { FireMissionsComponent } from '../fire-missions/fire-missions.component';

const routes: Routes = [
  {
    path: "",
    component: PagesComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'amministration',
        component: AmministrationComponent,
        children: [
          { path: 'airflow', component: AirflowComponent },
          { path: 'minio', component: MinIOComponent },
          { path: 'kubernetes', component: KubernetesComponent },
          { path: '', redirectTo: 'airflow', pathMatch: 'full' },
        ]
      },
      {
        path: 'operative',
        component: OperativeComponent,
        children: [
          { path: 'flood', component: FloodMissionsComponent },
          { path: 'fire', component: FireMissionsComponent },
          { path: '', redirectTo: 'flood', pathMatch: 'full' },
        ]
      },
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: '**', component: NotFoundComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
