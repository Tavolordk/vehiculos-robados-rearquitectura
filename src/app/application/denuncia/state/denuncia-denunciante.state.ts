import { Injectable, signal } from '@angular/core';
import { DenunciaDenuncianteFormEntity } from '../../../domain/denuncia/entities/denuncia-denunciante.entity';

@Injectable({ providedIn: 'root' })
export class DenunciaDenuncianteState {
    private readonly _form = signal<DenunciaDenuncianteFormEntity>({
        folio: '626317',
        fechaRegistro: '25/08/2025 11:32 a.m.',

        tipoPersona: 'fisica',

        nombreRazon: '',
        primerApellido: '',
        segundoApellido: '',

        curp: '',
        rfc: '',
        sexo: 'Seleccionar',

        telefono: '',
        correo: '',

        mismoDomicilioRobo: false,

        entidades: ['Seleccionar', 'CDMX', 'EDOMEX', 'JALISCO', 'NUEVO LEÓN', 'OAXACA'],
        municipios: ['Seleccionar'],
        colonias: ['Seleccionar'],

        entidad: 'Seleccionar',
        municipio: 'Seleccionar',
        colonia: 'Seleccionar',

        calle: '',
        numExterior: '',
        numInterior: '',
        cp: '',
    });

    readonly form = this._form.asReadonly();

    updateForm(patch: Partial<DenunciaDenuncianteFormEntity>): void {
        this._form.update((current) => ({
            ...current,
            ...patch,
        }));
    }
}