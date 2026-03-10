import { Injectable, inject } from '@angular/core';
import {
    HttpClient,
    HttpContext,
    HttpContextToken,
    HttpErrorResponse,
    HttpHeaders,
} from '@angular/common/http';
import { Observable, TimeoutError, throwError } from 'rxjs';
import { catchError, map, timeout } from 'rxjs/operators';

import { APP_ENVIRONMENT, AppEnvironment } from '../../../core/config/app-environment.token';
import { buildApiUrl } from '../../../core/utils/url.util';
import { AuthRepository } from '../../../domain/auth/repositories/auth.repository';
import { UserSessionEntity } from '../../../domain/auth/entities/user-session.entity';
import { LoginRequestDto } from '../dtos/login-request.dto';
import { LoginResponseDto } from '../dtos/login-response.dto';
import { ActualizarPasswordRequestDto } from '../dtos/actualizar-password-request.dto';
import { ActualizarPasswordResponseDto } from '../dtos/actualizar-password-response.dto';
import { AuthMapper } from '../mappers/auth.mapper';

export const SKIP_AUTH = new HttpContextToken<boolean>(() => false);

@Injectable({ providedIn: 'root' })
export class AuthHttpRepository extends AuthRepository {
    private readonly http = inject(HttpClient);
    private readonly environment = inject<AppEnvironment>(APP_ENVIRONMENT);

    private readonly loginEndpoint = buildApiUrl(this.environment.apiBaseUrl, 'password/login');
    private readonly cambiarPasswordEndpoint = buildApiUrl(
        this.environment.apiBaseUrl,
        'password/rotacion'
    );

    override login(username: string, password: string): Observable<UserSessionEntity> {
        const body: LoginRequestDto = {
            Cuenta: username.trim(),
            PasswordActual: password,
        };

        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        const context = new HttpContext().set(SKIP_AUTH, true);

        return this.http.post<LoginResponseDto>(this.loginEndpoint, body, { headers, context }).pipe(
            map(AuthMapper.toUserSession),
            catchError((err: HttpErrorResponse) => this.handleHttpError(err))
        );
    }

    override cambiarPassword(
        cuenta: string,
        passwordActual: string,
        passwordNuevo: string
    ): Observable<{ ok: boolean; mensaje: string }> {
        const body: ActualizarPasswordRequestDto = {
            Cuenta: cuenta.trim(),
            PasswordActual: passwordActual,
            PasswordNuevo: passwordNuevo,
        };

        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Cache-Control': 'no-store, no-cache, must-revalidate',
            Pragma: 'no-cache',
        });

        const context = new HttpContext().set(SKIP_AUTH, true);

        return this.http
            .post<ActualizarPasswordResponseDto>(this.cambiarPasswordEndpoint, body, {
                headers,
                context,
            })
            .pipe(
                timeout(this.environment.requestTimeoutMs),
                catchError((err: unknown) => this.handleUnknownError(err))
            );
    }

    private handleUnknownError(err: unknown) {
        if (err instanceof TimeoutError) {
            return throwError(() => ({
                status: 0,
                message: 'Tiempo de espera agotado (timeout)',
            }));
        }

        return this.handleHttpError(err as HttpErrorResponse);
    }

    private handleHttpError(err: HttpErrorResponse) {
        const status = err?.status ?? 0;
        const backendMsg =
            (err?.error &&
                (err.error.mensaje ||
                    err.error.message ||
                    err.error?.Message ||
                    err.error?.error)) ||
            err?.message ||
            'Error de red';

        return throwError(() => ({
            status,
            message: backendMsg,
        }));
    }
}