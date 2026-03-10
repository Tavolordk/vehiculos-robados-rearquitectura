import { Injectable, signal } from '@angular/core';
import { ConsultaGeneralRowEntity } from '../../../domain/consulta-general/entities/consulta-general-row.entity';

export type SearchType = 'robo' | 'actualizacion' | 'averiguacion';

@Injectable({ providedIn: 'root' })
export class ConsultaGeneralState {
    private readonly _searchType = signal<SearchType>('robo');
    private readonly _fechaDel = signal('');
    private readonly _fechaAl = signal('');
    private readonly _folioPredenuncia = signal('');
    private readonly _placaPermiso = signal('');
    private readonly _serieVin = signal('');
    private readonly _nrpv = signal('');
    private readonly _averiguacionPrevia = signal('');
    private readonly _noMotor = signal('');
    private readonly _fuenteInfo = signal('');
    private readonly _entidadRobo = signal('');
    private readonly _municipio = signal('');
    private readonly _marca = signal('');
    private readonly _submarca = signal('');
    private readonly _modelo = signal('');
    private readonly _validationMsg = signal('');

    private readonly _rows = signal<ConsultaGeneralRowEntity[]>([
        {
            fechaRobo: '25/08/2025',
            entidad: 'OAXACA',
            placa: '55SUZ3',
            serie: '3SCK2DEU7N1003832',
            marca: 'ITALIKA',
            submarca: 'ITALIKA',
            averiguacion: 'RW162FMK2200004408',
            estatus: 'ROBADO',
        },
        {
            fechaRobo: '24/08/2025',
            entidad: 'OAXACA',
            placa: 'RR248C',
            serie: 'MD2B54DX4PCC98793',
            marca: 'BAJAJ',
            submarca: 'PULSAR N',
            averiguacion: 'PDXCPC85322',
            estatus: 'PREDENUNCIA',
        },
        {
            fechaRobo: '21/07/2025',
            entidad: 'OAXACA',
            placa: '71STL3',
            serie: '3N6DD25T1AK023492',
            marca: 'NISSAN',
            submarca: 'CHASIS CAB',
            averiguacion: 'KA24471535A',
            estatus: 'RECUPERADO',
        },
        {
            fechaRobo: '25/08/2025',
            entidad: 'OAXACA',
            placa: '55SUZ3',
            serie: '3SCK2DEU7N1003832',
            marca: 'ITALIKA',
            submarca: 'ITALIKA',
            averiguacion: 'RW162FMK2200004408',
            estatus: 'ENTREGADO',
        },
        {
            fechaRobo: '24/08/2025',
            entidad: 'OAXACA',
            placa: 'RR248C',
            serie: 'MD2B54DX4PCC98793',
            marca: 'BAJAJ',
            submarca: 'PULSAR N',
            averiguacion: 'PDXCPC85322',
            estatus: 'CANCELADO',
        },
        {
            fechaRobo: '24/08/2025',
            entidad: 'OAXACA',
            placa: 'RR248C',
            serie: 'MD2B54DX4PCC98793',
            marca: 'BAJAJ',
            submarca: 'PULSAR N',
            averiguacion: 'PDXCPC85322',
            estatus: 'DENUNCIA',
        },
    ]);

    readonly searchType = this._searchType.asReadonly();
    readonly fechaDel = this._fechaDel.asReadonly();
    readonly fechaAl = this._fechaAl.asReadonly();
    readonly folioPredenuncia = this._folioPredenuncia.asReadonly();
    readonly placaPermiso = this._placaPermiso.asReadonly();
    readonly serieVin = this._serieVin.asReadonly();
    readonly nrpv = this._nrpv.asReadonly();
    readonly averiguacionPrevia = this._averiguacionPrevia.asReadonly();
    readonly noMotor = this._noMotor.asReadonly();
    readonly fuenteInfo = this._fuenteInfo.asReadonly();
    readonly entidadRobo = this._entidadRobo.asReadonly();
    readonly municipio = this._municipio.asReadonly();
    readonly marca = this._marca.asReadonly();
    readonly submarca = this._submarca.asReadonly();
    readonly modelo = this._modelo.asReadonly();
    readonly validationMsg = this._validationMsg.asReadonly();
    readonly rows = this._rows.asReadonly();

    setSearchType(value: SearchType): void { this._searchType.set(value); }
    setFechaDel(value: string): void { this._fechaDel.set(value); }
    setFechaAl(value: string): void { this._fechaAl.set(value); }
    setFolioPredenuncia(value: string): void { this._folioPredenuncia.set(value); }
    setPlacaPermiso(value: string): void { this._placaPermiso.set(value); }
    setSerieVin(value: string): void { this._serieVin.set(value); }
    setNrpv(value: string): void { this._nrpv.set(value); }
    setAveriguacionPrevia(value: string): void { this._averiguacionPrevia.set(value); }
    setNoMotor(value: string): void { this._noMotor.set(value); }
    setFuenteInfo(value: string): void { this._fuenteInfo.set(value); }
    setEntidadRobo(value: string): void { this._entidadRobo.set(value); }
    setMunicipio(value: string): void { this._municipio.set(value); }
    setMarca(value: string): void { this._marca.set(value); }
    setSubmarca(value: string): void { this._submarca.set(value); }
    setModelo(value: string): void { this._modelo.set(value); }
    setValidationMsg(value: string): void { this._validationMsg.set(value); }

    clear(): void {
        this._searchType.set('robo');
        this._fechaDel.set('');
        this._fechaAl.set('');
        this._folioPredenuncia.set('');
        this._placaPermiso.set('');
        this._serieVin.set('');
        this._nrpv.set('');
        this._averiguacionPrevia.set('');
        this._noMotor.set('');
        this._fuenteInfo.set('');
        this._entidadRobo.set('');
        this._municipio.set('');
        this._marca.set('');
        this._submarca.set('');
        this._modelo.set('');
        this._validationMsg.set('');
    }
}