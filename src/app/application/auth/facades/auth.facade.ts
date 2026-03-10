import { Injectable, inject } from '@angular/core';
import { LoginUseCase } from '../use-cases/login.use-case';
import { LogoutUseCase } from '../use-cases/logout.use-case';
import { AuthState } from '../state/auth.state';

@Injectable({ providedIn: 'root' })
export class AuthFacade {
    private readonly loginUseCase = inject(LoginUseCase);
    private readonly logoutUseCase = inject(LogoutUseCase);
    private readonly authState = inject(AuthState);

    readonly session = this.authState.session;
    readonly isAuthenticated = this.authState.isAuthenticated;
    readonly isLoading = this.authState.isLoading;
    readonly error = this.authState.error;

    login(username: string, password: string) {
        return this.loginUseCase.execute(username, password);
    }

    logout(): void {
        this.logoutUseCase.execute();
    }

    clearError(): void {
        this.authState.setError(null);
    }
}