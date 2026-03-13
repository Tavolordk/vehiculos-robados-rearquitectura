import { Injectable, inject } from '@angular/core';
import {
    HttpClient,
    HttpErrorResponse,
    HttpHeaders,
    HttpParams,
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { APP_ENVIRONMENT, AppEnvironment } from '../../../core/config/app-environment.token';
import { buildApiUrl } from '../../../core/utils/url.util';
import { PredenunciaRepository } from '../../../domain/predenuncia/repositories/predenuncia.repository';
import {
    ConsultarPredenunciaResponseEntity,
    CrearPredenunciaRequestEntity,
    CrearPredenunciaResponseEntity,
} from '../../../domain/predenuncia/entities/predenuncia-api.entity';
import {
    ApiResponseDto,
    ConsultarPredenunciaResponseDto,
    CrearPredenunciaRequestDto,
    CrearPredenunciaResponseDto,
} from '../dtos/predenuncia.dto';
import { PredenunciaMapper } from '../mappers/predenuncia.mapper';

@Injectable({ providedIn: 'root' })
export class PredenunciaHttpRepository extends PredenunciaRepository {
    private readonly http = inject(HttpClient);
    private readonly environment = inject<AppEnvironment>(APP_ENVIRONMENT);

    private readonly crearEndpoint = buildApiUrl(
        'http://10.237.3.44:3701',
        'api/v1/predenuncia/registro/crear'
    );

    private readonly consultarEndpoint = buildApiUrl(
        this.environment.apiBaseUrl,
        'api/v1/predenuncia/consulta/obtener'
    );

    override crear(
        payload: CrearPredenunciaRequestEntity
    ): Observable<CrearPredenunciaResponseEntity> {
        const body: CrearPredenunciaRequestDto = PredenunciaMapper.toCrearRequestDto(payload);
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

        return this.http
            .post<ApiResponseDto<CrearPredenunciaResponseDto>>(this.crearEndpoint, body, { headers })
            .pipe(
                map((response) => PredenunciaMapper.toCrearResponseEntity(response.data)),
                catchError((error: HttpErrorResponse) => this.handleHttpError(error))
            );
    }

    override consultar(params: {
        folio?: string;
        reporteId?: number;
    }): Observable<ConsultarPredenunciaResponseEntity | null> {
        let httpParams = new HttpParams();

        if (params.folio) {
            httpParams = httpParams.set('folio', params.folio);
        }

        if (params.reporteId !== undefined && params.reporteId !== null) {
            httpParams = httpParams.set('reporteId', String(params.reporteId));
        }

        return this.http
            .get<ApiResponseDto<ConsultarPredenunciaResponseDto>>(this.consultarEndpoint, {
                params: httpParams,
            })
            .pipe(
                map((response) => PredenunciaMapper.toConsultarResponseEntity(response.data)),
                catchError((error: HttpErrorResponse) => {
                    if (error.status === 404) {
                        return of(null);
                    }

                    return this.handleHttpError(error);
                })
            );
    }

    private handleHttpError(error: HttpErrorResponse) {
        const message =
            error.error?.message ||
            error.error?.mensaje ||
            error.message ||
            'No fue posible procesar la predenuncia.';

        return throwError(() => ({
            status: error.status ?? 0,
            message,
        }));
    }
}