import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import {
  NbAuthComponent,
  NbLoginComponent,
  NbLogoutComponent,
  NbRegisterComponent,
  NbRequestPasswordComponent,
  NbResetPasswordComponent,
} from '@nebular/auth';
import { AuthLoginComponent } from './pages/auth/login/auth-login.component';
import { AuthCallbackComponent } from './pages/auth/callback/auth-callback.component';
import { AuthLogoutComponent } from './pages/auth/logout/auth-logout.component';

export const routes: Routes = [
  {
    path: 'pages',
    loadChildren: () => import('./pages/pages.module')
      .then(m => m.PagesModule),
  },
  {
    path: 'keycloak-auth',
    component: NbAuthComponent,
    children: [
      {
        path: '',
        component: AuthLoginComponent,
      },
      {
        path: 'callback',
        component: AuthCallbackComponent,
      },
      {
        path: 'logout',
        component: AuthLogoutComponent,
      }
    ]
  },
  { path: '', redirectTo: 'pages', pathMatch: 'full' },
  { path: '**', redirectTo: 'pages' },
];

const config: ExtraOptions = {
  useHash: false,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
