import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { NbAuthComponent, NbRegisterComponent } from '@nebular/auth';
import { AuthGuard } from './auth-guard.service';
import { NgxLoginComponent } from './@theme/components/auth/ngx-login.component';

const routes: Routes = [
  {
    path: 'auth',
    component: NbAuthComponent,
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
      },
      {
        path: 'login',
        component: NgxLoginComponent
      },
      {
        path: 'register',
        component: NbRegisterComponent
      }
    ]
  },
  // {
  //   path: 'pages',
  //   canActivate: [AuthGuard],
  //   loadChildren: 'app/pages/pages.module#PagesModule'
  // },
   { path: 'pages', loadChildren: 'app/pages/pages.module#PagesModule' },
  { path: '', redirectTo: '/auth/login', pathMatch: 'full' },
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
