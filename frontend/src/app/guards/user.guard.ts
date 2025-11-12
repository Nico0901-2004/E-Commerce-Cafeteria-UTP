import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const UserGuard: CanActivateFn = () => {
  const router = inject(Router);
  const rol = localStorage.getItem('rol');
  if (rol === 'usuario') return true;
  router.navigate(['/login']);
  return false;
};
