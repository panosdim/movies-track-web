import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { Authentication } from './authentication';

export const authGuard = () => {
  const router = inject(Router);
  const authService = inject(Authentication);
  const token = localStorage.getItem('token');

  if (token) {
    try {
      const decoded: any = jwtDecode(token);
      if (decoded.hasOwnProperty('exp') && decoded.exp * 1000 > Date.now()) {
        return true; // The token is valid
      }
      authService.logout();
      router.navigateByUrl('/login');
      return false; // Token has expired
    } catch {
      authService.logout();
      router.navigateByUrl('/login');
      return false; // Token decoding failed
    }
  }

  authService.logout();
  router.navigateByUrl('/login');
  return false; // No token, not authenticated
};
