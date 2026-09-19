import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import type { Role } from '../../model/role.model';
import { SessionService } from '../session.service';

export const roleGuard = (role: Role): CanActivateFn => {
  return () => {
    const session = inject(SessionService);
    const router = inject(Router);
    if (session.role() === role) {
      return true;
    }
    return router.createUrlTree(['/login']);
  };
};
