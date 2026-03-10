import { Injectable, computed, inject } from '@angular/core';
import { SessionService } from '../../../core/security/session.service';

@Injectable({ providedIn: 'root' })
export class SessionFacade {
    private readonly sessionService = inject(SessionService);

    readonly isAuthenticated = computed(() => this.sessionService.isAuthenticated());

    get nombreCompleto(): string {
        return this.sessionService.getNombreCompleto();
    }

    get tipoUsuario(): string {
        return this.sessionService.getTipoUsuario();
    }

    get correo(): string {
        return this.sessionService.getCorreo();
    }

    get cuenta(): string {
        return this.sessionService.getCuenta();
    }
}