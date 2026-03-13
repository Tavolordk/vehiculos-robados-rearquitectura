import { Observable } from 'rxjs';
import {
    CrearPredenunciaRequestEntity,
    CrearPredenunciaResponseEntity,
    ConsultarPredenunciaResponseEntity,
} from '../entities/predenuncia-api.entity';

export abstract class PredenunciaRepository {
    abstract crear(
        payload: CrearPredenunciaRequestEntity
    ): Observable<CrearPredenunciaResponseEntity>;

    abstract consultar(params: {
        folio?: string;
        reporteId?: number;
    }): Observable<ConsultarPredenunciaResponseEntity | null>;
}