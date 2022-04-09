import { Routes } from '@angular/router';

import { BaseComponent } from './components/base/base.component';
import { LoginComponent } from './components/login/login.component';
import { HomeGuard } from './guard/home.guard';

export const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'home',
    component: BaseComponent,
    canActivate: [HomeGuard]
  }
];

