import { Injectable, signal } from '@angular/core';
import { InspeccionMinisterialPageEntity } from '../../../domain/administracion/entities/inspeccion-ministerial.entity';

@Injectable({ providedIn: 'root' })
export class InspeccionMinisterialState {
    private readonly _data = signal<InspeccionMinisterialPageEntity>({
        folio: '626317',
        fechaHoraRegistro: '25/08/2025 11:32 a.m.',
        maxObs: 2000,
        form: {
            inspeccion: null,
            valorUnidad: '',
            porcentajeRecuperacion: '',
            serieNivAlterada: '',
            motorAlterado: '',
            observaciones: '',
        },
    });

    readonly data = this._data.asReadonly();

    updateFormField(field: string, value: string | null): void {
        this._data.update((current) => ({
            ...current,
            form: {
                ...current.form,
                [field]: value,
            },
        }));
    }
}