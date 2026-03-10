import { Observable } from 'rxjs';
import { VehiculoEntity } from '../entities/vehiculo.entity';

export abstract class ConsultaVehiculoRepository {
    abstract consultarPorVin(vin: string): Observable<VehiculoEntity | null>;
}