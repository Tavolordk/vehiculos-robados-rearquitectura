import { Injectable, signal } from '@angular/core';
import { RecuperacionVehiculoFormEntity } from '../../../domain/administracion/entities/recuperacion-vehiculo.entity';

@Injectable({ providedIn: 'root' })
export class RecuperacionVehiculoState {
    private readonly _form = signal<RecuperacionVehiculoFormEntity>({
        folio: '626317',
        fechaHoraRegistro: '25/08/2025 11:32 a.m.',
        vehiculo: {
            serieVin: 'MHYNC22S7PJ112320',
            motor: 'EX500GEA65877',
            permiso: '',
            procedenciaPlaca: 'NACIONAL',
            placa: 'LLJ943A',
            modelo: '2022',
            tipoVehiculo: 'AUTOMOVIL',
            tipoUso: 'TRANSPORTE PARTICULAR',
            marca: 'FORD',
            submarca: 'MUSTANG',
            color: 'ROJO',
            senasParticulares: 'STICKERS DEL RAYO MCQUEEN',
        },
    });

    readonly form = this._form.asReadonly();
}