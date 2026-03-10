import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, map, catchError, throwError } from 'rxjs';

import { APP_ENVIRONMENT, AppEnvironment } from '../../../core/config/app-environment.token';
import { buildApiUrl } from '../../../core/utils/url.util';
import { CATALOGOS_ENDPOINTS } from '../../../core/constants/catalogos-endpoints.constants';
import { CatalogosRepository } from '../../../domain/catalogos/repositories/catalogos.repository';
import { CatalogItemEntity } from '../../../domain/catalogos/entities/catalog-item.entity';
import { ApiResponseDto } from '../dtos/api-response.dto';
import { CatalogItemDto } from '../dtos/catalog-item.dto';
import { CatalogosMapper } from '../mappers/catalogos.mapper';

@Injectable({ providedIn: 'root' })
export class CatalogosHttpRepository extends CatalogosRepository {
    private readonly http = inject(HttpClient);
    private readonly environment = inject<AppEnvironment>(APP_ENVIRONMENT);

    override getDelitos(): Observable<CatalogItemEntity[]> {
        return this.getCatalog(CATALOGOS_ENDPOINTS.delitos.delito);
    }

    override getMediosComision(): Observable<CatalogItemEntity[]> {
        return this.getCatalog(CATALOGOS_ENDPOINTS.delitos.medioComision);
    }

    override getArmas(): Observable<CatalogItemEntity[]> {
        return this.getCatalog(CATALOGOS_ENDPOINTS.delitos.arma);
    }

    override getModalidadesDelictivas(): Observable<CatalogItemEntity[]> {
        return this.getCatalog(CATALOGOS_ENDPOINTS.delitos.modalidadDelictiva);
    }

    override getModalidadesRobo(): Observable<CatalogItemEntity[]> {
        return this.getCatalog(CATALOGOS_ENDPOINTS.delitos.modalidadRobo);
    }

    override getTiposPersona(): Observable<CatalogItemEntity[]> {
        return this.getCatalog(CATALOGOS_ENDPOINTS.personas.tipoPersona);
    }

    override getSexos(): Observable<CatalogItemEntity[]> {
        return this.getCatalog(CATALOGOS_ENDPOINTS.personas.sexo);
    }

    override getColoresPiel(): Observable<CatalogItemEntity[]> {
        return this.getCatalog(CATALOGOS_ENDPOINTS.personas.colorPiel);
    }

    override getComplexiones(): Observable<CatalogItemEntity[]> {
        return this.getCatalog(CATALOGOS_ENDPOINTS.personas.complexion);
    }

    override getFuentesReporte(): Observable<CatalogItemEntity[]> {
        return this.getCatalog(CATALOGOS_ENDPOINTS.reportes.fuente);
    }

    override getTiposUsoReporte(): Observable<CatalogItemEntity[]> {
        return this.getCatalog(CATALOGOS_ENDPOINTS.reportes.tipoUso);
    }

    override getMotivosCancelacion(): Observable<CatalogItemEntity[]> {
        return this.getCatalog(CATALOGOS_ENDPOINTS.reportes.motivoCancelacion);
    }

    override getEstatusReporte(): Observable<CatalogItemEntity[]> {
        return this.getCatalog(CATALOGOS_ENDPOINTS.reportes.estatusReporte);
    }

    override getModosUbicacion(): Observable<CatalogItemEntity[]> {
        return this.getCatalog(CATALOGOS_ENDPOINTS.ubicacion.modoUbicacion);
    }

    override getTiposLugar(): Observable<CatalogItemEntity[]> {
        return this.getCatalog(CATALOGOS_ENDPOINTS.ubicacion.tipoLugar);
    }

    override getColoresVehiculo(): Observable<CatalogItemEntity[]> {
        return this.getCatalog(CATALOGOS_ENDPOINTS.vehiculos.color);
    }

    override getMarcasVehiculo(): Observable<CatalogItemEntity[]> {
        return this.getCatalog(CATALOGOS_ENDPOINTS.vehiculos.marca);
    }

    override getSubmarcasVehiculo(marcaId: number): Observable<CatalogItemEntity[]> {
        return this.getCatalog(CATALOGOS_ENDPOINTS.vehiculos.submarca(marcaId));
    }

    override getTiposVehiculo(): Observable<CatalogItemEntity[]> {
        return this.getCatalog(CATALOGOS_ENDPOINTS.vehiculos.tipoVehiculo);
    }

    override getTiposUsoVehiculo(): Observable<CatalogItemEntity[]> {
        return this.getCatalog(CATALOGOS_ENDPOINTS.vehiculos.tipoUsoVehiculo);
    }

    private getCatalog(path: string): Observable<CatalogItemEntity[]> {
        const url = buildApiUrl(this.environment.apiBaseUrl, path);

        return this.http.get<ApiResponseDto<CatalogItemDto[]>>(url).pipe(
            map((response) => {
                if (!response?.success) {
                    return [];
                }

                return CatalogosMapper.toEntities(response.data);
            }),
            catchError((error: HttpErrorResponse) => this.handleHttpError(error))
        );
    }

    private handleHttpError(error: HttpErrorResponse) {
        const message =
            error.error?.errors?.join(', ') ||
            error.error?.message ||
            error.message ||
            'No fue posible obtener el catálogo.';

        return throwError(() => ({
            status: error.status ?? 0,
            message,
        }));
    }
}