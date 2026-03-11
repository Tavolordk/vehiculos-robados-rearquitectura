import { Injectable, signal } from '@angular/core';
import {
    DenunciaVehiculoFormEntity,
    DenunciaVehiculoRowEntity,
} from '../../../domain/denuncia/entities/denuncia-vehiculo.entity';

@Injectable({ providedIn: 'root' })
export class DenunciaVehiculoState {
    private readonly _form = signal<DenunciaVehiculoFormEntity>({
        folio: '626317',
        fechaHoraRegistro: '25/08/2025 11:32 a.m.',
        serieVin: '',
        placa: '',
        procedenciaPlaca: '',
        nrpv: '',
        tipoVehiculo: '',
        modelo: '',
        entidad: '',
        tipoUso: '',
        marca: '',
        submarca: '',
        permiso: '',
        color: '',
        senasParticulares: '',
        noMotor: '',
        loadingBuscar: false,
    });

    private readonly _procedencias = signal<string[]>([
        'Seleccionar',
        'NACIONAL',
        'EXTRANJERA',
    ]);

    private readonly _tiposVehiculoList = signal<string[]>([
        'Seleccionar',
        'AUTOMÓVIL',
        'MOTOCICLETA',
        'CAMIONETA',
        'CAMIÓN',
        'OTRO',
    ]);

    private readonly _modelosList = signal<string[]>([
        'Seleccionar',
        '1999',
        '2000',
        '2005',
        '2010',
        '2015',
        '2020',
        '2024',
        '2025',
        '2026',
    ]);

    private readonly _entidadesList = signal<string[]>([
        'Seleccionar',
        'OAXACA',
        'CDMX',
        'EDOMEX',
        'JALISCO',
        'NUEVO LEÓN',
    ]);

    private readonly _tiposUsoList = signal<string[]>([
        'Seleccionar',
        'PARTICULAR',
        'PÚBLICO',
        'CARGA',
        'OTRO',
    ]);

    private readonly _marcasList = signal<string[]>([
        'Seleccionar',
        'NISSAN',
        'CHEVROLET',
        'KIA',
        'ITALIKA',
        'BAJAJ',
    ]);

    private readonly _submarcasList = signal<string[]>(['Seleccionar']);

    private readonly _coloresList = signal<string[]>([
        'Seleccionar',
        'ROJO',
        'BLANCO',
        'NEGRO',
        'DORADO',
        'GRIS',
    ]);

    private readonly _rows = signal<DenunciaVehiculoRowEntity[]>([
        { marca: 'Nissan', submarca: 'Tsuru', anioModelo: '2000', color: 'Rojo', placa: 'XXX125' },
        { marca: 'Chevrolet', submarca: 'Captiva', anioModelo: '', color: 'Blanco', placa: 'XXX126' },
        { marca: 'KIA', submarca: 'Tucson', anioModelo: '', color: 'Dorado', placa: 'XXX127' },
    ]);

    readonly form = this._form.asReadonly();
    readonly procedencias = this._procedencias.asReadonly();
    readonly tiposVehiculoList = this._tiposVehiculoList.asReadonly();
    readonly modelosList = this._modelosList.asReadonly();
    readonly entidadesList = this._entidadesList.asReadonly();
    readonly tiposUsoList = this._tiposUsoList.asReadonly();
    readonly marcasList = this._marcasList.asReadonly();
    readonly submarcasList = this._submarcasList.asReadonly();
    readonly coloresList = this._coloresList.asReadonly();
    readonly rows = this._rows.asReadonly();

    updateForm(patch: Partial<DenunciaVehiculoFormEntity>): void {
        this._form.update((current) => ({
            ...current,
            ...patch,
        }));
    }

    setSubmarcasList(list: string[]): void {
        this._submarcasList.set(list);
    }

    setRows(rows: DenunciaVehiculoRowEntity[]): void {
        this._rows.set(rows);
    }
}