import { Injectable, signal } from '@angular/core';
import {
    RecuperacionVerificacionEntity,
    ModalAltaRecuperacionEntity,
} from '../../../domain/administracion/entities/recuperacion-verificacion.entity';

@Injectable({ providedIn: 'root' })
export class RecuperacionVerificacionState {
    private readonly _data = signal<RecuperacionVerificacionEntity>({
        folio: '626317',
        fechaHoraRegistro: '25/08/2025 11:32 a.m.',
        modalData: {
            carpeta: 'ASDASASDAQQW234234',
            estatus: 'Localizado',
            folio: 'OAX/VRYR/30082025/7509169',
            placa: '55SUZ3',
            vin: '3SCK2DEU7N1003832',
        },
        recuperacion: {
            documento: 'DOCUMENTO DE RECUPERACION',
            fechaDocumento: '02/12/2025',
            horaDocumento: '11:32 a. m.',
            agenciaMp: 'CUAUHTEMOC MP2',
            fechaRecuperacion: '07/12/2025',
            agenteMp: '---',
            horaRecuperacion: '14:59',
        },
        ficha: {
            nombreBanda: 'BANDA PRUEBA',
            modalidadDelictiva: 'PRUEBA',
        },
        integrantes: [
            { noIntegrante: '---', alias: '---', nombre: '---', primerApellido: '---' },
        ],
        vehiculo: {
            vin: 'MHYNC22S7PJ112320',
            nrpv: '515176MC',
            entidad: 'OAXACA',
            submarca: 'PANIGALE V4 R',
            motor: 'EX500GEA65877',
            placa: 'LLJ943A',
            tipoVehiculo: 'MOTO',
            tipoUso: 'TRANSPORTE PARTICULAR',
            permiso: '---',
            senas: 'STICKERS DE RAYO MCQUEEN',
            procedenciaPlaca: 'NACIONAL',
            modelo: '2025',
            marca: 'DUCATI',
            color: 'ROJO',
        },
    });

    private readonly _showSuccessModal = signal(false);

    readonly data = this._data.asReadonly();
    readonly showSuccessModal = this._showSuccessModal.asReadonly();

    setShowSuccessModal(value: boolean): void {
        this._showSuccessModal.set(value);
    }

    setIntegrantes(integrantes: RecuperacionVerificacionEntity['integrantes']): void {
        this._data.update((current) => ({
            ...current,
            integrantes,
        }));
    }

    setModalData(modalData: ModalAltaRecuperacionEntity): void {
        this._data.update((current) => ({
            ...current,
            modalData,
        }));
    }
}