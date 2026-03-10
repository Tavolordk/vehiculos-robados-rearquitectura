import { Observable } from 'rxjs';
import { CatalogItemEntity } from '../entities/catalog-item.entity';

export abstract class CatalogosRepository {
    abstract getDelitos(): Observable<CatalogItemEntity[]>;
    abstract getMediosComision(): Observable<CatalogItemEntity[]>;
    abstract getArmas(): Observable<CatalogItemEntity[]>;
    abstract getModalidadesDelictivas(): Observable<CatalogItemEntity[]>;
    abstract getModalidadesRobo(): Observable<CatalogItemEntity[]>;

    abstract getTiposPersona(): Observable<CatalogItemEntity[]>;
    abstract getSexos(): Observable<CatalogItemEntity[]>;
    abstract getColoresPiel(): Observable<CatalogItemEntity[]>;
    abstract getComplexiones(): Observable<CatalogItemEntity[]>;

    abstract getFuentesReporte(): Observable<CatalogItemEntity[]>;
    abstract getTiposUsoReporte(): Observable<CatalogItemEntity[]>;
    abstract getMotivosCancelacion(): Observable<CatalogItemEntity[]>;
    abstract getEstatusReporte(): Observable<CatalogItemEntity[]>;

    abstract getModosUbicacion(): Observable<CatalogItemEntity[]>;
    abstract getTiposLugar(): Observable<CatalogItemEntity[]>;

    abstract getColoresVehiculo(): Observable<CatalogItemEntity[]>;
    abstract getMarcasVehiculo(): Observable<CatalogItemEntity[]>;
    abstract getSubmarcasVehiculo(marcaId: number): Observable<CatalogItemEntity[]>;
    abstract getTiposVehiculo(): Observable<CatalogItemEntity[]>;
    abstract getTiposUsoVehiculo(): Observable<CatalogItemEntity[]>;
}