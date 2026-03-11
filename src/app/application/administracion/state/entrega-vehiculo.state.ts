import { Injectable, signal } from '@angular/core';
import { EntregaVehiculoPageEntity } from '../../../domain/administracion/entities/entrega-vehiculo.entity';

@Injectable({ providedIn: 'root' })
export class EntregaVehiculoState {
    private readonly _data = signal<EntregaVehiculoPageEntity>({
        folio: '626317',
        fechaHoraRegistro: '25/08/2025 11:32 a.m.',
        info: {
            carpeta: 'ASDASASDAQQW234234',
            folioDenuncia: '7509169',
            fechaDenuncia: '19/09/2016',
            horaDenuncia: '11:32 a. m.',
            fechaRobo: '12/05/2016',
            horaRobo: '01:01',
            fechaRecuperacion: '09/01/2018',
            horaRecuperacion: '01:01',
            serie: 'LTMPCG677G5808856',
            placa: 'null',
        },
        entrega: {
            fechaEntrega: '13/08/2025',
            horaEntrega: '',
            calleNumero: '',
            referencia: '',
            colonia: '',
            entidad: '',
            municipio: '',
            cp: '',
        },
        catalogos: {
            colonias: ['Seleccionar', 'Centro', 'Reforma', 'Del Valle'],
            entidades: ['Seleccionar', 'CDMX', 'OAXACA', 'GUERRERO'],
            municipios: ['Seleccionar', 'Benito Juárez', 'Cuauhtémoc', 'Coyoacán'],
        },
    });

    readonly data = this._data.asReadonly();

    updateEntregaField(field: string, value: string): void {
        this._data.update((current) => ({
            ...current,
            entrega: {
                ...current.entrega,
                [field]: value,
            },
        }));
    }
}