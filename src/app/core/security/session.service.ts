import { Injectable, inject } from '@angular/core';
import { SecureStorageService } from './secure-storage.service';
import { UserSessionEntity } from '../../domain/auth/entities/user-session.entity';

@Injectable({ providedIn: 'root' })
export class SessionService {
    private readonly storage = inject(SecureStorageService);

    saveSession(session: UserSessionEntity, cuenta: string, passwordActual: string): void {
        this.storage.setItem('login_success', String(session.success ?? 0));
        this.storage.setItem('user_id', String(session.userId ?? ''));
        this.storage.setItem('tipo_usuario', String(session.tipoUsuario ?? ''));
        this.storage.setItem('correo', String(session.correo ?? ''));
        this.storage.setItem('nombre', String(session.nombre ?? ''));
        this.storage.setItem('primer_apellido', String(session.primerApellido ?? ''));
        this.storage.setItem('segundo_apellido', String(session.segundoApellido ?? ''));
        this.storage.setItem('entidad_nacimiento', String(session.entidadNacimiento ?? ''));
        this.storage.setItem('code', String(session.code ?? ''));
        this.storage.setItem('message', String(session.message ?? ''));

        this.storage.setItem('cuenta', cuenta);
        this.storage.setItem('cuenta_codigo', cuenta);

        this.storage.setItem(
            'nombre_completo',
            `${session.nombre ?? ''} ${session.primerApellido ?? ''} ${session.segundoApellido ?? ''}`
                .replace(/\s+/g, ' ')
                .trim()
        );

        const tipo = (session.tipoUsuario ?? '').toUpperCase();
        const ocultarConsulta = tipo === 'USUARIO';
        this.storage.setItem('can_consulta_cedulas', ocultarConsulta ? '1' : '0');

        const esTemporal = passwordActual === 'SSPC-PMex-2025';
        if (esTemporal) {
            this.storage.setItem('mustChangePwd', '1');
        } else {
            this.storage.removeItem('mustChangePwd');
        }
    }

    clearSession(): void {
        this.storage.clear();
    }

    isAuthenticated(): boolean {
        return this.storage.getItem('login_success') === '1';
    }

    getTipoUsuario(): string {
        return this.storage.getItem('tipo_usuario') ?? '';
    }

    getNombreCompleto(): string {
        return this.storage.getItem('nombre_completo') ?? '';
    }

    getCorreo(): string {
        return this.storage.getItem('correo') ?? '';
    }

    getCuenta(): string {
        return this.storage.getItem('cuenta') ?? '';
    }
}