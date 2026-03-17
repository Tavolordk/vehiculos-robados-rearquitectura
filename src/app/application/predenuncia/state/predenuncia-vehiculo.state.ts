import { Injectable, signal } from '@angular/core';
import {
    AutoRowEntity,
    PredenunciaVehiculoFormEntity,
} from '../../../domain/predenuncia/entities/vehiculo.entity';
import { CatalogItemEntity } from '../../../domain/catalogos/entities/catalog-item.entity';
import { PredenunciaVehiculoField } from '../validators/predenuncia-vehiculo.validator';

@Injectable({ providedIn: 'root' })
export class PredenunciaVehiculoState {
    private readonly initialForm: PredenunciaVehiculoFormEntity = {
        folio: '626317',
        fechaRegistro: '25/08/2025 11:32 a.m.',
        serieVin: '',
        placa: '',
        procedenciaPlaca: '',
        nrpv: '',
        modelo: '',
        entidad: '',
        marca: '',
        submarca: '',
        permiso: '',
        color: '',
        senas: '',
    };

    private readonly _form = signal<PredenunciaVehiculoFormEntity>({
        ...this.initialForm,
    });

    private readonly _rows = signal<AutoRowEntity[]>([]);

    private readonly _marcas = signal<CatalogItemEntity[]>([]);
    private readonly _submarcas = signal<CatalogItemEntity[]>([]);
    private readonly _colores = signal<CatalogItemEntity[]>([]);
    private readonly _tiposVehiculo = signal<CatalogItemEntity[]>([]);
    private readonly _entidades = signal<CatalogItemEntity[]>([]);
    private readonly _errors = signal<Partial<Record<PredenunciaVehiculoField, string>>>({});

    readonly form = this._form.asReadonly();
    readonly rows = this._rows.asReadonly();

    readonly marcas = this._marcas.asReadonly();
    readonly submarcas = this._submarcas.asReadonly();
    readonly colores = this._colores.asReadonly();
    readonly tiposVehiculo = this._tiposVehiculo.asReadonly();
    readonly entidades = this._entidades.asReadonly();
    readonly errors = this._errors.asReadonly();

    updateForm(patch: Partial<PredenunciaVehiculoFormEntity>): void {
        this._form.update((current) => ({
            ...current,
            ...patch,
        }));
    }

    setRows(rows: AutoRowEntity[]): void {
        this._rows.set(rows);
    }

    addRow(row: AutoRowEntity): void {
        this._rows.update((current) => [...current, row]);
    }

    updateRow(index: number, row: AutoRowEntity): void {
        this._rows.update((current) =>
            current.map((item, i) => (i === index ? row : item))
        );
    }

    removeRow(index: number): void {
        this._rows.update((current) => current.filter((_, i) => i !== index));
    }

    setMarcas(items: CatalogItemEntity[]): void {
        this._marcas.set(items);
    }

    setSubmarcas(items: CatalogItemEntity[]): void {
        this._submarcas.set(items);
    }

    setColores(items: CatalogItemEntity[]): void {
        this._colores.set(items);
    }

    setTiposVehiculo(items: CatalogItemEntity[]): void {
        this._tiposVehiculo.set(items);
    }

    setEntidades(items: CatalogItemEntity[]): void {
        this._entidades.set(items);
    }

    clearSubmarcas(): void {
        this._submarcas.set([]);
        this._form.update((current) => ({
            ...current,
            submarca: '',
        }));
    }

    clearForm(): void {
        this._form.update((current) => ({
            ...current,
            serieVin: '',
            placa: '',
            procedenciaPlaca: '',
            nrpv: '',
            modelo: '',
            entidad: '',
            marca: '',
            submarca: '',
            permiso: '',
            color: '',
            senas: '',
        }));
    }

    setErrors(errors: Partial<Record<PredenunciaVehiculoField, string>>): void {
        this._errors.set(errors);
    }

    clearErrors(): void {
        this._errors.set({});
    }
}