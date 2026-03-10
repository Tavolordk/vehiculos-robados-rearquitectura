import { Injectable, signal, computed } from '@angular/core';
import { UserSessionEntity } from '../../../domain/auth/entities/user-session.entity';

@Injectable({ providedIn: 'root' })
export class AuthState {
    private readonly _session = signal<UserSessionEntity | null>(null);
    private readonly _isLoading = signal(false);
    private readonly _error = signal<string | null>(null);

    readonly session = this._session.asReadonly();
    readonly isLoading = this._isLoading.asReadonly();
    readonly error = this._error.asReadonly();
    readonly isAuthenticated = computed(() => (this._session()?.success ?? 0) === 1);

    setSession(session: UserSessionEntity | null): void {
        this._session.set(session);
    }

    setLoading(value: boolean): void {
        this._isLoading.set(value);
    }

    setError(value: string | null): void {
        this._error.set(value);
    }
}