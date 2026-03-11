import { Injectable, signal } from '@angular/core';
import { PredenunciaVerificacionEntity } from '../../../domain/predenuncia/entities/predenuncia-verificacion.entity';

@Injectable({ providedIn: 'root' })
export class PredenunciaVerificacionState {
    private readonly _data = signal<PredenunciaVerificacionEntity>({
        folio: '626317',
        fechaRegistro: '25/08/2025 11:32 a.m.',
        robo: {
            folio: '626317',
            fechaRobo: '11/07/2025',
            entidad: 'MÉXICO',
            municipio: 'NEZAHUALCOYOTL',
            colonia: 'BENITO JUAREZ',
            calle: 'SORJUANA 200',
            cp: '57000',
            modalidad: 'SIN VIOLENCIA',
            horaCaptura: '11:32 a. m.',
            referencia: 'NULL',
            tramo: '',
            kilometro: '',
            latitud: '',
            longitud: '',
        },
        denunciante: {
            tipoPersona: 'FISICA',
            nombres: 'ALBERTO',
            apellido1: 'DIAZ',
            apellido2: 'OSORIO',
            sexo: 'MASCULINO',
            telefono: '55 21 12 43 45',
            rfc: '0019201230',
            correo: 'israelado@gmail.com',
        },
        vehiculos: [
            {
                marca: 'Nissan',
                submarca: 'Tsuru',
                modelo: '2000',
                color: 'Negro',
                placaPermiso: '55SUZ3',
                serieVin: 'KL1JD5AE6CB064513',
                nrpv: '3O5C3ADC',
            },
        ],
    });

    readonly data = this._data.asReadonly();
}