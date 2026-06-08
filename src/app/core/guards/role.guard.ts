import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot) {
    const role = localStorage.getItem('role')!;

    const allowedRoles = route.data['roles'];

    if (allowedRoles.includes(role)) {
      return true;
    }

    this.router.navigate(['/dashboard']);

    return false;
  }
}
