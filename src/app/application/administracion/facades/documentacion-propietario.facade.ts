import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { DocumentacionPropietarioState } from '../state/documentacion-propietario.state';
import { TipoPersonaDocumentacionEntity } from '../../../domain/administracion/entities/documentacion-propietario.entity';

@Injectable({ providedIn: 'root' })
export class DocumentacionPropietarioFacade {
    private readonly state = inject(DocumentacionPropietarioState);
    private readonly router = inject(Router);

    readonly data = this.state.data;

    updateField(field: string, value: string | TipoPersonaDocumentacionEntity): void {
        this.state.updateFormField(field, value as string);
    }

    onSiguiente(): void {
        const data = this.state.data();

        console.log('Siguiente - Documentación del propietario', {
            folio: data.folio,
            fechaHoraRegistro: data.fechaHoraRegistro,
            tipoPersona: data.form.tipoPersona,
            nombres: data.form.nombres,
            primerApellido: data.form.primerApellido,
            segundoApellido: data.form.segundoApellido,
            numeroFactura: data.form.numeroFactura,
            fechaFactura: data.form.fechaFactura,
            credencialElector: data.form.credencialElector,
            pasaporte: data.form.pasaporte,
            cedulaProfesional: data.form.cedulaProfesional,
            comprobanteDomicilio: data.form.comprobanteDomicilio,
            otroDocumento: data.form.otroDocumento,
        });

        this.router.navigateByUrl('/admin/entrega/verificacion');
    }
}