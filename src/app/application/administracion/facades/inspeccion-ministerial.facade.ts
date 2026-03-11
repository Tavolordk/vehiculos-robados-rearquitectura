import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { InspeccionMinisterialState } from '../state/inspeccion-ministerial.state';
import { SiNoEntity } from '../../../domain/administracion/entities/inspeccion-ministerial.entity';

@Injectable({ providedIn: 'root' })
export class InspeccionMinisterialFacade {
    private readonly state = inject(InspeccionMinisterialState);
    private readonly router = inject(Router);

    readonly data = this.state.data;

    updateField(field: string, value: string | SiNoEntity): void {
        this.state.updateFormField(field, value);
    }

    onVerificarNiv(): void {
        const niv = this.state.data().form.serieNivAlterada;
        console.log('Verificar NIV', { niv });
    }

    onSiguiente(): void {
        const data = this.state.data();

        console.log('Siguiente (inspección ministerial)', {
            folio: data.folio,
            inspeccion: data.form.inspeccion,
            valorUnidad: data.form.valorUnidad,
            porcentajeRecuperacion: data.form.porcentajeRecuperacion,
            serieNivAlterada: data.form.serieNivAlterada,
            motorAlterado: data.form.motorAlterado,
            observaciones: data.form.observaciones,
        });

        this.router.navigateByUrl('/admin/entrega/documentacion-propietario');
    }
}