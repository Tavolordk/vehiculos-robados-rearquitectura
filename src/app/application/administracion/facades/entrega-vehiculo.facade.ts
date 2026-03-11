import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { EntregaVehiculoState } from '../state/entrega-vehiculo.state';

@Injectable({ providedIn: 'root' })
export class EntregaVehiculoFacade {
    private readonly state = inject(EntregaVehiculoState);
    private readonly router = inject(Router);

    readonly data = this.state.data;

    updateEntregaField(field: string, value: string): void {
        this.state.updateEntregaField(field, value);
    }

    onSiguiente(): void {
        console.log('Siguiente - entrega vehiculo', this.state.data().entrega);
        this.router.navigateByUrl('/admin/entrega/inspeccion-ministerial');
    }
}