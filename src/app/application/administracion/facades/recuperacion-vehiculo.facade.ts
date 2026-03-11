import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { RecuperacionVehiculoState } from '../state/recuperacion-vehiculo.state';

@Injectable({ providedIn: 'root' })
export class RecuperacionVehiculoFacade {
    private readonly state = inject(RecuperacionVehiculoState);
    private readonly router = inject(Router);

    readonly form = this.state.form;

    onNext(): void {
        this.router.navigateByUrl('/admin/recuperacion/ficha-criminogena');
    }
}