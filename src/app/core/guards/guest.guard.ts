import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SessionService } from '../security/session.service';
import { APP_ROUTES } from '../constants/app-routes.constants';

export const guestGuard: CanActivateFn = () => {
    const sessionService = inject(SessionService);
    const router = inject(Router);

    if (!sessionService.isAuthenticated()) {
        return true;
    }

    return router.createUrlTree([APP_ROUTES.consultaVehiculo]);
};