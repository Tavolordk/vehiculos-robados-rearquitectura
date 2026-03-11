import { Injectable, signal } from '@angular/core';
import { DocumentacionPropietarioPageEntity } from '../../../domain/administracion/entities/documentacion-propietario.entity';

@Injectable({ providedIn: 'root' })
export class DocumentacionPropietarioState {
    private readonly _data = signal<DocumentacionPropietarioPageEntity>({
        folio: '626317',
        fechaHoraRegistro: '25/08/2025 11:32 a.m.',
        form: {
            tipoPersona: 'PROPIETARIO',
            nombres: '',
            primerApellido: '',
            segundoApellido: '',
            numeroFactura: '',
            fechaFactura: '13/08/2025',
            credencialElector: '',
            pasaporte: '',
            cedulaProfesional: '',
            comprobanteDomicilio: '',
            otroDocumento: '',
        },
    });

    readonly data = this._data.asReadonly();

    updateFormField(field: string, value: string): void {
        this._data.update((current) => ({
            ...current,
            form: {
                ...current.form,
                [field]: value,
            },
        }));
    }
}