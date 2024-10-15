import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/_guards/auth.guard';
import { LoginComponent } from './layouts/login/login.component';
import { LogRecoveryComponent } from './layouts/recovery/log-recovery.component';
import { HttpClientModule } from '@angular/common/http';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: '',
    loadChildren: () =>
      import('./routing/base-routing.module').then((m) => m.BaseRoutingModule),
    // canActivate: [AuthGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'recovery',
    component: LogRecoveryComponent,
  },
  // {
  //   path: '403',
  //   component: E403Component,
  // },
  // {
  //   path: '**',
  //   component: E404Component,
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), HttpClientModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
