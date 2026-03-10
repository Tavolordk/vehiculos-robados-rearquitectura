import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { finalize, tap } from 'rxjs/operators';

import { AuthRepository } from '../../../domain/auth/repositories/auth.repository';
import { AuthState } from '../state/auth.state';
import { SessionService } from '../../../core/security/session.service';

@Injectable({ providedIn: 'root' })
export class LoginUseCase {
    private readonly authRepository = inject(AuthRepository);
    private readonly authState = inject(AuthState);
    private readonly sessionService = inject(SessionService);
    private readonly router = inject(Router);

    execute(username: string, password: string) {
        this.authState.setLoading(true);
        this.authState.setError(null);

        return this.authRepository.login(username, password).pipe(
            tap((session) => {
                this.authState.setSession(session);

                if (session?.success === 1) {
                    this.sessionService.saveSession(session, username, password);

                    const tipo = (session.tipoUsuario ?? '').toUpperCase();
                    const ocultarConsulta = tipo === 'USUARIO';
                    const esTemporal = password === 'SSPC-PMex-2025';

                    const nextUrl = esTemporal
                        ? '/bienvenida/gestion-contrasena'
                        : ocultarConsulta
                            ? '/bienvenida/mis-registros'
                            : '/bienvenida';

                    void this.router.navigate([nextUrl]);
                    return;
                }

                this.authState.setError(session?.message ?? 'Usuario o contraseña incorrectos.');
            }),
            finalize(() => {
                this.authState.setLoading(false);
            })
        );
    }
}