import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { EntregaVerificacionState } from '../state/entrega-verificacion.state';
import { EntregaVerificacionEditSection } from '../../../domain/administracion/entities/entrega-verificacion.entity';

@Injectable({ providedIn: 'root' })
export class EntregaVerificacionFacade {
    private readonly state = inject(EntregaVerificacionState);
    private readonly router = inject(Router);

    readonly data = this.state.data;

    onCerrarSesion(): void {
        console.log('Cerrar sesión');
    }

    onEditar(seccion: EntregaVerificacionEditSection): void {
        console.log('Editar sección:', seccion);

        const routeMap: Record<EntregaVerificacionEditSection, string> = {
            entregaVehiculo: '/admin/entrega/vehiculo',
            infoEntrega: '/admin/entrega/vehiculo',
            inspeccion: '/admin/entrega/inspeccion-ministerial',
            alteraciones: '/admin/entrega/inspeccion-ministerial',
            observaciones: '/admin/entrega/inspeccion-ministerial',
            docPropietario: '/admin/entrega/documentacion-propietario',
        };

        this.router.navigateByUrl(routeMap[seccion]);
    }

    onGuardar(): void {
        this.router.navigateByUrl('/admin/entrega/exito-denuncia');
    }
}