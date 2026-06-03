import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const otpGuard: CanActivateFn = () => {
  const router = inject(Router);
  const tempToken = localStorage.getItem('tempToken');

  if (!tempToken) {
    router.navigate(['/auth/login']);
    return false;
  }

  return true;
};
