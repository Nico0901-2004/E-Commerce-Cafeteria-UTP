import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const AdminGuard: CanActivateFn = () => {
  const router = inject(Router);
  const rol = localStorage.getItem('rol');
  if (rol === 'admin') return true;
  router.navigate(['/login']);
  return false;
};
