import {Routes} from '@angular/router';

export const routes: Routes = [
  { path: 'authenticate',
    loadComponent: () => import('./login/login.component').then(c => c.LoginComponent)
  },
  {
    path: 'sign-up',
    loadComponent: () => import('./signup/signup.component').then(c => c.SignupComponent)
  }
];
