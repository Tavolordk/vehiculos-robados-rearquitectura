import { Injectable, signal } from '@angular/core';
import { DenunciaRoboFormEntity, LocationTypeEntity } from '../../../domain/denuncia/entities/denuncia-robo.entity';

@Injectable({ providedIn: 'root' })
export class DenunciaRoboState {
    private readonly _form = signal<DenunciaRoboFormEntity>({
        folio: '626317',
        fechaRegistro: '25/08/2025 11:32 a.m.',

        averPrev: '',
        averPrevConfirm: '',
        fechaDenuncia: '13/08/2025',
        horaDenuncia: '00 : 00',
        agenciaMP: '',
        agenteMP: '',

        fechaRobo: '',
        horaRobo: '00:00',

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
        referencia: '',

        latitud: '',
        longitud: '',

        tramo: '',
        kilometro: '',

        locationType: 'urbana',
    });

    readonly form = this._form.asReadonly();

    updateForm(patch: Partial<DenunciaRoboFormEntity>): void {
        this._form.update((current) => ({
            ...current,
            ...patch,
        }));
    }

    setLocationType(type: LocationTypeEntity): void {
        this._form.update((current) => ({
            ...current,
            locationType: type,
        }));
    }
}