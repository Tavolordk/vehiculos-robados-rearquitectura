import { Injectable, signal } from '@angular/core';
import { EntregaExitoEntity } from '../../../domain/administracion/entities/entrega-exito.entity';

@Injectable({ providedIn: 'root' })
export class EntregaExitoState {
    private readonly _data = signal<EntregaExitoEntity>({
        averiguacionPrevia: 'ASDASASDAQQW234234',
        estatusDenuncia: 'Entregado',
        folioEntrega: 'OAX/VRYR/30082025/7509169',
        placa: '55SUZ3',
        serieNiv: '3SCK2DEU7N1003832',
    });

    readonly data = this._data.asReadonly();
}