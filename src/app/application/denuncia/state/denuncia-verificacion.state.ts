import { Injectable, signal } from '@angular/core';
import {
    DenunciaVerificacionEntity,
    ModalAltaDenunciaEntity,
} from '../../../domain/denuncia/entities/denuncia-verificacion.entity';

@Injectable({ providedIn: 'root' })
export class DenunciaVerificacionState {
    private readonly _data = signal<DenunciaVerificacionEntity>({
        folio: '626317',
        fechaRegistro: '25/08/2025 11:32 a.m.',
        infoRobo: {
            folio: '626317',
            fechaRobo: '11/07/2025',
            horaCaptura: '11:32 a. m.',
            entidad: 'MÉXICO',
            municipio: 'NEZAHUALCOYOTL',
            colonia: 'BENITO JUAREZ',
            calle: 'SORJUANA 200',
            cp: '57000',
            referencia: 'NULL',
            tramo: '',
            kilometro: '',
            latitud: '',
            longitud: '',
        },
        modus: {
            modalidad: 'CON VIOLENCIA',
            victimas: '1',
            presuntos: '2',
            tipoLugar: 'VIA PUBLICA',
            seHacePasarPor: 'LLJ888A',
            peculiaridades: 'ENCAPUCHADOS',
            senas: 'ENCAPUCHADOS',
            vestimenta: 'NEGRA',
            comportamiento: 'AGRESIVO',
            armas: 'ARMA DE FUEGO',
            delitos: 'ROBO',
        },
        vehiculosAsociados: [
            { marca: 'Nissan', submarca: 'Tsuru', color: 'Azul', placa: '-----' },
            { marca: 'Chevrolet', submarca: 'Captiva', color: 'Rojo', placa: '-----' },
            { marca: 'KIA', submarca: 'Tucson', color: 'Gris', placa: '-----' },
        ],
        denunciante: {
            tipoPersona: 'FISICA',
            nombres: 'ALBERTO',
            primerApellido: 'DIAZ',
            segundoApellido: 'OSORIO',
            sexo: 'MASCULINO',
            telefono: '55 21 12 43 45',
            rfc: '0019201230',
            correo: 'israelado@gmail.com',
        },
        averiguacion: {
            numero: '12334567888912',
            agencia: 'AGENCIA DEL MINISTERIO PÚBLICO CUH-8',
            agente: 'AGENCIA DEL MINISTERIO PÚBLICO CUH',
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

    private readonly _modalOpen = signal(false);

    private readonly _modalData = signal<ModalAltaDenunciaEntity>({
        averiguacionPrevia: '',
        folio: '',
        placa: '',
        serieNiv: '',
    });

    readonly data = this._data.asReadonly();
    readonly modalOpen = this._modalOpen.asReadonly();
    readonly modalData = this._modalData.asReadonly();

    setModalOpen(open: boolean): void {
        this._modalOpen.set(open);
    }

    setModalData(data: ModalAltaDenunciaEntity): void {
        this._modalData.set(data);
    }
}
