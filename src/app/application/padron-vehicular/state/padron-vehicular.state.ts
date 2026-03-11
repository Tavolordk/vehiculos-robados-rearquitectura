import { Injectable, signal, computed } from '@angular/core';
import { PadronRowEntity } from '../../../domain/padron-vehicular/entities/padron-row.entity';

@Injectable({ providedIn: 'root' })
export class PadronVehicularState {
    private readonly _propNombre = signal('');
    private readonly _propApellido1 = signal('');
    private readonly _propApellido2 = signal('');

    private readonly _serieNiv = signal('');
    private readonly _placa = signal('');
    private readonly _motor = signal('');
    private readonly _marca = signal('');
    private readonly _submarca = signal('');
    private readonly _modelo = signal('');
    private readonly _tipoVehiculo = signal('');
    private readonly _entidad = signal('');
    private readonly _nrpv = signal('');
    private readonly _rfv = signal('');

    private readonly _marcas = signal<string[]>(['NISSAN', 'CHEVROLET', 'KIA', 'ITALIKA', 'BAJAJ']);
    private readonly _submarcas = signal<string[]>([]);
    private readonly _modelos = signal<string[]>(['1999', '2000', '2005', '2010', '2015', '2020', '2024', '2025', '2026']);
    private readonly _tiposVehiculo = signal<string[]>(['AUTOMÓVIL', 'MOTOCICLETA', 'CAMIONETA', 'CAMIÓN', 'OTRO']);
    private readonly _entidades = signal<string[]>(['OAXACA', 'CDMX', 'EDOMEX', 'JALISCO', 'NUEVO LEÓN']);

    private readonly _allRows = signal<PadronRowEntity[]>([
        { serie: 'KL1JD5AE6CB064513', motor: 'LC152QMIC6911268', marca: 'NISSAN', submarca: 'TSURU', anioModelo: '2000' },
        { serie: '3D4GG67V99T573660', motor: 'CFZM76848', marca: 'CHEVROLET', submarca: 'CAPTIVA', anioModelo: '' },
        { serie: '3SCTCSDA7C1008250', motor: 'MR18005637', marca: 'KIA', submarca: 'TUCSON', anioModelo: '' },
        { serie: 'MD2B54DX4PCC98793', motor: 'PDXCPC85322', marca: 'BAJAJ', submarca: 'PULSAR N', anioModelo: '2024' },
    ]);

    private readonly _rows = signal<PadronRowEntity[]>([]);
    private readonly _page = signal(1);
    private readonly _pageSize = signal(10);

    readonly propNombre = this._propNombre.asReadonly();
    readonly propApellido1 = this._propApellido1.asReadonly();
    readonly propApellido2 = this._propApellido2.asReadonly();
    readonly serieNiv = this._serieNiv.asReadonly();
    readonly placa = this._placa.asReadonly();
    readonly motor = this._motor.asReadonly();
    readonly marca = this._marca.asReadonly();
    readonly submarca = this._submarca.asReadonly();
    readonly modelo = this._modelo.asReadonly();
    readonly tipoVehiculo = this._tipoVehiculo.asReadonly();
    readonly entidad = this._entidad.asReadonly();
    readonly nrpv = this._nrpv.asReadonly();
    readonly rfv = this._rfv.asReadonly();

    readonly marcas = this._marcas.asReadonly();
    readonly submarcas = this._submarcas.asReadonly();
    readonly modelos = this._modelos.asReadonly();
    readonly tiposVehiculo = this._tiposVehiculo.asReadonly();
    readonly entidades = this._entidades.asReadonly();

    readonly rows = this._rows.asReadonly();
    readonly page = this._page.asReadonly();
    readonly pageSize = this._pageSize.asReadonly();

    readonly totalPages = computed(() =>
        Math.max(1, Math.ceil(this._rows().length / this._pageSize()))
    );

    readonly pages = computed(() =>
        Array.from({ length: this.totalPages() }, (_, i) => i + 1)
    );

    constructor() {
        this._rows.set([...this._allRows()]);
    }

    setPropNombre(value: string): void { this._propNombre.set(value); }
    setPropApellido1(value: string): void { this._propApellido1.set(value); }
    setPropApellido2(value: string): void { this._propApellido2.set(value); }

    setSerieNiv(value: string): void { this._serieNiv.set(value); }
    setPlaca(value: string): void { this._placa.set(value); }
    setMotor(value: string): void { this._motor.set(value); }
    setMarca(value: string): void { this._marca.set(value); }
    setSubmarca(value: string): void { this._submarca.set(value); }
    setModelo(value: string): void { this._modelo.set(value); }
    setTipoVehiculo(value: string): void { this._tipoVehiculo.set(value); }
    setEntidad(value: string): void { this._entidad.set(value); }
    setNrpv(value: string): void { this._nrpv.set(value); }
    setRfv(value: string): void { this._rfv.set(value); }

    setSubmarcas(value: string[]): void { this._submarcas.set(value); }
    setRows(value: PadronRowEntity[]): void { this._rows.set(value); }
    setPage(value: number): void { this._page.set(value); }

    resetForm(): void {
        this._propNombre.set('');
        this._propApellido1.set('');
        this._propApellido2.set('');
        this._serieNiv.set('');
        this._placa.set('');
        this._motor.set('');
        this._marca.set('');
        this._submarca.set('');
        this._modelo.set('');
        this._tipoVehiculo.set('');
        this._entidad.set('');
        this._nrpv.set('');
        this._rfv.set('');
        this._submarcas.set([]);
        this._rows.set([...this._allRows()]);
        this._page.set(1);
    }

    allRows(): PadronRowEntity[] {
        return this._allRows();
    }
}