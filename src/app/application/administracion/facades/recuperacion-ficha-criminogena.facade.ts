import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { RecuperacionFichaCriminogenaState } from '../state/recuperacion-ficha-criminogena.state';
import { FichaCriminogenaRadioEntity } from '../../../domain/administracion/entities/recuperacion-ficha-criminogena.entity';

@Injectable({ providedIn: 'root' })
export class RecuperacionFichaCriminogenaFacade {
    private readonly state = inject(RecuperacionFichaCriminogenaState);
    private readonly router = inject(Router);

    readonly form = this.state.form;

    updateField(field: string, value: string | null): void {
        this.state.updateForm({ [field]: value } as never);
    }

    updateIntegranteField(field: string, value: string): void {
        this.state.updateIntegranteForm({ [field]: value } as never);
    }

    setFichaRadio(value: FichaCriminogenaRadioEntity): void {
        this.state.updateForm({ fichaRadio: value });
    }

    onDeleteIntegrante(index: number): void {
        const integrantes = this.state.form().integrantes.filter((_, i) => i !== index);
        this.state.setIntegrantes(integrantes);
    }

    onAgregarIntegrante(): void {
        const { integrantes, formIntegrante } = this.state.form();
        const nombre = formIntegrante.nombre?.trim();
        const primerApellido = formIntegrante.primerApellido?.trim();
        const alias = formIntegrante.alias?.trim();

        if (!nombre || !primerApellido || !alias) {
            alert('Completa al menos: Nombre(s), Primer apellido y Alias.');
            return;
        }

        const nextNo = integrantes.length
            ? Math.max(...integrantes.map((i) => i.noIntegrante)) + 1
            : 1;

        this.state.setIntegrantes([
            ...integrantes,
            {
                noIntegrante: nextNo,
                alias,
                nombre,
                primerApellido,
            },
        ]);

        this.state.resetIntegranteBasico();
    }

    onSiguiente(): void {
        this.router.navigateByUrl('/admin/recuperacion/verificacion');
    }
}