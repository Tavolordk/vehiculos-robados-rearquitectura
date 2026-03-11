import { Injectable, signal } from '@angular/core';
import {
    LugarTipoEntity,
    PredenunciaRoboFormEntity,
} from '../../../domain/predenuncia/entities/predenuncia-robo.entity';

@Injectable({ providedIn: 'root' })
export class PredenunciaRoboState {
    private readonly _form = signal<PredenunciaRoboFormEntity>({
        folio: '626317',
        fechaRegistro: '25/08/2025 11:32 a.m.',
        fechaRobo: '',
        horaRobo: '00:00',
        modalidadRobo: '',
        entidad: '',
        municipio: '',
        lugarTipo: 'urbana',
        colonia: '',
        calle: '',
        numExt: '',
        numInt: '',
        cp: '',
        referencia: '',
        latitud: '',
        longitud: '',
        tramo: '',
        kilometro: '',
    });

    private readonly _modalidades = signal<string[]>([
        'Con violencia',
        'Sin violencia',
        'Otro',
    ]);

    private readonly _entidades = signal<string[]>([
        'OAXACA',
        'CDMX',
        'EDOMEX',
    ]);

    private readonly _municipios = signal<string[]>([
        'Municipio 1',
        'Municipio 2',
        'Municipio 3',
    ]);

    private readonly _colonias = signal<string[]>([
        'Colonia 1',
        'Colonia 2',
        'Colonia 3',
    ]);

    readonly form = this._form.asReadonly();
    readonly modalidades = this._modalidades.asReadonly();
    readonly entidades = this._entidades.asReadonly();
    readonly municipios = this._municipios.asReadonly();
    readonly colonias = this._colonias.asReadonly();

    updateForm(patch: Partial<PredenunciaRoboFormEntity>): void {
        this._form.update((current) => ({
            ...current,
            ...patch,
        }));
    }

    setLugarTipo(tipo: LugarTipoEntity): void {
        this._form.update((current) => ({
            ...current,
            lugarTipo: tipo,
        }));
    }
}