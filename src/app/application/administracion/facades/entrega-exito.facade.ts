import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { EntregaExitoState } from '../state/entrega-exito.state';

@Injectable({ providedIn: 'root' })
export class EntregaExitoFacade {
    private readonly state = inject(EntregaExitoState);
    private readonly router = inject(Router);

    readonly data = this.state.data;

    onCerrar(): void {
        this.router.navigateByUrl('/admin/entrega/verificacion');
    }

    onImprimir(): void {
        window.print();
    }
}