import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from '../../../core/security/session.service';
import { AuthState } from '../state/auth.state';

@Injectable({ providedIn: 'root' })
export class LogoutUseCase {
    private readonly sessionService = inject(SessionService);
    private readonly authState = inject(AuthState);
    private readonly router = inject(Router);

    execute(): void {
        this.sessionService.clearSession();
        this.authState.setSession(null);
        this.authState.setError(null);
        void this.router.navigate(['/auth/login']);
    }
}