import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { PredenunciaVerificacionState } from '../state/predenuncia-verificacion.state';

@Injectable({ providedIn: 'root' })
export class PredenunciaVerificacionFacade {
    private readonly state = inject(PredenunciaVerificacionState);
    private readonly router = inject(Router);

    readonly data = this.state.data;

    goToRobo(): void {
        this.router.navigateByUrl('/predenuncia/robo');
    }

    goToDenunciante(): void {
        this.router.navigateByUrl('/predenuncia/denunciante');
    }

    goToVehiculo(): void {
        this.router.navigateByUrl('/predenuncia/vehiculo');
    }

    onGuardar(): void {
        this.router.navigateByUrl('/dashboard/guardado-exitoso');
    }
}