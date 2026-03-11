import { Injectable, signal } from '@angular/core';
import { AutoRowEntity, PredenunciaVehiculoFormEntity } from '../../../domain/predenuncia/entities/vehiculo.entity';


@Injectable({ providedIn: 'root' })
export class PredenunciaVehiculoState {
    private readonly _form = signal<PredenunciaVehiculoFormEntity>({
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
    });

    private readonly _rows = signal<AutoRowEntity[]>([
        { marca: 'Nissan', submarca: 'Tsuru', anio: '2000', color: 'Rojo', placa: 'XXX125', selected: true },
        { marca: 'Chevrolet', submarca: 'Captiva', anio: '', color: 'Blanco', placa: 'XXX126' },
        { marca: 'KIA', submarca: 'Tucson', anio: '', color: 'Dorado', placa: 'XXX127' },
    ]);

    readonly form = this._form.asReadonly();
    readonly rows = this._rows.asReadonly();

    updateForm(patch: Partial<PredenunciaVehiculoFormEntity>): void {
        this._form.update((current) => ({
            ...current,
            ...patch,
        }));
    }

    setRows(rows: AutoRowEntity[]): void {
        this._rows.set(rows);
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
}