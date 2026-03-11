import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { RecuperacionVerificacionState } from '../state/recuperacion-verificacion.state';

@Injectable({ providedIn: 'root' })
export class RecuperacionVerificacionFacade {
    private readonly state = inject(RecuperacionVerificacionState);
    private readonly router = inject(Router);

    readonly data = this.state.data;
    readonly showSuccessModal = this.state.showSuccessModal;

    onEdit(seccion: 'recuperacion' | 'ficha' | 'vehiculo'): void {
        console.log('Editar sección:', seccion);

        const routeMap: Record<typeof seccion, string> = {
            recuperacion: '/admin/recuperacion/info',
            ficha: '/admin/recuperacion/ficha-criminogena',
            vehiculo: '/admin/recuperacion/vehiculo',
        };

        this.router.navigateByUrl(routeMap[seccion]);
    }

    onDeleteIntegrante(index: number): void {
        const integrantes = this.state.data().integrantes.filter((_, i) => i !== index);
        this.state.setIntegrantes(integrantes);
    }

    onGuardar(): void {
        const data = this.state.data();

        console.log('Guardar verificación de datos', {
            folio: data.folio,
            recuperacion: data.recuperacion,
            ficha: data.ficha,
            integrantes: data.integrantes,
            vehiculo: data.vehiculo,
        });

        this.state.setShowSuccessModal(true);
    }

    onCloseModal(): void {
        this.state.setShowSuccessModal(false);
    }
}