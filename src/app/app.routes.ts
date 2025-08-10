import { Routes } from '@angular/router';
import { Login } from './login/login';
import { authGuard } from './services/auth-guard';
import { Add } from './add/add';
import { Home } from './home/home';
import { Watched } from './watched/watched';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'home', component: Home, canActivate: [authGuard] },
  {
    path: 'watched',
    component: Watched,
    canActivate: [authGuard],
  },
  {
    path: 'add',
    component: Add,
    canActivate: [authGuard],
  },
  { path: '**', redirectTo: 'home' },
];
