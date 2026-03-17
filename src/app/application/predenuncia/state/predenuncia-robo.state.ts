import { Injectable, signal } from '@angular/core';
import {
    LugarTipoEntity,
    PredenunciaRoboFormEntity,
} from '../../../domain/predenuncia/entities/predenuncia-robo.entity';
import { CatalogItemEntity } from '../../../domain/catalogos/entities/catalog-item.entity';
import { PredenunciaRoboField } from '../validators/predenuncia-robo.validator';

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
        descHechos: '',
    });

    private readonly _modalidades = signal<CatalogItemEntity[]>([]);
    private readonly _entidades = signal<CatalogItemEntity[]>([]);
    private readonly _municipios = signal<CatalogItemEntity[]>([]);
    private readonly _colonias = signal<CatalogItemEntity[]>([]);
    private readonly _errors = signal<Partial<Record<PredenunciaRoboField, string>>>({});
    private readonly _submitted = signal<boolean>(false);

    readonly form = this._form.asReadonly();
    readonly modalidades = this._modalidades.asReadonly();
    readonly entidades = this._entidades.asReadonly();
    readonly municipios = this._municipios.asReadonly();
    readonly colonias = this._colonias.asReadonly();
    readonly errors = this._errors.asReadonly();
    readonly submitted = this._submitted.asReadonly();

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

    setModalidades(items: CatalogItemEntity[]): void {
        this._modalidades.set(items);
    }

    setEntidades(items: CatalogItemEntity[]): void {
        this._entidades.set(items);
    }

    setMunicipios(items: CatalogItemEntity[]): void {
        this._municipios.set(items);
    }

    setColonias(items: CatalogItemEntity[]): void {
        this._colonias.set(items);
    }

    clearUbicacionDependiente(): void {
        this._form.update((current) => ({
            ...current,
            municipio: '',
            colonia: '',
        }));
        this._municipios.set([]);
        this._colonias.set([]);
    }

    setErrors(errors: Partial<Record<PredenunciaRoboField, string>>): void {
        this._errors.set(errors);
    }

    setSubmitted(value: boolean): void {
        this._submitted.set(value);
    }
}
