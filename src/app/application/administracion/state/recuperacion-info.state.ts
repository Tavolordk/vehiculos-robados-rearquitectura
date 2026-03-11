import { Injectable, signal } from '@angular/core';
import { RecuperacionInfoFormEntity } from '../../../domain/administracion/entities/recuperacion-info.entity';

@Injectable({ providedIn: 'root' })
export class RecuperacionInfoState {
    private readonly _form = signal<RecuperacionInfoFormEntity>({
        denuncia: {
            carpeta: 'ASDASASDAQQW234234',
            folio: '7509169',
            fechaDenuncia: '30/10/2025',
            horaDenuncia: '11:32 a. m.',
            fechaRobo: '21/10/2025',
            horaRobo: '01:01',
            estatus: 'Localizado',
        },

        documentoRecuperacion: 'Seleccionar',
        fechaDocumento: '',
        horaDocumento: '',
        agenciaMpDocumento: 'Seleccionar',
        agenteMpDocumento: '',

        fechaRecuperacion: '',
        horaRecuperacion: '',
        entidad: 'Seleccionar',
        municipio: 'Seleccionar',
        colonia: 'Seleccionar',
        calle: '',
        numeroExterior: '',
        numeroInterior: '',
        cp: '',
        referencia: '',

        latitud: '',
        longitud: '',

        tramo: '',
        kilometro: '',

        locationType: 'urbana',

        documentosRecuperacion: ['Seleccionar'],
        agenciasMp: ['Seleccionar'],
        entidades: ['Seleccionar'],
        municipios: ['Seleccionar'],
        colonias: ['Seleccionar'],
    });

    readonly form = this._form.asReadonly();

    updateForm(patch: Partial<RecuperacionInfoFormEntity>): void {
        this._form.update((current) => ({
            ...current,
            ...patch,
        }));
    }

    setLocationType(type: RecuperacionInfoFormEntity['locationType']): void {
        this._form.update((current) => ({
            ...current,
            locationType: type,
        }));
    }
}
