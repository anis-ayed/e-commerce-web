import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 'login',
    loadComponent: () => import('./login/login.component').then(c => c.LoginComponent)
  },
  {
    path: 'register',
    loadComponent: () => import('./signup/signup.component').then(c => c.SignupComponent)
  }
];
